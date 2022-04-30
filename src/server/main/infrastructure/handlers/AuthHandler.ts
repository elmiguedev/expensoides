import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

export class AuthHandler {

  public async login(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Invalid authentication",
          user: user
        })
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(user, process.env.JWT_SECRET);
        return res.json({ user, token });
      });

    })(req, res, next);
  }

}