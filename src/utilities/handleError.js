import _ from 'lodash';

/**
 * 1. if there is no status --> Network Error
 * 2. stuats == 401 -> Token Expired
 *
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
export default async e => {
  let error;

  switch (true) {
    case _.has(e, 'response.status') === false:
      error = {
        message: 'Something went wrong',
      };
      break;

    default:
      error = _.get(e, 'response.data', {
        errors: {},
        message: 'Something went wrong',
      });
  }

  return error;
};
