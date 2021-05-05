import './IssueLabel.scss';
import React from 'react';
import PropTypes from 'prop-types';

const IssueLabel = ({label}) => {
    const borderColor = `#${label.color}`;
    const backgroundColor = `#${label.color}26`;

    return <span className="issue-label" style={{borderColor, backgroundColor}}>{label.name}</span>;
};

IssueLabel.propTypes = {
    label: PropTypes.object.isRequired,
};

export default React.memo(IssueLabel);