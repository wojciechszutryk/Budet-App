import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import SortTransactions from "./SortTransactions";

const BudgetTransactions = ({activeCategories, budget, allCategories}) => {
    const filteredBySelectedCategory = useMemo(() => {
        const activeTransactions = [];
        if (activeCategories.length === 0) return budget.transactions
        else if (activeCategories.includes('Other')) {
            const otherTransactions = budget.transactions.filter(
                // transaction => !budgetCategories.find(budgetCategory => budgetCategory.id === transaction.categoryId)
                transaction => transaction.categoryId === "0"
            );
            activeTransactions.push(...otherTransactions)
        }
        const categoriesTransactions = budget.transactions.filter(
            transaction => {
                try {
                    const transactionParentCategory = allCategories.find(category => transaction.categoryId === category.id).parentCategory.name;
                    return activeCategories.includes(transactionParentCategory);
                } catch (err) {
                    return false
                }
            }
        );
        activeTransactions.push(...categoriesTransactions);
        const seen = new Set();
        return activeTransactions.filter(el => {
            const duplicate = seen.has(el.id);
            seen.add(el.id);
            return !duplicate;
        });
    },[activeCategories, allCategories, budget.transactions]);

    return (
        <SortTransactions allTransactions={budget.transactions} categories={allCategories} transactions={filteredBySelectedCategory}/>
    );
};

const mapStateToProps = state => ({
    activeCategories: state.budget.activeCategories,
    activeBudget: state.common.activeBudget
});


export default connect(mapStateToProps)(BudgetTransactions);
