import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faMoon, faCloud} from "@fortawesome/free-solid-svg-icons";
import {NavLink } from 'react-router-dom'
import {NavList, NavigationContainer, NavigationWrapper, Toggler} from './NavigationStyles'
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import {InlineButton, SetDarkButton, SetLightButton} from "../Button/ButtonStyles";
import {connect} from "react-redux";
import {themeToggle} from "../../data/actions/commonActions";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAccount from "../UserAccount";

const Navigation = ({pages= [], theme, themeSet, themeToggle, token}) => {
    const {t} = useTranslation();

    const list = pages.map(page => (
        <NavLink key={page.name} exact activeClassName="selected" to={page.link}>
            <InlineButton>
                {t(page.name)}
            </InlineButton>
        </NavLink >
    ))

    const handleThemeChange = () => {
        themeSet();
        themeToggle();
    }

    return (
        <NavigationWrapper>
            <NavigationContainer>
                <Navbar collapseOnSelect expand="sm">
                    <Navbar.Toggle as={Toggler} variant="link" aria-controls="responsive-navbar-nav"/>
                    <NavList>
                        {list}
                    </NavList>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {
                                token
                                    ?
                                <NavList style={{marginTop: '14px'}}>
                                     <UserAccount/>
                                </NavList>
                                    :
                                <NavList>
                                    <NavDropdown title={t("Account")} id="collasible-nav-dropdown">
                                        <NavDropdown.Item>
                                            <NavLink to={'/login'}>{t("Login")}</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <NavLink to={'/register'}>{t("Register")}</NavLink>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </NavList>
                            }

                            <NavList className="pt-1">
                                {theme === 'lightTheme' ?
                                    <SetDarkButton onClick={handleThemeChange}><FontAwesomeIcon icon={faCloud} /><FontAwesomeIcon icon={faMoon} /></SetDarkButton> :
                                    <SetLightButton onClick={handleThemeChange}><FontAwesomeIcon icon={faCloud} /><FontAwesomeIcon icon={faSun} /></SetLightButton>
                                }
                                <LanguageSwitcher/>
                            </NavList>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </NavigationContainer>
        </NavigationWrapper>
    );
};

const mapDispatchToProps = {
    themeToggle
};

export default connect(state => ({
    token: state.common.token
}),mapDispatchToProps)(Navigation);
