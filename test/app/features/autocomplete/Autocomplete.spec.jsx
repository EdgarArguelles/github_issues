import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React from 'react';
import Autocomplete from 'app/features/autocomplete/Autocomplete';

describe('Components -> Autocomplete', () => {
    const onSelectStub = sinon.stub();
    const renderResultStub = sinon.stub();
    let component, wrapper;

    afterEach(() => {
        onSelectStub.reset();
        renderResultStub.reset();
    });

    const mountComponent = props => {
        wrapper = renderer.create(<Autocomplete {...props}/>);
        component = wrapper.root.find(el => el.type.name === 'Autocomplete');
    };

    describe('load', () => {
        it('should have required props', () => {
            mountComponent({
                onSelect: onSelectStub,
                renderResult: renderResultStub,
            });

            expect(component.props.placeholder).toBeUndefined();
            expect(component.props.initValue).toBeUndefined();
            expect(component.props.onSelect).toStrictEqual(onSelectStub);
            expect(component.props.renderResult).toStrictEqual(renderResultStub);
        });

        it('should have all props', () => {
            mountComponent({
                placeholder: 'placeholder test',
                initValue: 'initValue test',
                onSelect: onSelectStub,
                renderResult: renderResultStub,
            });

            expect(component.props.placeholder).toStrictEqual('placeholder test');
            expect(component.props.initValue).toStrictEqual('initValue test');
            expect(component.props.onSelect).toStrictEqual(onSelectStub);
            expect(component.props.renderResult).toStrictEqual(renderResultStub);
        });
    });

    describe('renderResult', () => {
        it('should call not renderResult when null', () => {
            mountComponent({
                onSelect: onSelectStub,
                renderResult: renderResultStub,
            });

            act(() => wrapper.root.findByType('input').props.onChange({target: {value: null}}));

            sinon.assert.callCount(renderResultStub, 0);
        });

        it('should call renderResult when value', () => {
            mountComponent({
                onSelect: onSelectStub,
                renderResult: renderResultStub,
            });

            act(() => wrapper.root.findByType('input').props.onChange({target: {value: 'test'}}));

            sinon.assert.callCount(renderResultStub, 1);
            sinon.assert.calledWithExactly(renderResultStub, 'test');
        });
    });

    describe('snapshot', () => {
        it('should render Autocomplete without props', () => {
            mountComponent({
                onSelect: onSelectStub,
                renderResult: renderResultStub,
            });

            expect(wrapper.toJSON()).toMatchSnapshot();
        });

        it('should render Autocomplete with props', () => {
            mountComponent({
                placeholder: 'placeholder test',
                initValue: 'initValue test',
                onSelect: onSelectStub,
                renderResult: renderResultStub,
            });

            expect(wrapper.toJSON()).toMatchSnapshot();
        });
    });
});