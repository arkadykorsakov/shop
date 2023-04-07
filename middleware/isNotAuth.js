export const isNotAuth = (req, res, next) => {
  if (req.session.isAuth) {
    req.session.error = "You are already logged in";
    res.redirect("/office");
  } else {
    next();
  }
};
