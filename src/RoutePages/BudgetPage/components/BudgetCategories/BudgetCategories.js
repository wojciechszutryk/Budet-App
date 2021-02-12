import React from 'react';
import {connect} from 'react-redux'
import {groupBy} from 'lodash';
import {SwitchList} from 'components';
import ParentCategory from "./ParentCategory";
import ChildrenCategory from "./ChildrenCategory";

const BudgetCategories = ({budgetCategories,allCategories, budget}) => {
    const groupedCategories = groupBy(
        budgetCategories,
            budgetCategory => allCategories.find(
                category => budgetCategory.categoryId === category.id).parentCategory.name
    );

    console.log(groupedCategories)

    const categoriesList = Object.entries(groupedCategories).map(category => ({
        id: category[0],
        Trigger: ({onClick}) => (
            <ParentCategory
                name={category[0]}
                onClick={() => onClick(category[0])}
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
            />
        )}),
    }));

    return (
        <div>
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

export default connect(mapStateToProps)(BudgetCategories);
