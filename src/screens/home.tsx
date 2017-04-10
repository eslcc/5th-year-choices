import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component<void, void> {
    render() {
        return (
            <div>
                <h1>5th Year Subject Choices</h1>
                <Link to="/choice/basics">Start</Link>
            </div>
        );
    }
}