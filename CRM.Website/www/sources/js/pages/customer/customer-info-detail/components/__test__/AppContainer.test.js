import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import EditForm from '../EditForm';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('handleEditSuccess', () => {
        it('should call exactly functions when edit customer info detail successful', () => {
            //Arrange
            const props = {
                getCustomerInfoDetail: jest.fn()
            };
            const expectedParams = { customerId: 1754 };
            const container = shallow(<AppContainer {...props} />).instance();
            
            //Act
            container.handleEditSuccess(expectedParams);

            //Assert
            expect(props.getCustomerInfoDetail).toHaveBeenCalledWith(expectedParams);
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
            const container = shallow(<AppContainer />);

            //Assert
            expect(container).toMatchSnapshot();
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
            expect(container).toMatchSnapshot();
            expect(container.find(SweetModalDialog).length).toBe(1);
            expect(container.find(SweetModalDialog).props().contents)
                .toStrictEqual(<div>{LangHelper.getResource('EditCustomerInfoSuccessfully')}</div>);
        });
    });
});