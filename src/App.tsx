import React, { Component } from 'react';
import { configure } from 'mobx';

import createStores from './stores/createStores';

import FoodView from './components/FoodView';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// Don't allow state modifications outside actions!
configure({ enforceActions: 'always' });
const stores = createStores();

class App extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" bg="info" variant="dark">
          <Navbar.Brand>Calorie Counter App</Navbar.Brand>
        </Navbar>
        <Container>
          <FoodView appStore={stores.appStore} />
        </Container>
      </div>
    );
  }
}

export default App;
