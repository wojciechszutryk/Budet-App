import {
    LOADING_STATES,
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAILURE,
    ALL_BUDGETS_REQUEST, ALL_BUDGETS_SUCCESS, ALL_BUDGETS_FAILURE
} from 'data/constants'

const startCommon = {
    loading: null,
    categories: [],
    budgets: []
}

const common = (state= startCommon, action) => {
    const newLoading = {...state.loading};
    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case ALL_CATEGORIES_SUCCESS:
            delete newLoading.ALL_CATEGORIES_REQUEST;
            return{
                ...state,
                categories: action.payload,
                loading: newLoading,
            }

        case ALL_CATEGORIES_FAILURE:
            delete newLoading.ALL_CATEGORIES_REQUEST;
            return{
                ...state,
                categories: [],
                loading: newLoading,
            }

        case ALL_BUDGETS_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case ALL_BUDGETS_SUCCESS:
            delete newLoading.ALL_BUDGETS_REQUEST;
            return{
                ...state,
                budgets: action.payload,
                loading: newLoading,
            }

        case ALL_BUDGETS_FAILURE:
            delete newLoading.ALL_BUDGETS_REQUEST;
            return{
                ...state,
                budgets: [],
                loading: newLoading,
            }

        default:
            return state;
    }
}

export default common;
