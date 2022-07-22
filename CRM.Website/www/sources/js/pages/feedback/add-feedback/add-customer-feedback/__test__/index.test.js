import React from 'react';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import {index} from '../index';
import { shallow } from 'enzyme';


describe('index', () => {
    const mockStore = configureMockStore();
    const initialState = {
        settings: null,
        balanceUpday: null,
        addFeedbackResult: null,
        feedbackSubjectTemplates: [],
        confirmCreateGuestDialog: { show: false }
    };
    const store = mockStore(initialState);

    it('component renders correctly', () => {
        //Arrange
        const props = {
            location: {
                state: {custId: 1}
            }
        };
        const container = shallow(
                <index {...props} store={store}/>
            );
        // Action
        expect(toJson(container)).toMatchSnapshot();
    });
});