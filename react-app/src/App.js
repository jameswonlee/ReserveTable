import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authenticate } from './store/session';
import LoginForm from './components/_auth/LoginForm';
import SearchBar from './components/Search/SearchBar'
import NavBar from './components/Navigation/NavBar';
import DisplayAllRestaurants from './components/AllRestaurants/AllRestaurants';
import RestaurantProfile from './components/RestaurantProfile/RestaurantProfile';
import ReservationConfirmation from './components/Reservations/ReservationConfirmation';
import ModifyReservation from './components/Reservations/ModifyReservation';
import SignUpForm from './components/_auth/SignUpForm';
import DiningDashboard from './components/DiningDashboard/DiningDashboard';
import Footer from './components/Footer/Footer';
import NavigationLocalCity from './components/Navigation/NavigationLocalCity';
import SearchResults from './components/Search/SearchResults';
import './index.css';
// import ProtectedRoute from './components/_auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [userReservationTime, setUserReservationTime] = useState("");
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
        <NavBar loaded={loaded}
          setShowSignInModal={setShowSignInModal}
          showSignInModal={showSignInModal} />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/' exact={true} >
            <NavigationLocalCity />
            <SearchBar />
            <DisplayAllRestaurants
              setUserReservationTime={setUserReservationTime} />
          </Route>
          {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
          <Route path='/restaurants/:restaurantId'>
            <NavigationLocalCity />
            <RestaurantProfile
              userReservationTime={userReservationTime}
              setShowSignInModal={setShowSignInModal}
              showSignInModal={showSignInModal} />
          </Route>
          <Route exact path='/reservations/:reservationId'>
            <ReservationConfirmation />
          </Route>
          <Route exact path='/reservations/:reservationId/modify'>
            <ModifyReservation />
          </Route>
          <Route exact path='/users/:userId/dining-dashboard'>
            <DiningDashboard />
          </Route>
          <Route exact path='/search-results'>
            <NavigationLocalCity />
            <SearchResults />
          </Route>
          <Route>
            <h1>PAGE NOT FOUND</h1>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
