import {
    ACTIVE_BUDGET_SET,
    ALL_BUDGETS,
    ALL_CATEGORIES,
    ALL_TRANSACTIONS,
    BUDGET_REMOVE
} from 'data/constants';
import API from 'data/fetch';

export const fetchAllCategories = () => {
    const promise = API.common.fetchAllCategoriesFromAPI();
    return {
        type: ALL_CATEGORIES,
        promise
    };
};

export const fetchAllTransactions = () => {
    const promise = API.common.fetchAllTransactionsFromAPI();
    return {
        type: ALL_TRANSACTIONS,
        promise
    };
};

export const fetchAllBudgets = () => {
    const promise = API.common.fetchAllBudgetsFromAPI();
    return {
        type: ALL_BUDGETS,
        promise
    };
};

export const removeBudget = (id) => {
    const promise = API.common.removeBudget(id);
    return{
        type: BUDGET_REMOVE,
        promise,
        message: "Succeeded in removing Budget"
    }
};

export const activeBudgetSet = id => {
    return{
        type: ACTIVE_BUDGET_SET,
        payload: id
    }
};