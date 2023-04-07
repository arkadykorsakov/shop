export const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    req.session.error = "Log in first";
    res.status(401).redirect("/login");
  }
};
