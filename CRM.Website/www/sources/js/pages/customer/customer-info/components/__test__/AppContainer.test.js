import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import LangHelper from '@jsroot/common/langHelper';
import toJson from 'enzyme-to-json';

jest.mock('react-toastify');

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        //Act
        const container = shallow(<AppContainer />);

        //Assert
        expect(toJson(container)).toMatchSnapshot();
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
            expect(toJson(container)).toMatchSnapshot();
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