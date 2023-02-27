import express, { Request, Response } from "express";
import bcrypt from "bcrypt-nodejs";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const jwtSecret = "thisisexamplejwtsecret";

type UserModel = {
  username: String;
  password: String;
};

app.post("/register", (req: Request<{}, {}, UserModel, {}>, res: Response) => {
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  // TODO: connect to db and save user
  // await User.create({
  //   username: req.body.username,
  //   password: hashedPassword,
  // });

  const token = jwt.sign(
    { username: req.body.username }, //, scope: req.body.scope
    jwtSecret
  );

  res.status(201).send({ token: token });
});

app.post("/login", (req: Request<{}, {}, UserModel, {}>, res: Response) => {
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  // TODO: compare user/pass in db

  const token = jwt.sign(
    { username: req.body.username }, //, scope: req.body.scope
    jwtSecret
  );

  res.status(200).send({ token: token });
});

app.listen(5000, () => console.log("Server started on port 5000"));
