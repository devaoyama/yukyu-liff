import React from "react";
import LiffInit from "../components/LiffInit";
import Auth from "../components/Auth";

const App = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            <LiffInit>
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            </LiffInit>
        </React.Fragment>
    )
}

export default App;
