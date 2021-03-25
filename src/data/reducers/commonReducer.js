import {
    LOADING_STATES,
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAILURE,
    ALL_BUDGETS_REQUEST,
    ALL_BUDGETS_SUCCESS,
    ALL_BUDGETS_FAILURE,
    BUDGET_REMOVE_REQUEST,
    BUDGET_REMOVE_SUCCESS,
    BUDGET_REMOVE_FAILURE,
    ALL_TRANSACTIONS_REQUEST,
    ALL_TRANSACTIONS_SUCCESS,
    ALL_TRANSACTIONS_FAILURE,
    ACTIVE_BUDGET_SET,
} from 'data/constants'

const startCommon = {
    loading: null,
    activeBudget: 1,
    categories: [],
    transactions: [],
    budgets: []
}

const common = (state= startCommon, action) => {
    const newLoading = {...state.loading};
    const newBudgets = {...state.budgets};
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

        case ALL_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case ALL_TRANSACTIONS_SUCCESS:
            delete newLoading.ALL_TRANSACTIONS_REQUEST;
            return{
                ...state,
                transactions: action.payload,
                loading: newLoading,
            }

        case ALL_TRANSACTIONS_FAILURE:
            delete newLoading.ALL_TRANSACTIONS_REQUEST;
            return{
                ...state,
                transactions: [],
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

        case BUDGET_REMOVE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_REMOVE_SUCCESS:
            const budgetIndex = newBudgets.find(transaction => transaction.id === action.payload.id);
            delete newLoading.BUDGET_REMOVE_REQUEST;
            newBudgets.splice(budgetIndex, 1);
            return {
                ...state,
                budgets: newBudgets,
                loading: newLoading,
            }

        case BUDGET_REMOVE_FAILURE:
            delete newLoading.BUDGET_REMOVE_REQUEST;
            return{
                ...state,
                budget: {},
                loading: newLoading,
            }

        case ACTIVE_BUDGET_SET:
            return {
                ...state,
                activeBudget: action.payload,
            }

        default:
            return state;
    }
}

export default common;
