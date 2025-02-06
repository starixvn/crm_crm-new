import React from 'react';
import DataGridWrapper from '../DataGrid';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

describe('component with redux', () => {
    // Arrange
    const mockStore = configureMockStore();
    const initialState = {
        gridParams: {},
        gridData: {}
    };

    const store = mockStore(initialState);
    
    // Action
    const wrapper = shallow(<DataGridWrapper store={store} />);

    // Assert
    it('component render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component has correct props', () => {
        expect(wrapper.props().children.props.gridParams).toEqual(
            initialState.gridParams
        );
        expect(wrapper.props().children.props.gridData).toEqual(
            initialState.gridData
        );
    });
});