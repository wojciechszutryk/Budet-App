import {LOADING_STATES, CATEGORIES_GET, CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE} from 'data/constants'

const startBudget = {
    loading: {},
    budget: {},
    categories: [],
}

const budget = (state= startBudget, action) => {
    const newLoading = {...state.loading};
    switch (action.type) {
        case CATEGORIES_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case CATEGORIES_SUCCESS:
            delete newLoading.CATEGORIES_REQUEST;
            return{
                ...state,
                categories: action.payload,
                loading: newLoading,
            }

        case CATEGORIES_FAILURE:
            delete newLoading.CATEGORIES_REQUEST;
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
