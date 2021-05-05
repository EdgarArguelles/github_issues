import './ResultItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {useFocusRef} from 'app/hooks/Common';

const ResultItem = ({data, focus, onSelect}) => {
    const ref = useFocusRef(focus);
    const handleSelect = () => onSelect(data.value);
    const handleKeyDown = event => {
        if (event.keyCode === 27) {
            event.preventDefault();
            onSelect(null);
        } else if (event.keyCode === 13) {
            event.preventDefault();
            handleSelect();
        }
    };

    return (
        <div className="result-item" ref={ref} tabIndex={0} onClick={handleSelect} onKeyDown={handleKeyDown}>
            <div className="content">{data.display}</div>
        </div>
    );
};

ResultItem.propTypes = {
    data: PropTypes.object.isRequired,
    focus: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default React.memo(ResultItem);