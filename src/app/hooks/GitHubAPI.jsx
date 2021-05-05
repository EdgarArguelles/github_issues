import {useEffect, useState} from 'react';
import Api from 'app/common/Api';

export const useGitHubIssues = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await Api.getJSON('https://api.github.com/repos/facebook/react/issues');
            setIssues(data);
        };

        loadData();
    }, []);

    return issues;
};