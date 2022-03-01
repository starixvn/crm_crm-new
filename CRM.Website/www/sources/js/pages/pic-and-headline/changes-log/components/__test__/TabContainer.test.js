import React from 'react';
import { shallow } from 'enzyme';
import { Tabs, Tab } from 'react-bootstrap';
import AppContainer from '../AppContainer';
import TabContainer from '../TabContainer';
describe('TabContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('tab change', () => {
        it('should setState', () => {
            //Arrange
            const state = {tab: 'headlineDA'};

            // Act
            const tab = shallow(<TabContainer/>);
            tab.instance().setState(state);
            tab.find(Tabs).simulate('select', 'pic');
            // Assert
            expect(tab.instance().state.tab).toEqual('pic');
            expect(tab.find(AppContainer).length).toBe(2);
        });
    });
});