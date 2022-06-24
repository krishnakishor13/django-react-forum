import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router';
import { LOGIN_USER_TOKEN } from './axios';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { PublicRoute } from './components/routes/PublicRoute';
import ApplicationAddUpdate from './containers/Application/AddUpdate';
import ApplicationList from './containers/Application/List';
import Home from './containers/Home';
import InterviewAddUpdate from './containers/Interview/AddUpdate';
import InterviewList from './containers/Interview/List';
import Login from './containers/Login';
import { checkLoginAction } from './reducks/users/actions';
import { fetchUserFromLocalStorage } from './reducks/users/operations';
import AuthRequest from './requests/auth-request';
import Admins from './containers/Admins/List';
import Add from './containers/Admins/AddUpdate';
import StudentList from './containers/Students/List';
import StudentAddUpdate from './containers/Students/AddUpdate';

const Router = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem(LOGIN_USER_TOKEN);
    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());
        if (token) {
            AuthRequest.checkLogin().then(response => {
                dispatch(checkLoginAction(response));
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Switch>
            <PublicRoute token={token} component={Login} path={'/login'} exact />
            <PrivateRoute token={token} component={ApplicationList} path={'/applications'} exact />
            <PrivateRoute token={token} component={ApplicationAddUpdate} path={'/applications/:action/:id?'} exact />
        </Switch>
    );
};
export default Router;
