import React from 'react';
import {StyledParentCategory} from './BudgetCategoriesStyles'

const ParentCategory = ({name, onClick}) => {
    return (
        <StyledParentCategory onClick={onClick}>
            {name}
        </StyledParentCategory>
    );
};

export default ParentCategory;
