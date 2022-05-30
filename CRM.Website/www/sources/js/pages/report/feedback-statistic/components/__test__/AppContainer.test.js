import React from 'react';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        viewRelatedCustomerDialog: { show: false },
        detailPopup: { show: false },
        chart: { show: false, chartInfo: null},
        setOpenChartPopup: jest.fn(),
        setOpenDetailPopup: jest.fn(),
        setViewRelatedCustomerDialog: jest.fn()
    };
    describe('handleCloseViewRelatedCustomerDialog', () => {
        it('should call exactly functions when close detail', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>);

            // Act
            container.instance().handleCloseViewRelatedCustomerDialog();
           
            // Assert
            expect(initProps.setViewRelatedCustomerDialog).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('handleCloseDetailDialog', () => {
        it('should call exactly functions when close detail', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>);

            // Act
            container.instance().handleCloseDetailDialog();
           
            // Assert
            expect(initProps.setOpenDetailPopup).toHaveBeenCalledWith({ show: false });
        });
    });
    
    describe('handleCloseChartDialog', () => {
        it('should call exactly functions when close detail', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>);

            // Act
            container.instance().handleCloseChartDialog();
           
            // Assert
            expect(initProps.setOpenChartPopup).toHaveBeenCalledWith({ show: false, chartInfo: null });
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                detailPopup: { show: true },
                viewRelatedCustomerDialog: { show: true },
                chart: { show: true },
                setOpenChartPopup: jest.fn(),
                setOpenDetailPopup: jest.fn(),
                setViewRelatedCustomerDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});