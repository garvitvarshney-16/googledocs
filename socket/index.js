import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 9000;

const io = new Server(PORT, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", (docId) => {
    const data = "";
    socket.join(docId);
    socket.emit("load-document", data);
  });
  socket.on("send-changes", ({id, content}) => {
    socket.broadcast.to(id).emit("receive-changes", {id, content});
  });
});
