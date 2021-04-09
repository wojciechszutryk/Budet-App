import {
    ACTIVE_BUDGET_SET, THEME_TOGGLE,
} from 'data/constants'

const startCommon = {
    loading: null,
    activeBudget: 1,
    categories: [],
    transactions: [],
    budgets: [],
    lightTheme: false,
}

const common = (state= startCommon, action) => {
    switch (action.type) {
        case ACTIVE_BUDGET_SET:
            return {
                ...state,
                activeBudget: action.payload,
            }

        case THEME_TOGGLE:
            return {
                ...state,
                lightTheme: !state.lightTheme,
            }

        default:
            return state;
    }
}

export default common;
