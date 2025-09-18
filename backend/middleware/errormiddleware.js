export const notfound = (req, res, next) => {
    const error = new Error(`Not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  export const errorhandler = (err, req, res, next) => {
    // Default to 500 if statusCode isn’t set or isn’t a valid number
    const statusCode = res.statusCode && res.statusCode >= 100 && res.statusCode < 600 
        ? res.statusCode 
        : 500;
  
    res.status(statusCode);
    res.json({
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
  };