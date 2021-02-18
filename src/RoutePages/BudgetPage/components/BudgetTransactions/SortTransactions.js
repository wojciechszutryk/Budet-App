import React from 'react';
import {ListItem} from "./components";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {setCurrency, setDate} from "utilities/functions";
import {connect} from "react-redux";
import {StyledOrderBar} from "./BudgetTransactionsStyles";
import {NormalButton} from "components/Button/ButtonStyles";
import {useEffect} from "react";

const SortTransactions = ({allTransactions, transactions, categories}) => {
    const {t} = useTranslation();

    const makeListFromTransaction = (transactions) => {
        return transactions.map(transaction => {
            const category = (categories.find(category => category.id === transaction.categoryId) || {}).name || t('Other');
            return (
                <ListItem
                    key={transaction.date + transaction.description}
                    date={setDate(transaction.date)}
                    amount={setCurrency(transaction.amount)}
                    category={category}
                    description={transaction.description}
                />
            );
        })
    };

    const [inputText, setInputText] = useState('');
    const [order, setOrder] = useState('');
    const [listToRender, setListToRender] = useState(makeListFromTransaction(transactions));

    useEffect(()=>{
        setListToRender(makeListFromTransaction(transactions))
        setInputText('');
        document.querySelector('input').value = '';
    }, [transactions])

    let searchTransaction = transactions.filter(transaction => transaction.description.toLowerCase().includes(inputText.toLowerCase()))

    const orderAndSearchTransaction = sortOrder => {
        switch (sortOrder){
            case 'date':
                const sortedByDateTransactions = searchTransaction.sort(function(a, b){
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;
                    return 0;
                });
                if (order === 'date_asc') {
                    setOrder('date_desc');
                    return sortedByDateTransactions.reverse();
                }
                setOrder('date_asc');
                return sortedByDateTransactions;

            case 'amount':
                const sortedByAmountTransactions = searchTransaction.sort(function(a, b){
                    if (a.amount > b.amount) return -1;
                    if (a.amount < b.amount) return 1;
                    return 0;
                });
                if (order === 'amount_asc') {
                    setOrder('amount_desc');
                    return sortedByAmountTransactions.reverse();
                }
                setOrder('amount_asc');
                return sortedByAmountTransactions;
            case 'category':
                const sortedByCategoryTransactions = searchTransaction.sort(function(a, b){
                    if (a.categoryId > b.categoryId) return -1;
                    if (a.categoryId < b.categoryId) return 1;
                    return 0;
                });
                if (order === 'category_desc') {
                    setOrder('category_asc');
                    return sortedByCategoryTransactions.reverse();
                }
                setOrder('category_desc');
                return sortedByCategoryTransactions;
            case 'description':
                const sortedByDescriptionTransactions = searchTransaction.sort(function(a, b){
                    if (a.description > b.description) return -1;
                    if (a.description < b.description) return 1;
                    return 0;
                });
                if (order === 'description_desc') {
                    setOrder('description_asc');
                    return sortedByDescriptionTransactions.reverse();
                }
                setOrder('description_desc');
                return sortedByDescriptionTransactions;
            default:
                setOrder('');
                return searchTransaction;
        }
    }

    const handleOrderOnClick = orderToSet => {
        setListToRender(makeListFromTransaction(orderAndSearchTransaction(orderToSet)));
    }

    const handleSearchOnChange = e => {
        setOrder('');
        setInputText(e.target.value)
        searchTransaction = transactions.filter(transaction => transaction.description.toLowerCase().includes(e.target.value.toLowerCase()))
        setListToRender(makeListFromTransaction(searchTransaction));
    }

    const handleShowAllTransactions = () => {
        setOrder('');
        setInputText('');
        document.querySelector('input').value = '';
        setListToRender(makeListFromTransaction(allTransactions));
    }

    return (
        <>
            <div>
                <input type="text" onChange={handleSearchOnChange} placeholder={t('Search transaction')}/>
                <button onClick={handleShowAllTransactions}>{t('Show All Transactions')}</button>
            </div>
            <StyledOrderBar>
                <NormalButton onClick={() => handleOrderOnClick('description')}>{t('description')}</NormalButton>
                <NormalButton onClick={() => handleOrderOnClick('amount')}>{t('amount')}</NormalButton>
                <NormalButton onClick={() => handleOrderOnClick('date')}>{t('date')}</NormalButton>
                <NormalButton onClick={() => handleOrderOnClick('category')}>{t('category')}</NormalButton>
            </StyledOrderBar>
            {listToRender}
        </>
    );
};

const mapStateToProps = state => ({
    categories: state.common.categories,
});

export default connect(mapStateToProps)(SortTransactions);
