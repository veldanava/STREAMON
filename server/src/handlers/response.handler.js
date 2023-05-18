const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data)

// if error (500)
const error = (res) => responseWithData(res, 500, {
    status: 500,
    message: "something wrong oniisan!"
});

// if badreq (400)
const badrequest = (res, message) => responseWithData(res, 400, {
    status: 400,
    message
});

// if ok (200)
const ok = (res, data) => responseWithData(res, 200, data)

const created = (res, data) => responseWithData(res, 201, data)

// if unathorized (401)
const unauthorize = (res) => responseWithData(res, 401, {
    status: 401,
    message: "unathorized!, check again oniisan"
});

// if notfound (404)
const notfound = (res) => responseWithData(res, 404, {
    status: 404,
    message: "this page not found"
});

export default {
    error, 
    badrequest,
    ok,
    created,
    unauthorize,
    notfound
};