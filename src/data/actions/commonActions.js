import {
    ACTIVE_BUDGET_SET, THEME_TOGGLE, TOKEN_SET, USER_IMAGE_SET, USERID_SET, USERNAME_SET
} from 'data/constants';

export const appTokenSet = token => {
    return{
        type: TOKEN_SET,
        payload: token
    }
};

export const loggedUserNameSet = name => {
    return{
        type: USERNAME_SET,
        payload: name
    }
};

export const loggedUserIdSet = id => {
    return{
        type: USERID_SET,
        payload: id
    }
};

export const loggedUserImageSet = url => {
    return{
        type: USER_IMAGE_SET,
        payload: url
    }
};

export const activeBudgetSet = id => {
    return{
        type: ACTIVE_BUDGET_SET,
        payload: id
    }
};

export const themeToggle = () => {
    return{
        type: THEME_TOGGLE,
    }
};