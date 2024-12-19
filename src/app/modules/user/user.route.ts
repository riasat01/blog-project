import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

router.post(
    `/register`,
    validateRequest(UserValidations.createUserValidationSchema),
    UserControllers?.createUser,
);

export const UserRouter = router;
