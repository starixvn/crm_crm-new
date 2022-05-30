import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import Chart from '../Chart';
import Detail from '../Detail';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render correctly when settings null', () => {
            // Arrange
            const props = {
                settings: null,
                gridParams: null,
                gridParamDetails: {
                    pageIndex: 1,
                    pageSize: 100
                },
                mainReports: null,
                reportDetails: null,
                details: { show: false, title: ''},
                chart: { show: false,title: '', data: null},
                getAllSettings: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render correctly when settings is empty', () => {
            // Arrange
            const props = {
                settings: {
                    communicationTools: [],
                    mainCategories: [],
                    products: []
                },
                gridParams: null,
                gridParamDetails: {
                    pageIndex: 1,
                    pageSize: 100
                },
                mainReports: null,
                reportDetails: null,
                details: { show: false, title: ''},
                chart: { show: true ,title: '', data: null},
                getAllSettings: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render correctly when show detail report', () => {
            // Arrange
            const props = {
                settings: {
                    communicationTools: [],
                    mainCategories: [],
                    products: []
                },
                gridParams: null,
                gridParamDetails: {
                    pageIndex: 1,
                    pageSize: 100
                },
                mainReports: null,
                reportDetails: null,
                details: { show: true, title: ''},
                chart: { show: false ,title: '', data: null},
                getAllSettings: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render correctly when settings is empty', () => {
            // Arrange
            const props = {
                settings: {
                    communicationTools: [],
                    mainCategories: [],
                    products: []
                },
                gridParams: null,
                gridParamDetails: {
                    pageIndex: 1,
                    pageSize: 100
                },
                mainReports: null,
                reportDetails: null,
                details: { show: false, title: ''},
                chart: { show: true ,title: '', data: null},
                getAllSettings: jest.fn(),
                setChartData: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            container.instance().handleCloseChartDialog();
            // Assert
            expect(props.setChartData).toHaveBeenCalledWith({ show: false, title: '', data: null})
        });
    });
});