import renderer from 'react-test-renderer';
import React from 'react';
import {useFocusRef, useSetFocus} from 'app/hooks/Common';

describe('Hooks -> Common', () => {
    let hookResponse;

    afterEach(() => {
        hookResponse = undefined;
    });

    const mountComponent = hook => {
        const Component = () => {
            hookResponse = hook();
            return <div/>;
        };

        renderer.create(<Component hook={hook}/>);
    };

    describe('useSetFocus', () => {
        it('should get init value', () => {
            mountComponent(() => useSetFocus(5));

            expect(hookResponse[0]).toStrictEqual(0);
        });
    });

    describe('useFocusRef', () => {
        it('should get null ref', () => {
            mountComponent(() => useFocusRef());

            expect(hookResponse).toStrictEqual({current: null});
        });
    });
});