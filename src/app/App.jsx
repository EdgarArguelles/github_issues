import '../index.html';
import './App.scss';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {useGitHubIssues} from 'app/hooks/GitHubAPI';
import Autocomplete from 'app/features/autocomplete/Autocomplete';
import GithubIssue from 'app/features/github_issue/GithubIssue';

const App = () => {
    const [selected, setSelected] = useState(null);
    const issues = useGitHubIssues();

    const renderResult = value => issues
        .filter(issue => issue.title?.toLowerCase()?.indexOf(value.toLowerCase()) >= 0)
        .map(issue => ({value: issue, display: <GithubIssue key={`issue-${issue.id}`} issue={issue}/>}));

    return (
        <>
            <Autocomplete placeholder="Search by issue's title" initValue={selected?.title} onSelect={setSelected}
                          renderResult={renderResult}/>
        </>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));