import React, {useMemo} from 'react';
import {ListItem} from "./components";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {setCurrency, setDate} from "utilities/functions";
import {connect} from "react-redux";
import {StyledOrderBar} from "./BudgetTransactionsStyles";
import {SortButton} from "components/Button/ButtonStyles";
import {useEffect} from "react";
import {useCallback} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSortAmountUp, faEllipsisV} from "@fortawesome/free-solid-svg-icons";

const SortTransactions = ({allTransactions, transactions, categories}) => {
    const {t} = useTranslation();

    const makeListFromTransaction = useCallback((transactions) => {
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
    },[t, categories]);

    const [inputText, setInputText] = useState('');
    const [order, setOrder] = useState('');
    const [listToRender, setListToRender] = useState(makeListFromTransaction(transactions));

    useEffect(()=>{
        setListToRender(makeListFromTransaction(transactions))
        setInputText('');
        document.querySelector('input').value = '';
    }, [makeListFromTransaction, transactions]);

    let searchTransaction = transactions.filter(transaction => transaction.description.toLowerCase().includes(inputText.toLowerCase()))

    const orderAndSearchTransaction = useMemo(() =>sortOrder => {
        switch (sortOrder){
            case 'date':
                const sortedByDateTransactions = searchTransaction.sort(function(a, b){
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;
                    return 0;
                });
                if (order === 'date_asc') {
                    setOrder('date_desc');
                    document.getElementById("date").style.transform = "scaleY(-1)";
                    return sortedByDateTransactions.reverse();
                }
                setOrder('date_asc');
                document.getElementById("date").style.transform = "scaleY(1)";
                return sortedByDateTransactions;

            case 'amount':
                const sortedByAmountTransactions = searchTransaction.sort(function(a, b){
                    if (a.amount > b.amount) return -1;
                    if (a.amount < b.amount) return 1;
                    return 0;
                });
                if (order === 'amount_asc') {
                    setOrder('amount_desc');
                    document.getElementById("amount").style.transform = "scaleY(-1)";
                    return sortedByAmountTransactions.reverse();
                }
                setOrder('amount_asc');
                document.getElementById("amount").style.transform = "scaleY(1)";
                return sortedByAmountTransactions;
            case 'category':
                const sortedByCategoryTransactions = searchTransaction.sort(function(a, b){
                    if (a.categoryId > b.categoryId) return -1;
                    if (a.categoryId < b.categoryId) return 1;
                    return 0;
                });
                if (order === 'category_desc') {
                    setOrder('category_asc');
                    document.getElementById("category").style.transform = "scaleY(-1)";
                    console.log('rotate')
                    return sortedByCategoryTransactions.reverse();
                }
                setOrder('category_desc');
                document.getElementById("category").style.transform = "scaleY(1)";
                return sortedByCategoryTransactions;
            case 'description':
                const sortedByDescriptionTransactions = searchTransaction.sort(function(a, b){
                    if (a.description > b.description) return 1;
                    if (a.description < b.description) return -1;
                    return 0;
                });
                if (order === 'description_desc') {
                    setOrder('description_asc');
                    document.getElementById("description").style.transform = "scaleY(1)";
                    return sortedByDescriptionTransactions.reverse();
                }
                setOrder('description_desc');
                document.getElementById("description").style.transform = "scaleY(-1)";
                return sortedByDescriptionTransactions;
            default:
                setOrder('');
                return searchTransaction;
        }
    }, [order, searchTransaction]);

    const handleOrderOnClick = useMemo(() =>orderToSet => {
        setListToRender(makeListFromTransaction(orderAndSearchTransaction(orderToSet)));
    }, [makeListFromTransaction, orderAndSearchTransaction]);

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
                <SortButton onClick={() => handleOrderOnClick('description')}>
                    {t('description')}
                    <span style={{display: 'inline-block'}} id='description'>{order.includes('description') ? <FontAwesomeIcon icon={faSortAmountUp} /> : <FontAwesomeIcon icon={faEllipsisV} />}</span>
                </SortButton>
                <SortButton onClick={() => handleOrderOnClick('amount')}>
                    {t('amount')}
                    <span style={{display: 'inline-block'}} id='amount'>{order.includes('amount') ? <FontAwesomeIcon icon={faSortAmountUp} /> : <FontAwesomeIcon icon={faEllipsisV} />}</span>
                </SortButton>
                <SortButton onClick={() => handleOrderOnClick('date')}>
                    {t('date')}
                    <span style={{display: 'inline-block'}} id='date'>{order.includes('date') ? <FontAwesomeIcon icon={faSortAmountUp} /> : <FontAwesomeIcon icon={faEllipsisV} />}</span>
                </SortButton>
                <SortButton onClick={() => handleOrderOnClick('category')}>
                    {t('category')}
                    <span style={{display: 'inline-block'}} id='category'>{order.includes('category') ? <FontAwesomeIcon icon={faSortAmountUp} /> : <FontAwesomeIcon icon={faEllipsisV} />}</span>
                </SortButton>
            </StyledOrderBar>
            {listToRender}
        </>
    );
};

const mapStateToProps = state => ({
    categories: state.common.categories,
});

export default connect(mapStateToProps)(SortTransactions);
