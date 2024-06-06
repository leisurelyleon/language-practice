import React from 'react';
import ReactDOMServer from 'react-dom/server';

const App = () => <div>Hello, World!</div>;

const html = ReactDOMServer.renderToString(<App />);

console.log(html); // Output HTML to send to the client