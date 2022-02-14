const walletReducer = (walletState, action) => {
  switch (action.type) {
    case 'updateBalance':
      return {
        balance: action.payload.balance,
      };
    default:
      return walletState;
  }
};

export default walletReducer;
