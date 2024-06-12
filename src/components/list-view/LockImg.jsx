import React from 'react';
import { ReactComponent as CBIcon } from '../../assets/CB.svg';
import { ReactComponent as PCIcon } from '../../assets/PC.svg';
import { ReactComponent as WCIcon } from '../../assets/WC.svg';

const LockImg = ({ lock }) => {
    return (
        <span className='lock-img' style={{ marginLeft: '4px'}}>
            {lock === 'CB' && <CBIcon />}
            {lock === 'PC' && <PCIcon />}
            {lock === 'WC' && <WCIcon />}
        </span>
    );
}

export default LockImg;