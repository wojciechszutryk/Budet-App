import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import theme from 'utilities/theme';

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {BudgetPage} from "./RoutePages";
import {Loading, Navigation, Wrapper} from 'components';

function App() {
    return (
        <>
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
              />
              <Wrapper>
                  <Switch>
                      <Route path='/' exact>Start Page</Route>
                      <Route path='/transactions'><BudgetPage/></Route>
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