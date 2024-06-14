import React from 'react';
import { ReactComponent as CBIcon } from '../../assets/CB.svg';
import { ReactComponent as PCIcon } from '../../assets/PC.svg';
import { ReactComponent as WCIcon } from '../../assets/WC.svg';

const LockImg = ({ lock }) => {
    const lockStyle = {
        marginLeft: '4px'
    };

    return (
        <span className='lock-img' style={lockStyle}>
            {lock === 'CB' && <CBIcon />}
            {lock === 'PC' && <PCIcon />}
            {lock === 'WC' && <WCIcon />}
        </span>
    );
}

export default LockImg;