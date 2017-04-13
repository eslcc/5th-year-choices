import * as React from 'react';
import {Provider} from 'react-redux';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Home from './screens/home';
import Basics from './screens/basics';
import Table from './screens/table';
import Stepper from './Stepper';

import createStore from './Store';

const store = createStore();

interface AppState {
    drawerOpen: boolean;
}

class App extends React.Component<{}, AppState> {
    render() {
        return (
            <Provider store={store}>
                <Router basename={window.location.host.indexOf('localhost') !== -1 ? '/' : '/5th-year-choices'}>
                    <div>
                        <Route path="/choice/:step" component={Stepper} />

                        <Route exact path="/" component={Home} />
                        <Route path="/choice/basics" component={Basics} />
                        <Route path="/choice/table" component={Table} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
