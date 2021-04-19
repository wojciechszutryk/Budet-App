import React from 'react';
import {StyledErrorPage} from "./StyledErrorPage";
import {ResetButton} from "../Button/ButtonStyles";
import SadMac from "../SadMac/SadMac";

const ErrorPage = ({onClick}) => {
    return (
        <StyledErrorPage>
            <figure>
                <SadMac/>
                <figcaption>
                    <span className="errorMessage">{'error occurred'}</span>
                </figcaption>
            </figure>
            <ResetButton onClick={onClick}>Reload Page</ResetButton>
        </StyledErrorPage>
    );
};

export default ErrorPage;
