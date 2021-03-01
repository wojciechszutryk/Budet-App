import React from 'react';
import {createPortal} from 'react-dom'
import {useHistory} from 'react-router-dom';
import {Wrapper, Content, CloseIcon} from './ModalStyles'

const Modal = ({children}) => {
    const history = useHistory();
    const handleClose = (event) => {
        event.stopPropagation();
        history.goBack();
    }
    return createPortal(
        <Wrapper onClick={handleClose}>
            <Content onClick={event => event.stopPropagation()}>
                <CloseIcon
                    onClick={handleClose}
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
