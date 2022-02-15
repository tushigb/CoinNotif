const walletReducer = (state, action) => {
  switch (action.type) {
    case 'updateBalance':
      return {
        balance: action.payload.balance,
      };
    default:
      return state;
  }
};

export default walletReducer;
