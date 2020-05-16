import React from 'react';

import './Backdrop.css';

const backdrop = props => (
    <div className="backdrop">
        {props.children}
    </div>
);

export default backdrop;