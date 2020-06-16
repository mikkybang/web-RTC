import express, {Application, Request, Response, NextFunction } from "express";

const app: Application = express()




app.get('/', (req: Request, res: Response) => {
    res.send("hello");
})

app.listen(9090, () => console.log("server running"))