module.exports = (err, req, res, next) => {
    console.log(err)
    statusCode = err.statusCode || 500
    res.status(statusCode).json({ error: err.message })
}