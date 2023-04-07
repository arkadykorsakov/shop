export const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    req.session.error = "You must have administrator rights";
    res.status(403).redirect("/office");
  }
};
