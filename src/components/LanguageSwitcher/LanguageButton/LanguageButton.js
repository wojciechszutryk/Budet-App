import React, {useMemo} from 'react';
import {ButtonWrapper, Button} from'./LanguageButtonStyles'

const LanguageButton = ({active, children, ...props}) => {
    return (
        useMemo(() => (<ButtonWrapper active={active}>
            <Button {...props}>
                {children}
            </Button>
        </ButtonWrapper>),[active, children, props])
    );
};

export default LanguageButton;
