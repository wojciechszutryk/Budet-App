import React from 'react';
import {StyledChildrenCategory} from './BudgetCategoriesStyles'

const ChildrenCategory = ({name}) => {
    return (
        <StyledChildrenCategory>
            {name}
        </StyledChildrenCategory>
    );
};

export default ChildrenCategory;
