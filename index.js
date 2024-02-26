import Express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import cors from  'cors';

const app = Express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRouter); 

app.get( "/", (req, res) => {
    res.send('<a href="/users">Users</a>');
});


app.listen(PORT);
