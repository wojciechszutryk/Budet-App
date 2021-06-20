import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import {lightStyles, darkStyles} from 'utilities/theme';
import 'react-toastify/dist/ReactToastify.css';

import React, {useState} from 'react';
import {toast} from 'react-toastify';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {BudgetPage, TransactionsPage, HomePage} from "./RoutePages";
import {Navigation, SuspenseErrorBoundary, Wrapper} from 'components';
import {QueryClient, QueryClientProvider} from "react-query";
import RegisterPage from "./RoutePages/RegisterPage";
import LoginPage from "./RoutePages/LoginPage";
import CheckAuth from "./utilities/CheckAuth";

function App() {
    const [theme, setTheme] = useState(darkStyles);
    toast.configure();
    return (
        <ThemeProvider theme={theme}>
          <GlobalStyles/>
          <Router>
              <Navigation pages={[
                      {
                          name: 'Budget',
                          link:'/budget'
                      },
                      {
                          name:'Transactions',
                          link:'/transactions'
                      },
                  ]}
                  theme = {theme.name}
                  themeSet = {theme === lightStyles ? () => setTheme(darkStyles) : () => setTheme(lightStyles)}
              />
              <SuspenseErrorBoundary>
                  <Wrapper>
                      <Switch>
                          <Route path='/' exact><HomePage reload={theme}/></Route>
                          <CheckAuth path='/budget'><BudgetPage/></CheckAuth>
                          <CheckAuth path='/transactions'><TransactionsPage/></CheckAuth>
                          <Route path='/register'><RegisterPage/></Route>
                          <Route path='/login'><LoginPage/></Route>
                      </Switch>
                  </Wrapper>
              </SuspenseErrorBoundary>
          </Router>
        </ThemeProvider>
    );
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
})

function RootApp(){
    return(
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    )
}

export default RootApp;