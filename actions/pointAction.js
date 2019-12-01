// pointAction.js

import * as actionTypes from './actionTypes';

export const createPoint = (point) => {
    return {
      type: actionTypes.CREATE_NEW_POINT,
      point: point
    }
  };
