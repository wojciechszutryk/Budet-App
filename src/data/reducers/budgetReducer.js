import {
    LOADING_STATES,
    BUDGET_REQUEST,
    BUDGET_SUCCESS,
    BUDGET_FAILURE,
    BUDGET_CATEGORIES_FAILURE,
    BUDGET_CATEGORIES_SUCCESS,
    BUDGET_CATEGORIES_REQUEST,
    BUDGET_ACTIVE_CATEGORIES_ADD,
    BUDGET_ACTIVE_CATEGORIES_REMOVE,
    BUDGET_ACTIVE_CATEGORIES_CLEAN,
    BUDGET_TRANSACTION_ADD_REQUEST,
    BUDGET_TRANSACTION_ADD_SUCCESS,
    BUDGET_TRANSACTION_REMOVE_REQUEST,
    BUDGET_TRANSACTION_REMOVE_SUCCESS
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
    const newTransactions = state.budget.transactions;
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

        case BUDGET_ACTIVE_CATEGORIES_CLEAN:
            return{
                ...state,
                activeCategories: []
            }

        case BUDGET_TRANSACTION_ADD_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_TRANSACTION_ADD_SUCCESS:
            delete newLoading.BUDGET_TRANSACTION_ADD_REQUEST;
            return{
                ...state,
                budget: {
                    ...state.budget,
                    transactions: [
                        action.payload,
                        ...state.budget.transactions,
                    ]
                },
                loading: newLoading,
            }

        case BUDGET_TRANSACTION_REMOVE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_TRANSACTION_REMOVE_SUCCESS:
            const transactionIndex = newTransactions.find(transaction => transaction.id === action.payload);
            newTransactions.splice(transactionIndex, 1);
            delete newLoading.BUDGET_TRANSACTION_REMOVE_REQUEST;
            return{
                ...state,
                budget: {
                    ...state.budget,
                    transactions: newTransactions
                },
                loading: newLoading,
            }

        default:
            return state;
    }
}

export default budget;
