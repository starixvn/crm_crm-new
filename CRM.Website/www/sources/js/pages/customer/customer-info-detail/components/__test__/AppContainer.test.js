import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import EditForm from '../EditForm';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
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
            const container = shallow(<AppContainer />);

            //Assert
            expect(toJson(container)).toMatchSnapshot();
            expect(container.find(EditForm).length).toBe(1);
        });

        it('should render dialog message correctly', () => {
            //Arrange
            const props = {
                editCustomerInfoDetailDialog: { show: true }
            };

            //Act
            const container = shallow(<AppContainer {...props} />);

            //Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});