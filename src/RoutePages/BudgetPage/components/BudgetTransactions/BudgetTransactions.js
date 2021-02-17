import React from 'react';
import {connect} from 'react-redux';
import {StyledList} from './BudgetTransactionsStyles'
import {useTranslation} from "react-i18next";
import SortTransactions from "./SortTransactions";

const BudgetTransactions = ({transactions, categories, activeCategories}) => {
    const {t} = useTranslation();
    const filteredBySelectedCategory = (() => {
        if (activeCategories.length === 0) return transactions
        return transactions.filter(
            transaction => {
                try {
                    const transactionParentCategory = categories.find(category => transaction.categoryId === category.id).parentCategory.name;
                    return activeCategories.includes(transactionParentCategory);
                } catch (err) {
                    return false
                }
            }
        );
    })();

    return (
        <StyledList>
            <SortTransactions allTransactions={transactions} transactions={filteredBySelectedCategory}/>
        </StyledList>
    );
};

const mapStateToProps = state => ({
    transactions: state.budget.budget.transactions,
    activeCategories: state.budget.activeCategories,
    categories: state.common.categories
});

export default connect(mapStateToProps)(BudgetTransactions);
