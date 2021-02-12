import React from 'react';
import {connect} from 'react-redux'
import {groupBy} from 'lodash';
import {SwitchList} from 'components';
import ParentCategory from "./ParentCategory";
import ChildrenCategory from "./ChildrenCategory";

const BudgetCategories = ({budgetCategories,allCategories}) => {
    const groupedCategories = groupBy(
        budgetCategories,
            budgetCategory => allCategories.find(
                category => budgetCategory.categoryId === category.id).parentCategory.name
    );

    const categoriesList = Object.entries(groupedCategories).map(category =>
    // {
    //     console.log(category[0]);
    //     return ;
    // });


        ({
        id: category[0],
        Trigger: ({onClick}) => (
            <ParentCategory
                name={category[0]}
                onClick={() => onClick(category[0])}
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
    budgetCategories: state.budget.categories,
    allCategories: state.common.categories,
});

export default connect(mapStateToProps)(BudgetCategories);
