import React from 'react';
import {StyledChildrenCategory} from "../BudgetCategories/BudgetCategoriesStyles";

const ChildrenBudget = ({name, id, onClick}) => {

    return (
        <StyledChildrenCategory onClick={() => onClick(id)}>
            <span>{name}</span>
        </StyledChildrenCategory>
    );
};

export default ChildrenBudget;
