import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import {StyledList} from './BudgetTransactionsStyles'
import SortTransactions from "./SortTransactions";

const BudgetTransactions = ({transactions, categories, activeCategories, budgetCategories}) => {
    const filteredBySelectedCategory = useMemo(() => {
        const activeTransactions = [];
        if (activeCategories.length === 0) return transactions
        else if (activeCategories.includes('Other')) {
            const otherTransactions = transactions.filter(
                transaction => !budgetCategories.find(budgetCategory => budgetCategory.id === transaction.categoryId)
            );
            activeTransactions.push(...otherTransactions)
        }
        const categoriesTransactions = transactions.filter(
            transaction => {
                try {
                    const transactionParentCategory = categories.find(category => transaction.categoryId === category.id).parentCategory.name;
                    return activeCategories.includes(transactionParentCategory);
                } catch (err) {
                    return false
                }
            }
        );
        activeTransactions.push(...categoriesTransactions)
        return activeTransactions;
    },[activeCategories, budgetCategories, categories, transactions]);

    return (
        <StyledList>
            <SortTransactions allTransactions={transactions} transactions={filteredBySelectedCategory}/>
        </StyledList>
    );
};

const mapStateToProps = state => ({
    transactions: state.budget.budget.transactions,
    activeCategories: state.budget.activeCategories,
    budgetCategories: state.budget.categories,
    categories: state.common.categories
});

export default connect(mapStateToProps)(BudgetTransactions);
