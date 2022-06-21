import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './containers/Home';
import Edit from './containers/Edit';

const Router = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/edit'} component={Edit} />
            </Switch>
        </>
    );
};
export default Router;
