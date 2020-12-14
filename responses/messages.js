function errors(res, code, error, message){
    return res.status(code).json({ "code": code, "message": error.code, "reason": error.message, "details": message });
}

function successCreate(res, body){
    return res.status(201).send(body);
}

function successUpdate(res, body){
    return res.status(202).send(body);
}

function success(res, body){
    return res.status(200).send(body);
}

module.exports = {
    errors: errors(),
    success: success(),
    successCreate: successCreate(),
    successUpdate: successUpdate()
}