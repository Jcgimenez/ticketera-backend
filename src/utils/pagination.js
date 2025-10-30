function parsePagination(query) {
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || '20', 10), 1), 100);
  const offset = (page - 1) * limit;
  const sortBy = query.sortBy || 'createdAt';
  const order = (query.order || 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  return { page, limit, offset, sort: [[sortBy, order]] };
}

function meta(count, page, limit) {
  const total = count;
  const pages = Math.ceil(total / limit);
  return { total, page, limit, pages };
}

module.exports = { parsePagination, meta };

