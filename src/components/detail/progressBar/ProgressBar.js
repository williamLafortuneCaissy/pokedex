
import React from 'react';
import './_progressBar.scss';

const ProgressBar = ({progress, color}) => {

    return (
        <div className={`progressBar progressBar--${color}`} style={{ "--progress": `${progress}%` }}></div>
    );
}

export default ProgressBar;