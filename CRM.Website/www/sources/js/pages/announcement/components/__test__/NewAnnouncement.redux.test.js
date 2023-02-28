import React from 'react';
import NewAnnouncementWrapper from '../NewAnnouncement';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

describe('component with redux', () => {
    // Arrange
    const mockStore = configureMockStore();
    const initialState = {
        announcementTemplate: {},
        createAnnouncementResult: {},
        settings: {}
    };

    const store = mockStore(initialState);
    
    // Action
    const wrapper = shallow(<NewAnnouncementWrapper store={store} />);

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
    });
});