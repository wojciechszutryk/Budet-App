export const fetchBudgetFromAPI = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
};

export const fetchBudgetCategoriesFromAPI = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
};

export const addTransition = ({budgetId, data}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    });
};

export const addBudget = (data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    });
};

export const addBudgetCategory = (data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgetCategories`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    });
};


export const removeTransition = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    });
};