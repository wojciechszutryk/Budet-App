import React, {useMemo} from 'react';
import {InlineButton, NormalButton, ButtonWrapper} from'./ButtonStyles'

const Button = ({buttonType, children, ...props}) => {

    const CustomButton = useMemo(() => {
        switch (buttonType){
            case 'inline':
                return InlineButton;
            default:
                return NormalButton;
        }
    },[buttonType]);

    return (
        useMemo(() => (<ButtonWrapper>
            <CustomButton {...props}>
                {children}
            </CustomButton>
        </ButtonWrapper>),[children, props])
    );
};

export default Button;
