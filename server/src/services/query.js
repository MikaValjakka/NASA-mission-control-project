
const DEFAULT_PAGE = 1;

// Mongo DB returns all documents when 0
const DEFAULT_DOCUMENT_LIMIT = 0;



function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE;
    const limit = Math.abs(query.limit) || DEFAULT_DOCUMENT_LIMIT;
    // eaxmple: in first page = 1 -1 * 20 = 0 etc.
    const skip = (page - 1) * limit;

    return {
        skip,
        limit
    };
};

module.exports = {
    getPagination
}
