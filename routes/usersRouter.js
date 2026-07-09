import { Router } from "express";
import {
  usersListGet,
  usersCreateGet,
  usersCreatePost,
  usersUpdateGet,
  usersUpdatePost,
} from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/", usersListGet);
usersRouter.get("/create", usersCreateGet);
usersRouter.post("/create", usersCreatePost);
usersRouter.get("/:id/update", usersUpdateGet);
usersRouter.post("/:id/update", usersUpdatePost);

export default usersRouter;
