export const signup = dispatch => {
  return ({email, password}) => {};
};

export const signin = dispatch => {
  return payload => {
    dispatch({
      type: 'signin',
      payload: {
        token: payload.token,
        user: payload.user,
      },
    });
  };
};

export const update = dispatch => {
  return payload => {
    dispatch({
      type: 'update',
      payload: {
        user: {},
      },
    });
  };
};

export const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const setLoading = dispatch => {
  return payload => {
    dispatch({
      type: 'loading',
      payload: payload,
    });
  };
};

export default {signup, signin, update, signout, setLoading};
