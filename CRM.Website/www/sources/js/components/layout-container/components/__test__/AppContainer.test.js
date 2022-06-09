import React from 'react';
import { shallow } from 'enzyme';
import AppContainer  from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';

jest.mock('react-toastify');

describe('AppContainer', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
    it('should render correctly', () => {
        //Act
        const container = shallow(<AppContainer />);

        container.instance().render();
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
            const container = shallow(<AppContainer {...props} />);

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(SweetModalDialog).length).toBe(1);
            expect(container.find(SweetModalDialog).props().contents)
                .toStrictEqual(<div>{LangHelper.getResource('EditCustomerInfoSuccessfully')}</div>);
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
    });
});