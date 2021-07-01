import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';

jest.mock('react-toastify');

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        //Act
        const container = shallow(<AppContainer />);

        //Assert
        expect(container).toMatchSnapshot();
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(DataGrid).length).toBe(1);
    });

    describe('edit customer info', () => {
        it('should render correctly', () => {
            //Arrange
            const props = {
                editCustomerInfoPopup: { show: true }
            };

            //Act
            const container = shallow(<AppContainer {...props} />)

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(SweetModalDialog).length).toBe(1);
            expect(container.find(SweetModalDialog).props().contents)
                .toStrictEqual(<div>{LangHelper.getResource('EditCustomerInfoSuccessfully')}</div>)
        });

        it('should call exactly functions when close popup', () => {
            //Arrange
            const props = {
                setEditCustomerInfoPopup: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseEditCustomerInfoPopup();

            //Assert
            expect(props.setEditCustomerInfoPopup).toHaveBeenCalledWith( { show: false });
        });

        it('should call exactly functions when edit customer info succesful', () => {
            //Arrange
            const props = {
                getCustomerInfo: jest.fn()
            }
            const container = shallow(<AppContainer {...props} />).instance();
            
            //Act
            container.handleEditSuccess();

            //Assert
            expect(props.getCustomerInfo).toHaveBeenCalled();
        });
    });

    describe('empty data customer info', () => {
        it('should render correctly', () => {
            //Arrange
            const props = {
                emptyCustomerInfoPopup: { show: true }
            };

            //Act
            const container = shallow(<AppContainer {...props} />)

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(SweetModalDialog).length).toBe(1);
            expect(container.find(SweetModalDialog).props().contents)
                .toStrictEqual(LangHelper.getResource('EmptyData'))
        });

        it('should call exactly functions when close popup', () => {
            //Arrange
            const props = {
                setEmptyCustomerInfoPopup: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseEmptyCustomerInfoPopup();

            //Assert
            expect(props.setEmptyCustomerInfoPopup).toHaveBeenCalledWith( { show: false });
        });

        it('should call exactly function when empty data', () => {
            //Arrange
            const props = {
                emptyCustomerInfoPopup: { show: true },
                gridData: null,
                setEmptyCustomerInfoPopup: jest.fn()
            }
            const container = shallow(<AppContainer {...props} />).instance();


            //Act
            container.handleCheckGridData();

            //Assert
            expect(props.setEmptyCustomerInfoPopup).toHaveBeenCalledWith( { show: true });
        
        });

        it('should not show popup when data not empty', () => {
             //Arrange
             const props = {
                emptyCustomerInfoPopup: { show: true },
                gridData: {
                    data: {
                        id:1
                    }
                },
                setEmptyCustomerInfoPopup: jest.fn()
            }
            const container = shallow(<AppContainer {...props} />).instance();


            //Act
            container.handleCheckGridData();

            //Assert
            expect(props.setEmptyCustomerInfoPopup).toHaveBeenCalledWith({ show: false });
        
        });
    });
});