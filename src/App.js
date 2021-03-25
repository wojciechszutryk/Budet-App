import GlobalStyles from 'indexStyle';
import {ThemeProvider} from 'styled-components';
import {lightStyles, darkStyles} from 'utilities/theme';
import 'react-toastify/dist/ReactToastify.css';

import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {BudgetPage, TransactionsPage} from "./RoutePages";
import {Loading, Navigation, Wrapper} from 'components';

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
              <Wrapper>
                  <Switch>
                      <Route path='/budget'><BudgetPage/></Route>
                      <Route path='/transactions'><TransactionsPage/></Route>
                  </Switch>
              </Wrapper>
          </Router>
        </ThemeProvider>
    );
}

function RootApp(){
    return(

            <React.Suspense fallback={<Loading/>}>
                <App/>
            </React.Suspense>

    )
}

export default RootApp;