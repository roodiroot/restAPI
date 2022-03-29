class APIerror extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new APIerror(404, message)
    }
    static internal(message) {
        return new APIerror(500, message)
    }
    static forbidden(message) {
        return new APIerror(403, message)
    }
}

module.exports = APIerror