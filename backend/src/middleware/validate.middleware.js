export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log(result.error);

      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    next();
  };
};