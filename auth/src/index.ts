import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get("/api/users/guy", (req, res)=> {
    res.send("OK DUDE");
});

app.listen(10000, () => {
    console.log("auth listening on port 10000");
})