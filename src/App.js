import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import theme from 'utilities/theme'

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import {Button, Loading, Navigation, Wrapper} from 'components'
import {fetchBudget} from "./data/actions/budgetActions";

function App({budget, fetchBudget}) {
    fetchBudget(1);
    console.log(budget);
    const { t, i18n } = useTranslation('common');
    return (
        <>
          <GlobalStyles/>
          <Router>
              <Navigation pages={[
                      {
                          name:t('Start'),
                          link:'/'
                      },
                      {
                          name:t('Budget'),
                          link:'/budget'
                      },
                  ]} LanguageSwitcher={(
                      <div>
                          <Button buttonType="inline" onClick={() => i18n.changeLanguage('en')}>En</Button>
                          <Button buttonType="inline" onClick={() => i18n.changeLanguage('de')}>De</Button>
                          <Button buttonType="inline" onClick={() => i18n.changeLanguage('pl')}>Pl</Button>
                      </div>
                  )}
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
    {fetchBudget}
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
