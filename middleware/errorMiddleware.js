const errorMiddleware = (err, req, res, next) => {
  console.error('Error caught by middleware');

  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  const response = {
    message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null}
  



  res.json(response);
};

module.exports = errorMiddleware;
