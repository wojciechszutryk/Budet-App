import React, {useMemo} from 'react';
import {connect} from 'react-redux'
import {groupBy} from 'lodash';
import {SwitchList} from 'components';
import ParentCategory from "./ParentCategory";
import ChildrenCategory from "./ChildrenCategory";
import {StyledBudgetMoney} from "./BudgetCategoriesStyles";
import 'styled-components/macro'
import MoneyStatistics from "./MoneyStatistics";
import {setCurrency} from "utilities/functions";
import {addActiveCategory, removeActiveCategory} from 'data/actions/budgetActions'
import {useTranslation} from "react-i18next";

const BudgetCategories = ({budgetCategories, allCategories, budget, activeCategories, addActiveCategory, removeActiveCategory}) => {

    const {t} = useTranslation();

    const groupedCategories = useMemo(() => groupBy(budgetCategories,
            budgetCategory => allCategories.find(
                category => budgetCategory.categoryId === category.id).parentCategory.name
    ), [allCategories,budgetCategories]);

    let budgetMoneySpent = 0;
    budget.transactions.forEach(transaction => budgetMoneySpent+=transaction.amount);
    const availableBudgetMoney = budget.totalAmount;
    const moneyLeft = availableBudgetMoney-budgetMoneySpent;
    const isMoneyLeft = moneyLeft>0;

    const amountToSpendOnCategories = budgetCategories.reduce((acc, budgetCategory) => (acc + budgetCategory.budget), 0);
    const otherTransactions = useMemo(() => budget.transactions.filter(
        transaction => !budgetCategories.find(budgetCategory => budgetCategory.id === transaction.categoryId)
    ), [budget.transactions, budgetCategories]);
    const otherExpenses = useMemo(() => 
        otherTransactions.reduce((acc,transaction) => acc + transaction.amount, 0),
    [otherTransactions]);
    const leftToSpendOnOther = budget.totalAmount - amountToSpendOnCategories;

    const categoriesList = Object.entries(groupedCategories).map(category => ({
        id: category[0],
        Trigger: ({onClick}) => (
            <ParentCategory
                name={category[0]}
                onClick={() => {
                    onClick(category[0]);
                    activeCategories.includes(category[0]) ? removeActiveCategory(category[0]) : addActiveCategory(category[0]);
                }}
                categoriesInside={category[1]}
                transactions={budget.transactions.filter(transaction => category[1].find(
                    cat => transaction.categoryId === cat.categoryId
                ))}
            />
        ),
        children: category[1].map(budgetCategory => {
            const name = allCategories.find(cat => budgetCategory.id === cat.id).name;
            return (<ChildrenCategory
                key={name}
                name={name}
                budget={budgetCategory.budget}
                transactions={budget.transactions.filter(transaction => transaction.categoryId === budgetCategory.id)}
            />
        )}),
    }));

    useMemo(() =>categoriesList.push({
        id: 'Other',
        Trigger: ({onClick}) => (
            <ParentCategory
                name={t('Other')}
                onClick={() => {
                    onClick('Other');
                    activeCategories.includes('Other') ? removeActiveCategory('Other') : addActiveCategory('Other');
                }}
                categoriesInside={{}}
                transactions={otherTransactions}
                other={[(leftToSpendOnOther-otherExpenses).toFixed(2), setCurrency(leftToSpendOnOther.toFixed(2)), leftToSpendOnOther>0]}
            />
        ),
        children: (<ChildrenCategory
            key={'Other'}
            name={t('Money spent on other or non-budgeted categories')}
            other={true}
        />)
    }), [activeCategories, addActiveCategory, categoriesList, leftToSpendOnOther, otherExpenses, otherTransactions, removeActiveCategory, t]);

    return (
        <div>
            <div
                css={`
                  margin-bottom: 3px;
                `}
            >
                <StyledBudgetMoney>
                    <span>{budget.name}</span>
                    <MoneyStatistics
                        moneyLeft={moneyLeft}
                        allMoney={setCurrency(availableBudgetMoney)}
                        isMoneyLeft={isMoneyLeft}
                    />
                </StyledBudgetMoney>
            </div>

            <SwitchList
                categories={categoriesList}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    budget: state.budget.budget,
    activeCategories: state.budget.activeCategories,
    budgetCategories: state.budget.categories,
    allCategories: state.common.categories,
});

const mapDispatchToProps = {
    addActiveCategory,
    removeActiveCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCategories);
