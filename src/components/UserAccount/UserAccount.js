import React, {useMemo, useState} from 'react';
import {connect} from "react-redux";
import {appTokenSet} from "../../data/actions/commonActions";
import {UserButton} from "../Button/ButtonStyles";
import {useTranslation} from "react-i18next";
import {Alligner, ExpandedUserAccount, UserName, UserPhoto, UserSpan} from "./UserAccountStyles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Button} from "../index";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserAccount = ({userImage, userName, appTokenSet}) =>  {
    const [expanded, setExpanded] = useState(window.innerWidth >= 576);
    const [smallScreen, setSmallScreen] = useState(window.innerWidth < 576);
    useMemo(() =>{
        if (window.innerWidth < 576) {
            setSmallScreen(true)
            setExpanded(true)
        }
        else {
            setSmallScreen(false)
            setExpanded(false)
        }
    },[])
    const {t} = useTranslation();

    const handleLogout = () => {
        appTokenSet('');
    }

    const handlePhotoChange = () => {
        document.getElementById('photoInput').click();
    }

    const submitPhoto = (e) => {
        console.log(e.target.value);
    }

    return(
        <>
            {
                !smallScreen &&
                <UserButton style={!expanded ? {backgroundImage: `url(${userImage})`} : null} onClick={() => setExpanded(!expanded)}>
                    {expanded &&
                        <FontAwesomeIcon icon={faUser}/>
                    }
                </UserButton>
            }
            {
                expanded &&
                <ExpandedUserAccount smallScreen={!smallScreen}>
                    <UserPhoto userImage={userImage} onClick={handlePhotoChange}/>
                    <input type="file" id="photoInput" accept=".jpeg, .png" onChange={submitPhoto} style={{display: 'none'}}/>
                    <div>
                        <Alligner>
                            <UserSpan>{t('Logged as')}:</UserSpan>
                            <span> </span>
                            <UserName> {userName}</UserName>
                        </Alligner>
                        <Alligner>
                            <Link  to='/'>
                                <Button
                                    buttonType='submit'
                                    onClick={handleLogout}
                                >{t('Logout')}</Button>
                            </Link>
                        </Alligner>
                    </div>
                </ExpandedUserAccount>
            }
        </>
    );
};

const ConnectedUserAccount = connect(state => ({
        userImage: state.common.userImage,
        userName: state.common.userName,
    }),
    {
        appTokenSet,
    }
)(UserAccount);

export default ConnectedUserAccount;
