import {
    ACTIVE_BUDGET_SET,
    BUDGET,
    BUDGET_ACTIVE_CATEGORIES_ADD,
    BUDGET_ACTIVE_CATEGORIES_CLEAN,
    BUDGET_ACTIVE_CATEGORIES_REMOVE, BUDGET_ADD,
    BUDGET_CATEGORIES, BUDGET_CATEGORIES_ADD, BUDGET_REMOVE,
    BUDGET_TRANSACTION_ADD,
    BUDGET_TRANSACTION_REMOVE
} from 'data/constants';
import API from 'data/fetch';

export const fetchBudget = id => {
    const promise = API.budget.fetchBudgetFromAPI(id);
   return {
        type: BUDGET,
        promise
    };
};

export const fetchBudgetCategories = id => {
    const promise = API.budget.fetchBudgetCategoriesFromAPI(id);
    return {
        type: BUDGET_CATEGORIES,
        promise
    };
};

export const addBudget = (data) => {
    const promise = API.budget.addBudget(data);
    return {
        type: BUDGET_ADD,
        promise,
        message: "Succeeded in adding Budget"
    };
};

export const addBudgetCategory = (data) => {
    const promise = API.budget.addBudgetCategory(data);
    return {
        type: BUDGET_CATEGORIES_ADD,
        promise,
        message: "Succeeded in adding BudgetCategory"
    };
};

export const addTransition = ({budgetId, data}) => {
    const promise = API.budget.addTransition({budgetId, data});
    return {
        type: BUDGET_TRANSACTION_ADD,
        promise,
        message: "Succeeded in adding Transaction"
    };
};

export const removeTransaction = (id) => {
    const promise = API.budget.removeTransition(id);
    return{
        type: BUDGET_TRANSACTION_REMOVE,
        promise,
        message: "Succeeded in removing Transaction"
    }
};

export const addActiveCategory = id => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_ADD,
        payload: id
    }
};

export const removeActiveCategory = id => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_REMOVE,
        payload: id
    }
};

export const cleanActiveCategories = () => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_CLEAN,
    }
};