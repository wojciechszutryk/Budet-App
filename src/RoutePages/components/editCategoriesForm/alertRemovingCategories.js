import React from 'react';
import {StyledParent} from "./editCategoriesFormStyles";
import {Button} from "components";
import {useTranslation} from "react-i18next";

const AlertRemovingCategories = ({removedChildren, deletingAlertResponse}) => {
    const {t} = useTranslation();
    const removedChildrenList = removedChildren.map(child => (
        <StyledParent key={child.name+Math.random()*100}>
            {child.name}
        </StyledParent>
    ))
    return (
        <div>
            <h5>{t('You willing to remove budgeted categories')}</h5>
            {removedChildrenList}
            <span>{t('That will cause removing all transactions with connected to these categories.')}</span>
            <br/>
            <span>{t('Do you want to continue?')}</span>
            <div>
                <Button
                    buttonType="reset"
                    type="button"
                    onClick={() => deletingAlertResponse(false)}
                >
                    {t('Cancel')}
                </Button>
                <Button
                    buttonType='submit'
                    type='submit'
                    onClick={() => deletingAlertResponse(true)}
                >
                    {t('Yes')}
                </Button>
            </div>
        </div>
    );
};

export default AlertRemovingCategories;
