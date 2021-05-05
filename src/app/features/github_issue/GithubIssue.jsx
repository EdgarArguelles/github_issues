import './GithubIssue.scss';
import React from 'react';
import PropTypes from 'prop-types';
import IssueLabel from './issue_label/IssueLabel';

const GithubIssue = ({issue}) => {
    return (
        <div className="github-issue">
            <div>
                <b>❗{issue.title}</b>
                {issue.labels.map(label => <IssueLabel key={`label-${label.id}`} label={label}/>)}
            </div>
            <div className="subtitle">
                #{issue.number} opened by {issue.user.login}
                <img src={issue.user.avatar_url} alt={issue.user.login} className="user-avatar"/>
            </div>
        </div>
    );
};

GithubIssue.propTypes = {
    issue: PropTypes.object.isRequired,
};

export default React.memo(GithubIssue);