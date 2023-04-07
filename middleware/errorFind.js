export const errorFind = (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;

  res.status(404).render("error", {
    title: "Error",
    isAuth,
    isAdmin,
  });
};
