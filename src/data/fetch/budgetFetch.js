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