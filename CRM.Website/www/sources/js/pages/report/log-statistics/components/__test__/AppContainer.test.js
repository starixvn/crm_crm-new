import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import Chart from '../Chart';
import Detail from '../Detail';


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
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(0);
            expect(container.find(DataGrid).length).toBe(0);
            expect(container.find(Chart).length).toBe(0);
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
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
            expect(container.find(Detail).length).toBe(0);
            expect(container.find(Chart).length).toBe(1);
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
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(0);
            expect(container.find(Detail).length).toBe(1);
            expect(container.find(Chart).length).toBe(0);
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