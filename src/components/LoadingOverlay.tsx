import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

type TProps = {
    status: boolean
}

const LoadingOverlay: React.FC<TProps> = ({ status }) => {
    return (
        <Backdrop open={status} onClick={() => {}}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingOverlay;
