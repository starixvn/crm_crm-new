import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import EditForm from '../EditForm';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    beforeAll(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasReadCustomerInfo');
        appContainer.checked = true;
        const hasReadSitePermission = document.createElement('div');
        hasReadSitePermission.setAttribute('id', 'hasReadSitePermission');
        hasReadSitePermission.checked = true;
        document.body.appendChild(appContainer);
        document.body.appendChild(hasReadSitePermission);
    });

    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasReadCustomerInfo');
        const hasReadSitePermission = document.getElementById('hasReadSitePermission');
        if (appContainer || hasReadSitePermission) {
            document.body.removeChild(appContainer);
            document.body.removeChild(hasReadSitePermission);
        }
    });

    describe('componentWillUnmount', () => {
        const props = {
            resetState: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render EditForm correctly', () => {
            //Act
            const state = {
                customerInfoPolicy: 2,
                updateHeadlineInfoPolicy: 2
            };
            const container = shallow(<AppContainer />);
            container.instance().setState(state);
            //Assert
            expect(toJson(container)).toMatchSnapshot();
            expect(container.find(EditForm).length).toBe(1);
        });

        it('should render dialog message correctly', () => {
            //Arrange
            const state = {
                customerInfoPolicy: 2,
                updateHeadlineInfoPolicy: 2
            };
            const props = {
                editCustomerInfoDetailDialog: { show: true }
            };

            //Act
            const container = shallow(<AppContainer {...props} />);
            container.instance().setState(state);
            //Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});