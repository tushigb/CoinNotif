export const updateBalance = dispatch => {
  return payload => {
    dispatch({
      type: 'updateBalance',
      payload: {
        balance: payload.balance,
      },
    });
  };
};

export const setCheck = dispatch => {
  return payload => {
    dispatch({
      type: 'setCheck',
      payload: {
        check: payload,
      },
    });
  };
};

export default {updateBalance, setCheck};
