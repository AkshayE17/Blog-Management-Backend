import Router from "express";
import {userController} from "../controllers/userController";



const userRouter = Router();


userRouter.post("/register", userController.createUser.bind(userController));
userRouter.get("/:id", userController.getUser.bind(userController));
userRouter.put("/:id", userController.updateUser.bind(userController));
userRouter.delete("/:id", userController.deleteUser.bind(userController));
userRouter.get("/", userController.listUsers.bind(userController));
userRouter.post("/generateUrl", userController.getPresignedUrl.bind(userController));
userRouter.post("/verifyOtp", userController.verifyOtp.bind(userController));
userRouter.post("/login", userController.login.bind(userController));


export default userRouter;