const user = (req, res) => {
  res.json(req.user);
};

module.exports = {
  user,
};
