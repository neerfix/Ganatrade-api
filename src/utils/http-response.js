module.exports = {
    HTTP_200,
    HTTP_400,
    HTTP_404,
    HTTP_500,
}

function errorMessage (res, code, message, reason, details) {
    return res.status(code).send({ "code": code, "message": message, "reason": reason, "details": details })
}

function HTTP_200 (req, res, next) {
    return res.status
}

function HTTP_400 (req, res, next, field) {
    errorMessage(res, 400, "Bad request", field + " is required")
}

function HTTP_404 (req, res, next, items, message) {
    errorMessage(res, 404, "Not Found", items + " not found", message)
}

function HTTP_500 (req, res, next, error) {
    return res.status(400).send({ "code": 500, "message": "Internal server error", "reason": error.message });
}
