const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {
        token: null,
        user: null,
      };
    case 'signin':
      return {
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    case 'update':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
