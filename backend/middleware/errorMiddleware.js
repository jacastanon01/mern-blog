// since the default middleware for express is an html page
// so this is to return json and stack-trace in dev

const notFound = (req,res,next) => {
    const error = new Error(`${req.originalUrl} not found`)
    res.status(404).json({ error })
    next()
}

const errorHandler = (err, req, res, next) => {
    // if we're throwing this error we don't want the status code to still be 200
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let errorMessage = err.message 

    // mongoose cast error handler
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404
        errorMessage = "Resource not found"
    }

    res.status(statusCode).json({
        message: errorMessage,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}

export { notFound, errorHandler }