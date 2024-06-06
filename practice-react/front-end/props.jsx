import React from 'react';

class Greeting extends React.Component {
    render() {
        return <div>Hello, {this.props.name}!</div>;
    }
}

class App extends React.Component {
    render() {
        return <Greeting name="World" />;
    }
}

export default App;