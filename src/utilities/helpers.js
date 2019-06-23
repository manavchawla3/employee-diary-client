/**
 * transforms errors to format formik needs
 *
 * @param  {[type]}
 * @return {[type]}
 */
export const transformErrors = error => {
  const transformed = {};

  if (error.errors) {
    Object.keys(error.errors).forEach(key => {
      transformed[key] = error.errors[key][0];
    });
  }

  return transformed;
};

export const transformPagination = pagination => {
  return {
    defaultCurrent: parseInt(pagination.currentPage),
    pageSize: pagination.limit,
    total: pagination.total,
    pageCount: Math.ceil(pagination.total / pagination.limit)
  };
};
