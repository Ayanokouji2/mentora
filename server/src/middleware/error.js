const handleApiError = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  console.log("error",err);
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err)=>next(err));
  };
};

export { handleApiError, asyncHandler };