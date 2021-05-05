import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React from 'react';
import ResultItem from 'app/features/autocomplete/result_item/ResultItem';

describe('Components -> Autocomplete -> ResultItem', () => {
    const onSelectStub = sinon.stub();
    let component, wrapper;

    afterEach(() => onSelectStub.reset());

    const mountComponent = props => {
        wrapper = renderer.create(<ResultItem {...props}/>);
        component = wrapper.root.find(el => el.type.name === 'ResultItem');
    };

    describe('load', () => {
        it('should have required props', () => {
            mountComponent({
                data: {display: 'display', value: 'value'},
                focus: false,
                onSelect: onSelectStub,
            });

            expect(component.props.data).toStrictEqual({display: 'display', value: 'value'});
            expect(component.props.focus).toStrictEqual(false);
            expect(component.props.onSelect).toStrictEqual(onSelectStub);
        });
    });

    describe('onSelect', () => {
        it('should not call onSelect when key 35', () => {
            mountComponent({
                data: {display: 'display', value: 'value'},
                focus: false,
                onSelect: onSelectStub,
            });

            act(() => wrapper.root.findByType('div').props.onKeyDown({keyCode: 35, preventDefault: () => {}}));

            sinon.assert.callCount(onSelectStub, 0);
        });

        it('should call onSelect when key 27', () => {
            mountComponent({
                data: {display: 'display', value: 'value'},
                focus: false,
                onSelect: onSelectStub,
            });

            act(() => wrapper.root.findByType('div').props.onKeyDown({keyCode: 27, preventDefault: () => {}}));

            sinon.assert.callCount(onSelectStub, 1);
            sinon.assert.calledWithExactly(onSelectStub, null);
        });

        it('should call onSelect when key 13', () => {
            mountComponent({
                data: {display: 'display', value: 'value'},
                focus: false,
                onSelect: onSelectStub,
            });

            act(() => wrapper.root.findByType('div').props.onKeyDown({keyCode: 13, preventDefault: () => {}}));

            sinon.assert.callCount(onSelectStub, 1);
            sinon.assert.calledWithExactly(onSelectStub, 'value');
        });

        it('should call onSelect when click', () => {
            mountComponent({
                data: {display: 'display', value: 'value'},
                focus: false,
                onSelect: onSelectStub,
            });

            act(() => wrapper.root.findByType('div').props.onClick());

            sinon.assert.callCount(onSelectStub, 1);
            sinon.assert.calledWithExactly(onSelectStub, 'value');
        });
    });

    describe('snapshot', () => {
        it('should render ResultItem with props', () => {
            mountComponent({
                data: {display: 'display', value: 'value'},
                focus: false,
                onSelect: onSelectStub,
            });

            expect(wrapper.toJSON()).toMatchSnapshot();
        });
    });
});