import createStore from './Store';
import authReducer from './reducers/auth.reducer';
import authActions from './actions/auth.action';

export const {Provider, Context} = createStore(authReducer, authActions, {
  token: null,
  user: {},
  loading: false,
});
