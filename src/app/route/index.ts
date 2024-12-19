import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path: `/auth`,
        route: AuthRouter,
    },
];

moduleRoutes?.forEach((route) => router.use(route?.path, route?.route));

export default router;