import express from "express";
import cors from "cors";
import router from "./app/route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(cors());
app.use(express.json());

app.use(`/api`, router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
