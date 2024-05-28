import path from "path";
import http from "http";
import express, { Express, Request } from "express";
import socketio, { Server as SocketIOServer, Socket } from "socket.io";
import cors from "cors";
import { javaScriptController } from "./controllers/javaScriptController";
import { evaluateRouter } from "./routes/evaluate";
import dotenv from "dotenv";
import { AppSource } from "./database/database";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { postsRouter } from "./routes/posts";
import { commentsRouter } from "./routes/comments";
import multer from "multer";
import { randomInt } from "crypto";
import { ConnectedUser } from "./models/connected-user";

const rooms = [];
let users: any[] = [];

const app: Express = express();
app.use(cors());
dotenv.config();

const server: http.Server = http.createServer(app);
const io: SocketIOServer = new socketio.Server(server, {
	cors: {
		origin: "http://localhost:3000", // Allow requests only from this origin
		methods: ["GET", "POST"], // Allow only GET and POST requests
	},
});

io.on("connection", (socket: Socket) => {
	console.log("Client connected", socket.id);

	socket.on("codeChange", (newValue: any) => {
		console.log(newValue.roomId);
		socket.broadcast.to(newValue.roomId).emit("codeChange", newValue);
	});

	socket.on("username", (value: string) => {
		console.log(users.length);
		if (users.length > 0) {
			const index = users.findIndex((user) => user.username === value);
			if (index !== -1) {
				users[index] = { username: value, socketId: socket.id };
			} else {
				users.push({ username: value, socketId: socket.id });
			}
		} else {
			users.push({ username: value, socketId: socket.id });
		}
		console.log("Users", users);
	})

	socket.on("joinRoom", (newValue: any) => {
		const index = users.findIndex((user) => user.username === newValue.user.username);
		if (index !== -1) {
			users[index] = { username: newValue.user.username, roomId: newValue.roomId };
		}
		socket.join(newValue.roomId);
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

	socket.on("disconnect", () => {
		if (users.length > 0) {
			const filtered = users.filter((user) => user.socketId !== socket.id);
			console.log(filtered);
			users = filtered;
		}
		console.log("Client disconnected!");
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

app.use("/evaluate", evaluateRouter);
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
})
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

// Store code value for collaborative editing
let codeValue: string = "console.log('hello world!');";


const PORT: number | string = process.env.PORT || 3001;
AppSource.initialize().then(() => {
	server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err: any) => {
	console.log(err);
})
