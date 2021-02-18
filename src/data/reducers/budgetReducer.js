import {
    LOADING_STATES,
    BUDGET_REQUEST,
    BUDGET_SUCCESS,
    BUDGET_FAILURE,
    BUDGET_CATEGORIES_FAILURE,
    BUDGET_CATEGORIES_SUCCESS,
    BUDGET_CATEGORIES_REQUEST,
    BUDGET_ACTIVE_CATEGORIES_ADD,
    BUDGET_ACTIVE_CATEGORIES_REMOVE
} from 'data/constants'

const startBudget = {
    loading: null,
    budget: {},
    categories: [],
    activeCategories: [],
}

const budget = (state= startBudget, action) => {
    const newLoading = {...state.loading};
    const newActiveCategories = [...state.activeCategories];
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

        case BUDGET_ACTIVE_CATEGORIES_ADD:
            if (newActiveCategories.includes(action.payload)) return {...state}
            return{
                ...state,
                activeCategories: [
                    ...state.activeCategories,
                    action.payload
                ]
            }

        case BUDGET_ACTIVE_CATEGORIES_REMOVE:
            const index = newActiveCategories.indexOf(action.payload);
            newActiveCategories.splice(index, 1);
            return{
                ...state,
                activeCategories: newActiveCategories
            }

        default:
            return state;
    }
}

export default budget;
