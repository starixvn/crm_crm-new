import React from 'react';
import ActionAnnouncementWrapper from '../ActionAnnouncement';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

describe('component with redux', () => {
    // Arrange
    const mockStore = configureMockStore();
    const initialState = {
        announcementTemplate: {},
        createAnnouncementResult: {},
        settings: {},
        editAnnouncementResult: {},
        actionAnnouncementPopup: {},
        createAnnouncementResult: {},
        validateAnnouncementResult: {},
    };

    const store = mockStore(initialState);
    
    // Action
    const wrapper = shallow(<ActionAnnouncementWrapper store={store} />);

    // Assert
    it('component render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component has correct props', () => {
        expect(wrapper.props().children.props.announcementTemplate).toEqual(
            initialState.announcementTemplate
        );
        expect(wrapper.props().children.props.createAnnouncementResult).toEqual(
            initialState.createAnnouncementResult
        );
        expect(wrapper.props().children.props.settings).toEqual(
            initialState.settings
        );
        expect(wrapper.props().children.props.editAnnouncementResult).toEqual(
            initialState.editAnnouncementResult
        );
        expect(wrapper.props().children.props.actionAnnouncementPopup).toEqual(
            initialState.actionAnnouncementPopup
        );
        expect(wrapper.props().children.props.createAnnouncementResult).toEqual(
            initialState.createAnnouncementResult
        );
        expect(wrapper.props().children.props.validateAnnouncementResult).toEqual(
            initialState.validateAnnouncementResult
        );
    });
});