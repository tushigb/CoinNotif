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

export default {updateBalance};
