import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt-nodejs";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import bodyParser from "body-parser";
import passportJwt from "passport-jwt";
const ExtractJwt = passportJwt.ExtractJwt;

const app = express();
app.use(bodyParser.json());

const jwtSecret = "thisisexamplejwtsecret";

type UserModel = {
  username: String;
  password: String;
};

const defaultScope = ["GET", "POST"];

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
    { username: req.body.username, scope: defaultScope },
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
  // if req.body.username & hashedPassword not match in database
  //   res.status(401).send({ message: "Invalid username/password" });
  //   return;
  // }

  const token = jwt.sign(
    { username: req.body.username }, //, scope: req.body.scope
    jwtSecret
  );

  res.status(200).send({ token: token });
});

const JwtStrategy = passportJwt.Strategy;
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    function (jwtToken, done) {
      // TODO: implement compare username in db
      // NOTE: error case
      // if (err) {
      //   return done(err, false);
      // }

      // NOTE: success case
      // if (user) {
      const mockUser = {
        username: jwtToken.username,
      };
      return done(undefined, mockUser, jwtToken);
      // } else {
      // NOTE: not have user case
      // return done(undefined, false);
      // }
    }
  )
);

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      console.log(err);
      return res.status(401).json({ status: "error", code: "unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      return next();
    }
  })(req, res, next);
};

// https://www.postman.com/workshop-so-academy-course/workspace/express-workshop/request/25674280-4788d58c-29da-4023-95fc-c0a1eb11b96a
app.get("/example-protect", authenticateJWT, (req: Request, res: Response) => {
  res.status(200).send({ message: "access passed" });
});

const authorizeJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", function (err, user, jwtToken) {
    if (err) {
      console.log(err);
      return res.status(401).json({ status: "error", code: "unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      const scope = req.method;

      const authScope = jwtToken.scope;
      if (authScope && authScope.indexOf(scope) > -1) {
        return next();
      } else {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
    }
  })(req, res, next);
};

// https://www.postman.com/workshop-so-academy-course/workspace/express-workshop/request/25674280-98cb89fb-8e3d-4068-a832-b214a6a5d4f9
app.get(
  "/example-protect-authorize",
  authorizeJWT,
  (req: Request, res: Response) => {
    res.status(200).send({ message: "access passed" });
  }
);

// https://www.postman.com/workshop-so-academy-course/workspace/express-workshop/request/25674280-5c8cf87b-4637-49e8-be9c-2df4ceac6000
app.delete(
  "/example-protect-authorize",
  authorizeJWT,
  (req: Request, res: Response) => {
    res.status(200).send({ message: "access passed" });
  }
);

app.listen(5000, () => console.log("Server started on port 5000"));

