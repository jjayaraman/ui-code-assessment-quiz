import React from 'react';
import { Quiz } from './container/Quiz';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Summary from './component/Summary';

export const App = () => (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <h1>Lucid</h1>
        <h2>Welcome to UI Team code assessment!</h2>
        <br /><br />

        <Router >
            <Switch>
                <Route path='/' exact strict>
                    <Quiz />
                </Route>
                <Route path='/summary' exact strict render={(props) => <Summary  {...props} ></Summary>} >
                </Route>
            </Switch>
        </Router>
    </div>
);
