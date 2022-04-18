import passport from "passport";
import PassportLocal from "passport-local"
import PassportJWT from "passport-jwt";

const LocalStrategy = PassportLocal.Strategy;
const JWTStrategy = PassportJWT.Strategy;

const users = [{ id: 1, username: "test", password: "test" }];

export const PassportMiddleware = () => {

  passport.use("local", new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
    (username, password, cb) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        console.log("test");
        const user = users.find(u => u.username == username && u.password == password);
        if (!user) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user, { message: 'Logged In Successfully' });
      } catch (error) {
        err => cb(err)
      }

    }
  ));
  passport.use("jwt", new JWTStrategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
    (jwtPayload, cb) => {
      try {
        const user = users.find(u => u.id == jwtPayload.id);
        if (!user) {
          return cb(null, user);
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }

    }
  ));

  return passport.authenticate("jwt", { session: false });
}
