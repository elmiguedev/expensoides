import express, { Request, Response } from "express";
import path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "../../../app/dist")));
app.get("/ping", (req: Request, res: Response) => {
    res.send("pong pong");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



