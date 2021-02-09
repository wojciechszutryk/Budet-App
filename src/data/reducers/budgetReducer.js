import {LOADING_STATES, BUDGET_REQUEST, BUDGET_SUCCESS, BUDGET_FAILURE, BUDGET_CATEGORIES_FAILURE, BUDGET_CATEGORIES_SUCCESS, BUDGET_CATEGORIES_REQUEST} from 'data/constants'

const startBudget = {
    loading: {},
    budget: {},
    categories: [],
}

const budget = (state= startBudget, action) => {
    const newLoading = {...state.loading};
    switch (action.type) {
        case BUDGET_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_SUCCESS:
            delete newLoading.BUDGET_REQUEST;
            return{
                ...state,
                budget: action.payload,
                loading: newLoading,
            }

        case BUDGET_FAILURE:
            delete newLoading.BUDGET_REQUEST;
            return{
                ...state,
                budget: {},
                loading: newLoading,
            }

        case BUDGET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_CATEGORIES_SUCCESS:
            delete newLoading.BUDGET_CATEGORIES_REQUEST;
            return{
                ...state,
                categories: action.payload,
                loading: newLoading,
            }

        case BUDGET_CATEGORIES_FAILURE:
            delete newLoading.BUDGET_CATEGORIES_REQUEST;
            return{
                ...state,
                categories: [],
                loading: newLoading,
            }
        default:
            return state;
    }
}

export default budget;
