export const fetchBudgetFromAPI = async({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    return await response.json();
};

export const fetchBudgetCategoriesFromAPI = async({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
    return await response.json();
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

export const removeTransition = async(id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`,{
        method: 'DELETE',
    });
    return await response.json();
};