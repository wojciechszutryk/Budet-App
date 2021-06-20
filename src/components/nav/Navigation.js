import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faMoon, faCloud} from "@fortawesome/free-solid-svg-icons";
import {NavLink } from 'react-router-dom'
import {NavList, NavigationContainer, NavigationWrapper, Toggler, UserActionsButtons} from './NavigationStyles'
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import {InlineButton, SetDarkButton, SetLightButton} from "../Button/ButtonStyles";
import {connect} from "react-redux";
import {themeToggle} from "../../data/actions/commonActions";
import {Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAccount from "../UserAccount";
import CheckAuth from "../../utilities/CheckAuth";


const Navigation = ({pages= [], theme, themeSet, themeToggle, token}) => {
    const {t} = useTranslation();

    const list = pages.map(page => (
        <NavLink key={page.name} exact activeClassName="selected" to={page.link} onClick={() => handleRedirect(page.link)}>
            <InlineButton>
                {t(page.name)}
            </InlineButton>
        </NavLink >
    ))

    const handleRedirect = (link) => {
        return <CheckAuth redirectURL={link}/>
    }

    const handleThemeChange = () => {
        themeSet();
        themeToggle();
    }

    return (
        <NavigationWrapper>
            <NavigationContainer>
                <Navbar collapseOnSelect expand="md">
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
                                <UserActionsButtons>
                                    <NavLink exact to={'/login'}>
                                        <InlineButton>{t("Login")}</InlineButton>
                                    </NavLink>
                                    <NavLink exact to={'/register'}>
                                        <InlineButton>{t("Register")}</InlineButton>
                                    </NavLink>
                                </UserActionsButtons>
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
