import "reflect-metadata";
import express from "express";
import usersRoute from "./routes/users.route";

const server = express();

server.use(express.json());

server.use(usersRoute);

server.listen(3000,  () => console.log("Server is running..."));
