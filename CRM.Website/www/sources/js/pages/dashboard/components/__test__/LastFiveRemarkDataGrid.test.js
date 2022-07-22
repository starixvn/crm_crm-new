import React from 'react';
import { LastFiveRemarkDataGrid } from '../LastFiveRemarkDataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('LastFiveRemarkDataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        lastFiveRemarks: [{remarkID: 1504, createdDate: "Apr 18, 2022 10:35:19 PM", lastUpdate: "Apr 18, 2022 11:23:30 PM", remark: 'test'}],
        setOpenEditPopup: jest.fn(),
        getLastFiveRemark: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange
            const container = shallow(<LastFiveRemarkDataGrid  {...initProps}/>).instance();

            // Act
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(6);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                lastFiveRemarks: [],
                gridParams: { pageIndex: 1, pageSize: 100 },
                popupDeleteConfirm: { show: false },
                getLastFiveRemark: jest.fn()
            };

            const expectedBody = [<Row key='new-remark-body' className="no-data" ><Cell colSpan={6}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
            const container = shallow(<LastFiveRemarkDataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            
            const container = shallow(<LastFiveRemarkDataGrid {...initProps} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('renderRow', () => {
        it('onClick call exactly function', () => {
            // Arrange
            const container = shallow(<LastFiveRemarkDataGrid {...initProps} />).instance();
            container.handleOpenEdit = jest.fn();
            // Act
            const row = shallow(container.renderRow(initProps.lastFiveRemarks[0], 1));
            row.find(Cell).at(2).simulate('click');

            // Assert
            expect(container.handleOpenEdit).toHaveBeenCalled();
        });
    });


    describe('handleOpenEdit', () => {
        it('should call exactly function', () => {
            // Arrange
            const container = shallow(<LastFiveRemarkDataGrid {...initProps} />).instance();

            // Act
           container.handleOpenEdit(initProps.lastFiveRemarks[0]);

            // Assert
            expect(initProps.setOpenEditPopup).toHaveBeenCalled();
        });
    });

    describe('handleViewNewRemark ', () => {
        it('should call exactly function', () => {
            // Arrange
            const event = {
                preventDefault: jest.fn()
            };
            const props = {...initProps, navigate: jest.fn()};
            const container = shallow(<LastFiveRemarkDataGrid {...props} />).instance();

            // Act
           container.handleViewNewRemark(event);

            // Assert
            expect(props.navigate).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render null', () => {
            // Arrange
            const props = {
                lastFiveRemarks: null,
                getLastFiveRemark: jest.fn()
            };

            const container = shallow(<LastFiveRemarkDataGrid {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toEqual(null);
        });
    });
});