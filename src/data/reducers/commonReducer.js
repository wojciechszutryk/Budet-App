import {LOADING_STATES, CATEGORIES_GET, CATEGORIES_GET_REQUEST, CATEGORIES_GET_SUCCESS, CATEGORIES_GET_FAILURE} from 'data/constants'

const startBudget = {
    loading: {},
    budget: {},
    categories: [],
}

const budget = (state= startBudget, action) => {
    const newLoading = {...state.loading};
    switch (action.type) {
        case CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case CATEGORIES_GET_SUCCESS:
            delete newLoading.CATEGORIES_GET_REQUEST;
            return{
                ...state,
                categories: action.payload,
                loading: newLoading,
            }

        case CATEGORIES_GET_FAILURE:
            delete newLoading.CATEGORIES_GET_REQUEST;
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
