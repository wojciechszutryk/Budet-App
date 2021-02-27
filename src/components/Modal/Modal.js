import React from 'react';
import {createPortal} from 'react-dom'
import {useHistory} from 'react-router-dom';
import {Wrapper, Content, CloseIcon} from './ModalStyles'

const Modal = ({children}) => {
    const history = useHistory();
    console.log(history)
    return createPortal(
        <Wrapper>
            <Content>
                <CloseIcon
                    onClick={history.goBack}
                >
                    &times;
                </CloseIcon>
                {children}
            </Content>
        </Wrapper>,
        document.getElementById('modal')
    );
};

export default Modal;
