exports.requestNotFound = (req, res, next) => {
    res.status(404).json({success: false, error: {status: 404, message: 'Resource not available'}})
}