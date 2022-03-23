import passport from "passport";
import PassportLocal from "passport-local"
import PassportJWT from "passport-jwt";

const LocalStrategy = PassportLocal.Strategy;
const JWTStrategy = PassportJWT.Strategy;

const users = [{ id: 1, email: "test", password: "test" }];

export const PassportMiddleware = () => {

  passport.use("local", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, cb) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        const user = users.find(u => u.email == email && user.passport == password);

        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }
        return cb(null, user, { message: 'Logged In Successfully' });
      } catch (error) {
        err => cb(err)
      }

    }
  ));
  passport.use("jwt", new JWTStrategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SECRETO'
  },
    (jwtPayload, cb) => {
      console.log("INTENTA CONTROLAR", jwtPayload);
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      try {
        const user = users.find(u => u.id == jwtPayload.id);

        if (!user) {
          return cb(null, user);
        }
        return cb(null, user, { message: 'Logged In Successfully' });
      } catch (err) {
        return cb(err);
      }

    }
  ));

  return passport.authenticate("jwt", { session: false });
}
