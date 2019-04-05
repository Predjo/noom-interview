import React from 'react';
import { configure } from 'mobx';

import createStores from './stores/createStores';

import FoodView from './components/FoodView';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// Don't allow state modifications outside actions!
configure({ enforceActions: 'always' });
const stores = createStores();

const App: React.FunctionComponent = () => {
  return (
    <>
      <Navbar expand="lg" bg="info" variant="dark">
        <Navbar.Brand>Calorie Counter App</Navbar.Brand>
      </Navbar>

      <Container>
        <FoodView appStore={stores.appStore} />
      </Container>
    </>
  );
};

export default App;
