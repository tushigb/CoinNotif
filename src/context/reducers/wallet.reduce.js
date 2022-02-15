const walletReducer = (state, action) => {
  switch (action.type) {
    case 'updateBalance':
      return {
        ...state,
        balance: action.payload.balance,
        check: false,
      };
    case 'setCheck':
      return {
        ...state,
        check: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
