import React from "react";
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as SaveIcon } from '../../assets/save.svg';
import { ReactComponent as CancelIcon } from '../../assets/cancel.svg';
import { ReactComponent as ViewIcon } from '../../assets/view.svg';

function ButtonImg({ type }) {
    switch (type) {
        case 'edit':
            return <EditIcon />;
        case 'save':
            return <SaveIcon />;
        case 'cancel':
            return <CancelIcon />;
        case 'view':
            return <ViewIcon />;
        default:
            return null;
    }
}

export default ButtonImg;