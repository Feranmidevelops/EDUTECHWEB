//middleware to check validate schema
exports.validateSchemas = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.json({
      status: false,
      message: error.details[0].message,
    });
  }
  next();
};
