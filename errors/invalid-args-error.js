class InvalidArgsError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidArgsError";
    }
}

module.exports = InvalidArgsError;