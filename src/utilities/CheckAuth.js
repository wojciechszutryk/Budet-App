import React from "react";
import { connect } from "react-redux";
import { Route} from "react-router";
import HomePage from "../RoutePages/HomePage";

const CheckAuth = ({path, token, userName, userId, children}) => {
    if (token && userName && userId) return <Route path={path}>{children}</Route>;
    else return <Route><HomePage message={"You must be logged in to access this page."}/></Route>;
};

const ConnectedCheckAuth = connect(state => ({
        token: state.common.token,
        userId: state.common.userId,
        userName: state.common.userName,
    })
)(CheckAuth);

export default ConnectedCheckAuth;