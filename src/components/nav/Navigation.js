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

const Navigation = ({pages= [], theme, themeSet, themeToggle}) => {
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
                    <Navbar.Toggle as={Toggler} variant="link" eventKey="0" aria-controls="responsive-navbar-nav"/>
                    <NavList>
                        {list}
                    </NavList>
                    <Navbar.Collapse id="responsive-navbar-nav" eventKey="0">
                        <Nav className="ml-auto">
                            <NavList>
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </NavList>
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

export default connect(null,mapDispatchToProps)(Navigation);
