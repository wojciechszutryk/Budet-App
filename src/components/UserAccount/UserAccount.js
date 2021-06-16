import React from 'react';
import {connect} from "react-redux";
import {appTokenSet} from "../../data/actions/commonActions";
import {UserButton} from "../Button/ButtonStyles";

const UserAccount = ({userImage, userName, appTokenSet}) =>  {
    console.log(userImage)

    return(
        <UserButton userImage={userImage.replaceAll("\\","/")}>
        </UserButton>
    );
}

const ConnectedUserAccount = connect(state => ({
        userImage: state.common.userImage,
        userName: state.common.userName,
    }),
    {
        appTokenSet,
    }
)(UserAccount);

export default ConnectedUserAccount;
