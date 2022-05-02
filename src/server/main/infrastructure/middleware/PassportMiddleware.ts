import passport from "passport";
import PassportLocal from "passport-local"
import PassportJWT from "passport-jwt";
import { LoginUserAction } from "../../actions/users/LoginUserAction";

const LocalStrategy = PassportLocal.Strategy;
const JWTStrategy = PassportJWT.Strategy;

export const PassportMiddleware = (loginUserAction: LoginUserAction) => {

  passport.use("local", new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
    (username, password, cb) => {
      console.log("entra aca", username, password)

      loginUserAction.execute({ username, password }).then(
        (user) => {
          console.log("PASO AL MIDDLEWARE ", user);
          if (!user) {
            console.log("pero el user tuvo algo mal, ", user)
            return cb(null, false, { message: 'Incorrect username or password.' });
          }
          return cb(null, { ...user }, { message: 'Logged In Successfully' });
        }
      ).catch(
        err => {
          console.log("hubo un error", err)
          return cb(null, false, { message: 'Incorrect username or password.' });

        }
      );


    }
  ));
  passport.use("jwt", new JWTStrategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
    (jwtPayload, cb) => {
      try {
        return cb(null, jwtPayload);
      } catch (err) {
        return cb(err);
      }

    }
  ));

  return passport.authenticate("jwt", { session: false });
}
