import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import theme from 'utilities/theme'

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import {Button, Loading, Navigation, Wrapper} from 'components'

function App() {
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
                          <Button type="inline" onClick={() => i18n.changeLanguage('en')}>En</Button>
                          <Button type="inline" onClick={() => i18n.changeLanguage('de')}>De</Button>
                          <Button type="inline" onClick={() => i18n.changeLanguage('pl')}>Pl</Button>
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
