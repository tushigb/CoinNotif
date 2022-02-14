import createStore from './Store';
import reducer from './reducers/auth.reducer';
import actions from './actions/auth.action';

export const {Provider, Context} = createStore(reducer, actions, {
  token: null,
  user: {},
  loading: false,
});
