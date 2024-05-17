const errorHandler = (err, req, res, next) => {
    console.error('Error occurred');
    console.error(err.stack);

    const statusCode = err.statusCode || 500;

    const response = {
        message: err.message || 'Internal Server Error',
    };
    
    res.status(statusCode).json(response);
}

module.exports = errorHandler;