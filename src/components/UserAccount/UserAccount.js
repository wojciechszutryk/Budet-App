import React, {useMemo, useState} from 'react';
import {connect} from "react-redux";
import {appTokenSet, loggedUserImageSet} from "../../data/actions/commonActions";
import {UserButton} from "../Button/ButtonStyles";
import {useTranslation} from "react-i18next";
import {Alligner, ExpandedUserAccount, UserName, UserPhoto, UserSpan} from "./UserAccountStyles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Button} from "../index";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useMutation} from "react-query";
import API from "../../data/fetch";

const UserAccount = ({userImage, userName, userId, appTokenSet, loggedUserImageSet}) =>  {
    const [expanded, setExpanded] = useState(window.innerWidth >= 576);
    const [smallScreen, setSmallScreen] = useState(window.innerWidth < 576);
    const changePhotoUserMutation = useMutation(API.common.userPhotoChange);
    const getPhotoUserMutation = useMutation(API.common.userPhotoGet);
    const deleteUserMutation = useMutation(API.common.userAccountDelete);
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

    const handleDeleteUser = async () => {
        await deleteUserMutation.mutateAsync({id: userId});
        appTokenSet('');
    }

    const submitPhoto = async (e) => {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        const res = await changePhotoUserMutation.mutateAsync({id: userId, data: formData});
        if (res.message === 'Photo updated'){
            const resGet = await getPhotoUserMutation.mutateAsync({id: userId});
            if(!resGet.message && !resGet.err) loggedUserImageSet(process.env.REACT_APP_API_URL + '/users/image/'+resGet);
        }
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
                        </Alligner>
                        <Alligner>
                            <UserName> {userName}</UserName>
                        </Alligner>
                        <Alligner>
                            <Link  to='/'>
                                <Button
                                    style={{display: 'inline-block', borderBottomLeftRadius: '10px', borderTopLeftRadius: '10px'}}
                                    buttonType='submit'
                                    onClick={handleLogout}
                                >{t('Logout')}</Button>
                                <Button
                                    style={{display: 'inline-block', height:"30px", borderBottomRightRadius: '10px', borderTopRightRadius: '10px'}}
                                    buttonType='delete'
                                    onClick={handleDeleteUser}
                                ><FontAwesomeIcon icon={faTrashAlt} /></Button>
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
        userId: state.common.userId,
    }),
    {
        appTokenSet,
        loggedUserImageSet,
    }
)(UserAccount);

export default ConnectedUserAccount;
