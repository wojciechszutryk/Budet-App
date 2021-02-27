import React, {useMemo} from 'react';
import {InlineButton, NormalButton, TransactionButton} from'./ButtonStyles'

const Button = ({buttonType, children, ...props}) => {

    const CustomButton = useMemo(() => {
        switch (buttonType){
            case 'inline':
                return InlineButton;
            case 'normal':
                return NormalButton;
            case 'sort':
                return NormalButton;
            case 'transaction':
                return TransactionButton;
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
