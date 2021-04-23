export const fetchAllCategoriesFromAPI = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);
    return await response.json();
}

export const fetchParentCategoriesFromAPI = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/parentCategories`);
    return await response.json();
}

export const fetchChildrenCategoriesFromAPI = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
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

export const addParentCategory = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/parentCategories`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    })
    return await response.json()
};

export const removeParentCategory = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/parentCategories/${id}`,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    });
};

export const addCategory = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json'}
    })
    return await response.json()
};

export const removeCategory = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    });
};