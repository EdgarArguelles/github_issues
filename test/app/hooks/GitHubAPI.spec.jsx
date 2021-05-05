import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import {waitFor} from '@testing-library/react';
import React from 'react';
import {useGitHubIssues} from 'app/hooks/GitHubAPI';
import Api from 'app/common/Api';

describe('Hooks -> GitHubAPI', () => {
    const getStub = sinon.stub(Api, 'getJSON');
    let hookResponse;

    afterEach(() => {
        getStub.reset();
        hookResponse = undefined;
    });

    const mountComponent = hook => {
        const Component = () => {
            hookResponse = hook();
            return <div/>;
        };

        renderer.create(<Component hook={hook}/>);
    };

    describe('useGitHubIssues', () => {
        it('should call getStub', async () => {
            mountComponent(() => useGitHubIssues());

            await act(() => waitFor(() => sinon.assert.callCount(getStub, 1)));

            expect(hookResponse).toStrictEqual(undefined);
            sinon.assert.callCount(getStub, 1);
            sinon.assert.calledWithExactly(getStub, 'https://api.github.com/repos/facebook/react/issues');
        });

        it('should return empty', () => {
            mountComponent(() => useGitHubIssues());

            expect(hookResponse).toStrictEqual([]);
            sinon.assert.callCount(getStub, 0);
        });
    });
});