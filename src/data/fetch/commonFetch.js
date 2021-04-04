export const fetchAllCategoriesFromAPI = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);
    const data = await response.json();
    return data;
}

export const fetchAllTransactionsFromAPI = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`);
    const data = await response.json();
    return data;
}

export const fetchAllBudgetsFromAPI = async() => {
    const response = await  fetch(`${process.env.REACT_APP_API_URL}/budgets`);
    const data = await response.json();
    return data;
}

export const removeBudget = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}`,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    });
};