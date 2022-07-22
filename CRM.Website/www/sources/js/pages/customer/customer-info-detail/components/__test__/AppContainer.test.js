import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import EditForm from '../EditForm';
import toJson from 'enzyme-to-json';
import * as shareScripts from '@jsroot/common/shareScripts';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
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

    describe('handleCloseEditDetailDialog', () => {
        it('should call exactly functions when close dialog', () => {
            //Arrange
            const props = {
                setEditCustomerInfoDetailDialog: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseEditDetailDialog();

            //Assert
            expect(props.setEditCustomerInfoDetailDialog).toHaveBeenCalledWith({ show: false });
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