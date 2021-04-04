import React from 'react';
import Loading from "../Loading";
import ErrorPage from "./ErrorPage";
import {refetchAllQueries} from "react-query"

class SuspenseErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    tryAgain = async() => {
        await refetchAllQueries({includeInactive: true});
        this.setState({hasError: false});
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        return (
            <React.Suspense fallback={<Loading/>}>
                {this.state.hasError ? (
                        <ErrorPage onClick={this.tryAgain}/>
                    )
                    :
                    (
                        <>
                            {this.props.children}
                        </>
                    )
                }
            </React.Suspense>
        )
    }
}

export default SuspenseErrorBoundary;
