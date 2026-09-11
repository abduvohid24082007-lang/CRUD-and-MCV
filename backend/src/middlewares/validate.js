function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issues) => ({
        field: issues.path.join("."),
        message: issues.message,
      }));
      return res.status(400).json({
        success: false,
        error: "iltimos maydonlarni toldiring",
        datails: errors,
      });
    }
    req.body = result.data;
    next();
  };
}

module.exports = validate;
