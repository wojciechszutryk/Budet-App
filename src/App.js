import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import theme from 'utilities/theme'

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Loading, Navigation, Wrapper} from 'components'
import {fetchBudget, fetchBudgetCategories} from "./data/actions/budgetActions";

function App({fetchBudget, fetchBudgetCategories}) {

    useEffect(()=>{
        fetchBudget(1);
        fetchBudgetCategories(1);
    },[fetchBudget, fetchBudgetCategories])

    return (
        <>
          <GlobalStyles/>
          <Router>
              <Navigation pages={[
                      {
                          name: 'Start',
                          link:'/'
                      },
                      {
                          name:'Budget',
                          link:'/budget'
                      },
                  ]}
              />
              <Wrapper>
                  <Switch>
                      <Route path='/' exact>Start Page</Route>
                      <Route path='/budget'>Budget</Route>
                  </Switch>
              </Wrapper>
          </Router>
        </>
    );
}

const ConnectedApp = connect(state => ({budget: state.budget.budget}),
    {fetchBudget, fetchBudgetCategories}
    )(App);

function RootApp(){
    return(
        <ThemeProvider theme={theme}>
            <React.Suspense fallback={<Loading/>}>
                <ConnectedApp/>
            </React.Suspense>
        </ThemeProvider>
    )
}

export default RootApp;
