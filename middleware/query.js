const query = (req, res, next) => {
  const page = req.query.page;
  const offset = req.query.offset;

  req.page = page;
  req.offset = offset;

  next();
};

module.exports = query;
