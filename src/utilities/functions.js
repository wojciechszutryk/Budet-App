export const setCurrency = (money) => {
    return new Intl.NumberFormat('pl',{style: 'currency', currency: 'PLN'}).format(Number(money))
}

export const setDate = (date) => {
    return new Intl.DateTimeFormat('pl').format(new Date(date))
}