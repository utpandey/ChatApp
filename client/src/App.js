import React from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './Components/pages/Login'
import Home from './Components/pages/Home'
import Register from './Components/pages/Register';
import ApolloProvider from './Components/apollo/ApolloProvider';

function App() {
  

  return (
    <ApolloProvider>
      <Container className="pt-5">
        <BrowserRouter>
          <Container className="pt-5">
            <Switch>
              <Route exact path="/" component={Home} authenticated />
              <Route path="/register" component={Register} guest />
              <Route path="/login" component={Login} guest />
            </Switch>
          </Container>
        </BrowserRouter>
      </Container>
    </ApolloProvider>
  );
}

export default App;
