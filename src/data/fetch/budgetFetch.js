export const fetchBudgetFromAPI = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
}

export const fetchBudgetCategoriesFromAPI = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
}