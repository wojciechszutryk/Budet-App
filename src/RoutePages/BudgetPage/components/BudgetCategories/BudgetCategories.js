import React from 'react';
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

const BudgetCategories = ({budgetCategories, allCategories, budget, activeCategories, addActiveCategory, removeActiveCategory}) => {
    const groupedCategories = groupBy(
        budgetCategories,
            budgetCategory => allCategories.find(
                category => budgetCategory.categoryId === category.id).parentCategory.name
    );

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

    let budgetMoneySpent = 0;
    budget.transactions.forEach(transaction => budgetMoneySpent+=transaction.amount);
    const availableBudgetMoney = budget.totalAmount;
    const moneyLeft = availableBudgetMoney-budgetMoneySpent;
    const isMoneyLeft = moneyLeft>0;

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
    budgetCategories: state.budget.categories,
    allCategories: state.common.categories,
});

const mapDispatchToProps = {
    addActiveCategory,
    removeActiveCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCategories);
