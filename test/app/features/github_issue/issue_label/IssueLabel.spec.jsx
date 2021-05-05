import renderer from 'react-test-renderer';
import React from 'react';
import IssueLabel from 'app/features/github_issue/issue_label/IssueLabel';

describe('Features -> GithubIssue -> IssueLabel', () => {
    let component, wrapper;

    const mountComponent = props => {
        wrapper = renderer.create(<IssueLabel {...props}/>);
        component = wrapper.root.find(el => el.type.name === 'IssueLabel');
    };

    describe('load', () => {
        it('should have all props', () => {
            mountComponent({
                label: {color: 'red', name: 'test'},
            });

            expect(component.props.label).toStrictEqual({color: 'red', name: 'test'});
        });
    });

    describe('snapshot', () => {
        it('should render IssueLabel with props', () => {
            mountComponent({
                label: {color: 'red', name: 'test'},
            });

            expect(wrapper.toJSON()).toMatchSnapshot();
        });
    });
});