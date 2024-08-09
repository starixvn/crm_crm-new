import React from 'react';
import { AutoRefresh } from '../AutoRefresh';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

describe('component with redux', () => {
    // Arrange
    const mockStore = configureMockStore();
    const initialState = {
        autoRefresh: {isShow: false},
        gridParams: {pageSize: 100},
        isRefresh: true
    };

    const store = mockStore(initialState);
    
    // Action
    const wrapper = shallow(<AutoRefresh  store={store} />);

    // Assert
    it('component render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component has correct props', () => {
        expect(wrapper.props().children.props.autoRefresh).toEqual(
            initialState.autoRefresh
        );
        expect(wrapper.props().children.props.gridParams).toEqual(
            initialState.gridParams
        );
        expect(wrapper.props().children.props.isRefresh).toEqual(
            initialState.isRefresh
        );
    });
});