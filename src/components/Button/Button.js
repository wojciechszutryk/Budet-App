import React from 'react';
import {InlineButton, NormalButton, ButtonWrapper} from'./ButtonStyles'

const Button = ({type, children}) => {
    const CustomButton = (() => {
        switch (type){
            case 'inline':
                return InlineButton
            default:
                return NormalButton
        }
    })();

    return (
        <ButtonWrapper>
            <CustomButton>
                {children}
            </CustomButton>
        </ButtonWrapper>
    );
};

export default Button;
