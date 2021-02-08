import {LOADING_STATES, BUDGET_GET, BUDGET_GET_REQUEST, BUDGET_GET_SUCCESS ,BUDGET_GET_FAILURE} from 'data/constants'

const startBudget = {
    loading: {},
    budget: {},
    categories: [],
}

const budget = (state= startBudget, action) => {
    const newLoading = {...state.loading};
    switch (action.type) {
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_GET_SUCCESS:
            delete newLoading.BUDGET_GET_REQUEST;
            return{
                ...state,
                budget: action.payload,
                loading: newLoading,
            }

        case BUDGET_GET_FAILURE:
            delete newLoading.BUDGET_GET_REQUEST;
            return{
                ...state,
                budget: {},
                loading: newLoading,
            }

        default:
            return state;
    }
}

export default budget;
