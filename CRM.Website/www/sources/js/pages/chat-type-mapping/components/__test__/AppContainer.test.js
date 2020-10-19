import React from 'react';
import AppContainerWrapper, { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

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
            expect(wrapper).toMatchSnapshot();
        });

        it('render correct components', () => {
            const component = shallow(<AppContainer />);
            expect(component.find(Filter).length).toBe(1);
            expect(component.find(DataGrid).length).toBe(1);
        });
    });
});