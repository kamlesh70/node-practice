import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import passport from "passport";
import "./util/OAuth";

export const app = express();

app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  res.send(JSON.stringify(req.user));
});

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
    res.end();
    return;
  }
  res.send('<a href="/auth/google">Login With Google</a>');
});

app.get("/logout", (req, res) => {
  req.logout({ keepSessionInfo: false }, () => {
    res.redirect("/");
  });
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

export const shutdown = () => {
  console.log("Shutting down server...");
  server.close();
};
