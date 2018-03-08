import * as React from 'react';
import './App.scss';
import NewUser from './NewUser';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React with Typescript and SCSS Sub Feb 18, 2018 8:29 AM</h1>
        </header>
        <NewUser/>
      </div>
    );
  }
}

export default App;
