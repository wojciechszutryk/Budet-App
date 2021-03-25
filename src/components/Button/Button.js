import React, {useMemo} from 'react';
import {
    AddBudgetButton,
    DeleteButton,
    InlineButton,
    NormalButton,
    ResetButton, SetDarkButton, SetLightButton,
    SubmitButton,
    TransactionButton
} from './ButtonStyles'

const Button = ({buttonType, children, ...props}) => {

    const CustomButton = useMemo(() => {
        switch (buttonType){
            case 'inline':
                return InlineButton;
            case 'normal':
                return NormalButton;
            case 'transaction':
                return TransactionButton;
            case 'submit':
                return SubmitButton;
            case 'reset':
                return ResetButton;
            case 'delete':
                return DeleteButton;
            case 'addBudget':
                return AddBudgetButton;
            case 'setDark':
                return SetDarkButton;
            case 'setLight':
                return SetLightButton;
            default:
                return InlineButton;
        }
    },[buttonType]);

    return (
        <CustomButton {...props}>
            {children}
        </CustomButton>
    );
};

export default Button;
