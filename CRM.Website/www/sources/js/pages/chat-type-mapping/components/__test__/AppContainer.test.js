import React from 'react';
import {AppContainerWrapper, AppContainer } from '../AppContainer';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';


describe('AppContainer', () => {
    beforeEach(() => {
        const isHost = document.createElement('div');
        isHost.setAttribute('id', 'is-host');
        isHost.setAttribute('checked', true);
        document.body.appendChild(isHost);
    });

    afterEach(() => {
        const isHost = document.getElementById('is-host');
        if (isHost) {
            document.body.removeChild(isHost);
        }
    });

    describe('component with redux', () => {
        // Action
        const wrapper = shallow(<AppContainerWrapper />);

        // Assert
        it('component render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});