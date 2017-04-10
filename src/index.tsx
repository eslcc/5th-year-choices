import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import injectTapEventPlugin = require('react-tap-event-plugin');
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
    (
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    ),
    document.getElementById('root') as HTMLElement
);
