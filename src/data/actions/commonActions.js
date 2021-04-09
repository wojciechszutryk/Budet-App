import {
    ACTIVE_BUDGET_SET, THEME_TOGGLE
} from 'data/constants';

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