exports.errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};
