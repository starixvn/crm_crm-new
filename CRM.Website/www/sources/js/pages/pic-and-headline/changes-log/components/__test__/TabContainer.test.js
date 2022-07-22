import React from 'react';
import { shallow } from 'enzyme';
import { Tabs, Tab } from 'react-bootstrap';
import { AppContainer } from '../AppContainer';
import { TabContainer } from '../TabContainer';
describe('TabContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentWillUnmount', () => {
        const props = {
            resetState: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<TabContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
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
        });
    });
});