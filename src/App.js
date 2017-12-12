// npm packages
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

// components
import Valkyrie from './components/Valkyrie';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Valkyrie />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
