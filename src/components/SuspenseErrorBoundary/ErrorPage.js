import React from 'react';
import {StyledErrorPage} from "./StyledErrorPage";
import {ResetButton} from "../Button/ButtonStyles";

const ErrorPage = ({onClick}) => {
    const balls = document.getElementsByClassName("ball");
    document.onmousemove = function(event){
        const x = event.clientX * 100 / window.innerWidth + "%";
        const y = event.clientY * 100 / window.innerHeight + "%";

        for (let i = 0; i < 2; i++) {
            balls[i].style.left = x;
            balls[i].style.top = y;
            balls[i].style.transform = "translate(-" + x + ",-" + y + ")";
        }
    }
    return (
        <StyledErrorPage>
            <figure>
                <div className="sad-mac">
                    <div className="eyes">
                        <div className="eye">
                            <div className="ball"/>
                        </div>
                        <div className="eye">
                            <div className="ball"/>
                        </div>
                    </div>
                </div>
                <figcaption>
                    <span className="errorMessage">{'error occurred'}</span>
                </figcaption>
            </figure>
            <ResetButton onClick={onClick}>Reload Page</ResetButton>
        </StyledErrorPage>
    );
};

export default ErrorPage;
