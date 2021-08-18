import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GlobalStyle } from './GlobalStyles';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={() => <h1>123</h1>} />
        </Switch>
      </Provider>
    </>
  );
}
