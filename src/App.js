import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/slices/authSlice';
import Login from './components/auth/Login';
import UserForm from './components/user-form/UserForm';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { GlobalStyle } from './GlobalStyles';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Provider store={store}>
        <Switch>
          <PrivateRoute exact path='/profile' component={UserForm} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Provider>
    </>
  );
}
