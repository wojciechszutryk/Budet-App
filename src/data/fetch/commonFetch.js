export const fetchAllCategoriesFromAPI = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);
    return await response.json();
}

export const fetchAllTransactionsFromAPI = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`);
    return await response.json();
}

export const fetchAllBudgetsFromAPI = async() => {
    const response = await  fetch(`${process.env.REACT_APP_API_URL}/budgets`);
    return await response.json();
}

export const removeBudget = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}`,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    });
};