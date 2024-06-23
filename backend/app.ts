import path from "path";
import http from "http";
import express, { Express, Request } from "express";
import socketio, { Server as SocketIOServer, Socket } from "socket.io";
import cors from "cors";
import { javaScriptController } from "./controllers/javaScriptController";
import dotenv from "dotenv";
import { AppSource } from "./database/database";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { postsRouter } from "./routes/posts";
import { commentsRouter } from "./routes/comments";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { UserManager } from "./utils/usersManager";
import { searchRouter } from "./routes/search";

const rooms = [];
let users: any[] = [];

const app: Express = express();
app.use(cors());
dotenv.config();

const server: http.Server = http.createServer(app);
const io: SocketIOServer = new socketio.Server(server, {
	cors: {
		origin: "http://localhost:5173", // Allow requests only from this origin
		methods: ["GET", "POST"], // Allow only GET and POST requests
	},
});

const userManager = new UserManager(users);

io.on("connection", (socket: Socket) => {
	console.log("Client connected", socket.id);
	userManager.addUser(
		socket.handshake.query.userId as string,
		socket.id as string,
		socket.handshake.query.roomId as string
	);
	const user = userManager.users.find((user) => user.socketId === socket.id);
	console.log("User: ", user);
	console.log("Users: ", userManager.users);
	if (user.roomId !== "" || user.roomId != undefined) {
		console.log(socket.rooms);
		socket.to(user.roomId).emit("users", []);
	}
	socket.on("create", () => {
		const roomId = uuid();
		userManager.setUserRoom(socket.id as string, roomId);
		socket.join(roomId);
		console.log("Rooms", socket.rooms);
		io.to(socket.id).emit("roomCreated", roomId);
		const users = userManager.users.filter((user) => user.roomId === roomId)
		io.to(roomId).emit("users", users);
		console.log(userManager.users);
	});
	socket.on("join", (newValue: any) => {
		userManager.setUserRoom(socket.id, newValue.roomId);
		console.log(newValue);
		socket.join(newValue.roomId);
		socket.emit("users", userManager.users);
		io.to(socket.id).emit("roomCreated", newValue.roomId);
		console.log("User rooms", socket.rooms);
		const users = userManager.users.filter(
			(user) => user.roomId === newValue.roomId
		);
		io.to(newValue.roomId).emit("users", users);
	});
	socket.on("codeChange", (newValue: any) => {
		const roomId = userManager.findUserRoom(socket.id);
		if (roomId) {
			socket.broadcast.to(roomId).emit("codeChange", newValue);
			console.log(newValue);
		}
	});

	socket.on("username", (value: string) => {
		console.log(users.length);
		if (users.length > 0) {
			const index = users.findIndex((user) => user.username === value);
			if (index !== -1) {
				users[index] = { username: value, socketId: socket.id, roomId: null };
			} else {
				users.push({ username: value, socketId: socket.id, roomId: null });
			}
		} else {
			users.push({ username: value, socketId: socket.id, roomId: null });
		}
		console.log("Users", users);
	});

	socket.on("joinRoom", (newValue: any) => {
		const index = users.findIndex(
			(user) => user.username === newValue.user.username
		);
		if (index !== -1) {
			users[index].roomId = newValue.roomId;
			socket.join(newValue.roomId as string);
			const filtered = users.filter((user) => user.roomId === newValue.roomId);
			io.to(newValue.roomId).emit("userJoining", {
				status: "ok",
				users: filtered,
				newUser: users[index],
				roomId: newValue.roomId,
			});
			io.to(newValue.roomId).emit("userJoined", {
				users: filtered,
				newUser: users[index],
			});
		}
		console.log(users);
	});

	socket.on("createRoom", (newValue: any) => {
		const index = users.findIndex(
			(user) => user.username === newValue.user.username
		);
		let roomId = "";
		if (index !== -1) {
			roomId = uuid() as string;
			users[index].roomId = roomId;
			socket.join(roomId as string);
			const filtered = users.filter((user) => user.roomId === roomId);
			io.to(roomId as string).emit("userJoining", {
				status: "ok",
				users: filtered,
				newUser: users[index],
				roomId: roomId,
			});
			io.to(roomId as string).emit("userJoined", {
				users: filtered,
				newUser: users[index],
			});
		}
		console.log(users);
	});

	socket.on("runCode", (newValue: any) => {
		console.log("Code runned");
		const res = javaScriptController(newValue.code);
		const findUser = userManager.users.find(
			(user) => user.socketId === socket.id
		);
		io.to(findUser.roomId).emit("codeOutput", {
			code: res,
		});
	});

	// socket.on("disconnecting", async (value: string) => {
	// 	console.log(value);
	// 	const user = await ConnectedUser.findOneBy({ email: value });
	// 	console.log(user);
	// 	if (user) {
	// 		await ConnectedUser.remove(user);
	// 	}
	// 	console.log("Client is disconnecting");
	// })

	socket.on("leaveRoom", () => {
		const roomId = userManager.findUserRoom(socket.id);
		userManager.setUserRoom(socket.id, undefined);
		const users = userManager.users.filter((user) => user.roomId === roomId);
		console.log("Users", users);
		io.to(roomId).emit("users", users);
	});

	socket.on("disconnect", () => {
		// if (users.length > 0) {
		// 	const filtered = users.filter((user) => user.socketId !== socket.id);
		// 	console.log(filtered);
		// 	userManager.users = filtered;
		// }
		const roomId = userManager.findUserRoom(socket.id);
		console.log("Disconnect room", roomId);
		if (roomId) {
			userManager.removeUser(socket.id);
			console.log("DIsconnect: ", userManager.users);
			socket.emit("users", userManager.users);
			io.to(roomId).emit("users", userManager.users);
		} else {
			userManager.removeUser(socket.id);	
		}
		console.log("Client disconnected!");
		console.log("Users disconnect: ", userManager.users);
	});
});

const storage = multer.diskStorage({
	destination: (req: Request, file: any, cb: Function) => {
		cb(null, "uploads/");
	},
	filename: (req: Request, file: any, cb: Function) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// app.use("/evaluate", evaluateRouter);
app.post("/upload", upload.single("file"), (req, res) => {
	res.json({ message: "File uploaded successfully!" });
});
app.get("/products", (req, res, next) => {
	res.status(200).json([
		{
			productId: 1,
			name: "Chipsy",
			barcode: "123456",
			ingredients: "dad, dadad, adada",
			productPhoto: "slika",
			barcodePhoto: "adadad",
			ingredientsPhoto: "zdadad",
			label: "dadadadad",
		},
		{
			productId: 2,
			name: "Coca cola",
			barcode: "123456",
			ingredients: "dad, dadad, adada",
			productPhoto: "slika",
			barcodePhoto: "adadad",
			ingredientsPhoto: "zdadad",
			label: "dadadadad",
		},
		{
			productId: 3,
			name: "Orange",
			barcode: "123456",
			ingredients: "dad, dadad, adada",
			productPhoto: "slika",
			barcodePhoto: "adadad",
			ingredientsPhoto: "zdadad",
			label: "dadadadad",
		},
	]);
});
app.post("/products", (req, res, next) => {
	res.status(200).json({ message: "Item added to shopping list" });
});
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/search", searchRouter);

const PORT: number | string = process.env.PORT || 3001;
AppSource.initialize()
	.then(() => {
		server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err: any) => {
		console.log(err);
	});
