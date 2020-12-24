import React from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch } from 'react-router-dom'

import Login from './Components/pages/Login'
import Home from './Components/pages/Home/Home'
import Register from './Components/pages/Register';
import ApolloProvider from './Components/apollo/ApolloProvider';

import DynamicRoute from './Components/utils/DynamicRoute';
import {AuthProvider} from './Components/context/auth'
import {MessageProvider} from './Components/context/message'

function App() {
  
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Container className="pt-5">
              <Switch>
                <DynamicRoute exact path="/" component={Home} authenticated />
                <DynamicRoute path="/register" component={Register} guest />
                <DynamicRoute path="/login" component={Login} guest />
              </Switch>
            </Container>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
