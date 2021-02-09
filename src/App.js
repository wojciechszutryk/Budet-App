import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import theme from 'utilities/theme'

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Loading, Navigation, Wrapper} from 'components'
import {fetchBudget, fetchCategories} from "./data/actions/budgetActions";

function App({budget, fetchBudget, fetchCategories}) {

    useEffect(()=>{
        fetchBudget(1);
        fetchCategories(1);
    },[fetchBudget, fetchCategories])

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
    {fetchBudget, fetchCategories}
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
