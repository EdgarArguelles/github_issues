import renderer from 'react-test-renderer';
import React from 'react';
import GithubIssue from 'app/features/github_issue/GithubIssue';

describe('Features -> GithubIssue', () => {
    let component, wrapper;

    const mountComponent = props => {
        wrapper = renderer.create(<GithubIssue {...props}/>);
        component = wrapper.root.find(el => el.type.name === 'GithubIssue');
    };

    describe('load', () => {
        it('should have all props', () => {
            mountComponent({
                issue: {
                    title: 'title test',
                    number: 5,
                    user: {login: 'login test'},
                    labels: [{id: 1, color: 'red', name: 'A'}, {id: 2, color: 'blue', name: 'B'}],
                },
            });

            expect(component.props.issue).toStrictEqual({
                title: 'title test',
                number: 5,
                user: {login: 'login test'},
                labels: [{id: 1, color: 'red', name: 'A'}, {id: 2, color: 'blue', name: 'B'}],
            });
        });
    });

    describe('snapshot', () => {
        it('should render GithubIssue with props', () => {
            mountComponent({
                issue: {
                    title: 'title test',
                    number: 5,
                    user: {login: 'login test'},
                    labels: [{id: 1, color: 'red', name: 'A'}, {id: 2, color: 'blue', name: 'B'}],
                },
            });

            expect(wrapper.toJSON()).toMatchSnapshot();
        });
    });
});