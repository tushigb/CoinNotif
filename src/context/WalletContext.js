import createStore from './Store';
import reducer from './reducers/wallet.reduce';
import actions from './actions/wallet.action';

export const {Provider, Context} = createStore(reducer, actions, {
  balance: 0,
  check: false,
});
