export const getHome = (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;

  res.render("index", {
    title: "Home",
    isHome: true,
    isAuth,
    isAdmin,
  });
};
