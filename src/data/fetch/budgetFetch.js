export const fetchBudgetFromAPI = async({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    return await response.json()
};

export const fetchBudgetCategoriesFromAPI = async({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
    return await response.json()
};

export const addTransition = async({budgetId, data}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    });
    return await response.json();
};

export const addBudget = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    });
    return await response.json();
};

export const addBudgetCategory = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgetCategories`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    })
    return await response.json()
};

export const removeTransition = async(id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`,{
        method: 'DELETE',
    })
    return await response.json()
};