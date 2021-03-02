import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import theme from 'utilities/theme';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {BudgetPage, TransactionsPage} from "./RoutePages";
import {Loading, Navigation, Wrapper} from 'components';

function App() {
    return (
        <>
          <GlobalStyles/>
          <Router>
              <Navigation pages={[
                      {
                          name: 'Budget',
                          link:'/'
                      },
                      {
                          name:'Transactions',
                          link:'/transactions'
                      },
                  ]}
              />
              <Wrapper>
                  <Switch>
                      <Route path='/' exact><BudgetPage/></Route>
                      <Route path='/transactions'><TransactionsPage/></Route>
                  </Switch>
              </Wrapper>
          </Router>
        </>
    );
}

function RootApp(){
    return(
        <ThemeProvider theme={theme}>
            <React.Suspense fallback={<Loading/>}>
                <App/>
            </React.Suspense>
        </ThemeProvider>
    )
}

export default RootApp;