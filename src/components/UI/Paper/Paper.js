import React from 'react';
import classes from './Paper.module.scss';
const Paper = ({children, style, className}) => {
    return (
        <div style={style} className={[classes.paper, className].join(' ')}>
            {children}
        </div>
    );
};

export default Paper;