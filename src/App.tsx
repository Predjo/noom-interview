import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import createStores from './stores/createStores';

import FoodView from './components/FoodView';

const stores = createStores();

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <div className="App">
          <header className="App-header">Hello Noom</header>

          <FoodView />
        </div>
      </Provider>
    );
  }
}

export default App;
