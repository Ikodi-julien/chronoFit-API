module.exports = (req, res, next) => {
  const id = req.params.id;
  const regexp = /[0-9]+/;
  
  if (!regexp.test(id)) return res.status(400).json('":id" need to be a number');
  next();
}