const logout = (req, res, next) => {
  req.logout(req.user, err => {
    if (err) return next(err);
  });
  return res.json({
    user: req.user,
    isAuth: req.isAuthenticated(),
    session: req.session,
  });
};

module.exports = {
  logout,
};
