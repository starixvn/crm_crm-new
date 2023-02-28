import React from 'react';
import AppContainer from '../AppContainer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

describe('component with redux', () => {
    // Arrange
    const mockStore = configureMockStore();
    const initialState = {
        newAnnouncementPopup: {isShow: false},
        actionAnnouncementPopup: {isShow: false},
        cancelAnnouncementPopup: {isShow: false},
        contentPopup: {isShow: false},
        gridParams: {pageSize: 100}
    };

    const store = mockStore(initialState);
    
    // Action
    const wrapper = shallow(<AppContainer  store={store} />);

    // Assert
    it('component render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component has correct props', () => {
        expect(wrapper.props().children.props.newAnnouncementPopup).toEqual(
            initialState.newAnnouncementPopup
        );
        expect(wrapper.props().children.props.actionAnnouncementPopup).toEqual(
            initialState.actionAnnouncementPopup
        );
        expect(wrapper.props().children.props.cancelAnnouncementPopup).toEqual(
            initialState.cancelAnnouncementPopup
        );
        expect(wrapper.props().children.props.contentPopup).toEqual(
            initialState.contentPopup
        );
        expect(wrapper.props().children.props.gridParams).toEqual(
            initialState.gridParams
        );
    });
});