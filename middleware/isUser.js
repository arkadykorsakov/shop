export const isUser = (req, res, next) => {
  if (!req.session.isAdmin) {
    next();
  } else {
    req.session.error = "You must have customer rights";
    res.status(403).redirect("/office");
  }
};
