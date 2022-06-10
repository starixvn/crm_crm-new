import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    beforeEach(() => {
        const rightRowContainer = document.createElement('div');
        rightRowContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(rightRowContainer);
    });

    afterEach(() => {
        const rightRowContainer = document.getElementById('right-row-container');
        if (rightRowContainer) {
            document.body.removeChild(rightRowContainer);
        }
    });

    const propsInit = {
        gridData: {
            name: 'test',
            childReports: [{
                childReports: [{
                    shortName: "11:00 - 11:59",
                    numberOfIssues: 3,
                    childReports: [
                        { numberOfIssues: 1 },
                        { numberOfIssues: 1 }
                    ]
                },
                {
                    shortName: "11:00 - 11:59",
                    numberOfIssues: 3,
                    childReports: [
                        { numberOfIssues: 1 },
                        { numberOfIssues: 1 }
                    ]

                }
                ],
                shortName: 'Feb 28, 2022', numberOfIssues: 1,
                total: { shortName: 'grandTotal', childReports: [{ countryInfo: [{ id: 1, name: 'Antigua & Barbuda' }] }] }
            }],
            total: { shortName: 'grandTotal', childReports: [{ countryInfo: [{ id: 1, name: 'Antigua & Barbuda' }] }] }
        },
        gridParams: { pageIndex: 1, pageSize: 100 },
        exportExcel: jest.fn(),
        setGridParams: jest.fn(),
        getGridData: jest.fn(),
        setChartData: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange
            const countryArr = [{ id: 1, name: 'Antigua & Barbuda' }];

            // Act
            const container = shallow(<DataGrid  {...propsInit} />).instance();
            const header = shallow(container.buildHeader(countryArr));

            // Assert
            expect(header.find(HeaderCell).length).toBe(4);
        });
    });

    describe('buildBody', () => {
        it('should render expected rows when gridData has data', () => {
            // Arrange
            const container = shallow(<DataGrid {...propsInit} />).instance();
            container.renderRow = jest.fn(() => <div />);
            const countryArr = [{ id: 1, name: 'Antigua & Barbuda' }];
            // Act
            const actual = container.buildBody(propsInit.gridData, countryArr);

            // Assert
            expect(actual).toEqual([<div />]);
        });

        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridData: {
                    name: 'test',
                    childReports: [],
                    total: { shortName: 'grandTotal', childReports: [{ countryInfo: [{ id: 1, name: 'Antigua & Barbuda' }] }] }
                },
                gridParams: { pageIndex: 1, pageSize: 100 }
            };
            const expectedBody = [<Row key={`body${1}`} className='no-data' ><Cell className='text-center' colSpan={7}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody(props.gridData, []);

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should work exactly when render footer', () => {
            // Arrange
            const props = {
                gridData: {
                    name: 'test',
                    childReports: [],
                    total: { shortName: 'grandTotal', numberOfIssues: 1, childReports: [{ countryInfo: [{ id: 1, name: 'Antigua & Barbuda' }] }] }
                },
                gridParams: { pageIndex: 1, pageSize: 100 }
            };
            const expectedBody = [<Row className="footer-container font-weight-bold"><Cell className="fix-first-column">Grand Total</Cell><Cell className="fix-second-column" /><Cell className="text-center" /><Cell className="text-center">1</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.renderFooter(props.gridData);

            // Assert
            expect(actual.Cell).toEqual(expectedBody.Cell);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange

            // Act
            const container = shallow(<DataGrid {...propsInit} />);
            container.instance().handleExportExcel();

            // Assert
            expect(propsInit.exportExcel).toHaveBeenCalledWith(propsInit.gridParams);
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const expectedGridParams = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<DataGrid {...propsInit} />).instance();

            // Act
            container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

            // Assert
            expect(propsInit.setGridParams).toHaveBeenCalledWith(expectedGridParams);
            expect(propsInit.getGridData).toHaveBeenCalledWith(expectedGridParams);
        });
    });

    describe('renderTitle ', () => {
        it('should call setChartData function when click', () => {
            // Arrange
            const container = shallow(<DataGrid {...propsInit} />);

            // Act
            var title = shallow(container.instance().renderTitle(propsInit.gridData));
            title.find('span').at(1).simulate('click');
            // Assert
            expect(propsInit.setChartData).toHaveBeenCalled();
        });

        it('should call handleExportExcel function when click', () => {
            // Arrange
            const container = shallow(<DataGrid {...propsInit} />);
            container.instance().handleExportExcel = jest.fn();
            // Act
            var title = shallow(container.instance().renderTitle(propsInit.gridData));
            title.find('span').at(2).simulate('click');
            // Assert
            expect(container.instance().handleExportExcel).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('return null', () => {
            // Arrange
            propsInit.gridData = undefined;
            // Act
            const container = shallow(<DataGrid {...propsInit} />);
            // Assert
            expect(container).toEqual({});
        });
    });
});