import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/_auth/LoginForm';
import SearchBar from './components/SearchBar/SearchBar'
import NavBar from './components/Navigation/NavBar';
import { authenticate } from './store/session';
import DisplayAllRestaurants from './components/AllRestaurants/AllRestaurants';
import RestaurantProfile from './components/RestaurantProfile/RestaurantProfile';
import ReservationConfirmation from './components/Reservations/ReservationConfirmation';
import ModifyReservation from './components/Reservations/ModifyReservation';
import Reservations from './components/Reservations/Reservations';
import SignUpForm from './components/_auth/SignUpForm';
import MyDiningHistory from './components/Reservations/MyDiningHistory';

// import ProtectedRoute from './components/_auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';

import './index.css';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <NavBar loaded={loaded} />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/' exact={true} >
            <SearchBar />
            <DisplayAllRestaurants />
          </Route>
          {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
          <Route path='/restaurants/:restaurantId'>
            <RestaurantProfile />
          </Route>
          <Route path='/restaurants/:restaurantId/reservations'>
            <Reservations />
          </Route>
          <Route exact path='/reservations/:reservationId'>
            <ReservationConfirmation />
          </Route>
          <Route exact path='/reservations/:reservationId/modify'>
            <ModifyReservation />
          </Route>
          <Route exact path='/users/:userId/dining-dashboard'>
            <MyDiningHistory />
          </Route>
        </Switch>
      </BrowserRouter>
      <footer>
        <div className="footer-container">


        </div>
      </footer>
    </>
  );
}

export default App;
