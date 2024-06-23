export class UserManager {
    users: any[];

    constructor(users: any[]) {
        this.users = users;
    }

    addUser(username: string, socketId: string, roomId: string) {
        const index = this.users.findIndex((user) => user.username === username);
        if (index !== -1) {
            this.users[index].socketId = socketId;
        } else {
            this.users.push({ username, roomId, socketId: socketId });
        }
        console.log(this.users);
    }

    setUserRoom(socketId: string, roomId: any) {
        const index = this.users.findIndex((user) => user.socketId === socketId);
        if (index !== -1) {
            this.users[index].roomId = roomId;
        }
        console.log(this.users);
    }

    findUserRoom(socketId: string) {
        const user = this.users.find((user) => user.socketId === socketId);
        if (user) {
            console.log("User: ", user);
            return user.roomId;
        }
    }

    removeUser(socketId: string) {
        const filtered = this.users.filter((user) => user.socketId !== socketId);
        this.users = filtered;
    }
}