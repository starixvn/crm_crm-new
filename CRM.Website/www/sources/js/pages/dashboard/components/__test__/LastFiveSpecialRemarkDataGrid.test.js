import React from 'react';
import { LastFiveSpecialRemarkDataGrid } from '../LastFiveSpecialRemarkDataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('LastFiveSpecialRemarkDataGrid', () => {
    beforeAll(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);

        LangHelper.getResource = jest.fn(key => key);
    });
    
    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });
    

    const initProps = {
        lastFiveSpecialRemarks: [{remarkID: 1504, createdDate: "Apr 18, 2022 10:35:19 PM", lastUpdate: "Apr 18, 2022 11:23:30 PM", remark: 'test'}],
        setOpenEditPopup: jest.fn(),
        getLastFiveRemark: jest.fn(),
        getLastFiveSpecialRemarks: jest.fn()
    };

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                lastFiveSpecialRemarks: [],
                gridParams: { pageIndex: 1, pageSize: 100 },
                popupDeleteConfirm: { show: false },
                getLastFiveRemark: jest.fn(),
                getLastFiveSpecialRemarks: jest.fn()
            };

            const expectedBody = [<Row key='body-grid-remark' className="no-data" ><Cell className="text-center" colSpan={1}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
            const container = shallow(<LastFiveSpecialRemarkDataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectedBody));
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            
            const container = shallow(<LastFiveSpecialRemarkDataGrid {...initProps} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('render', () => {
        it('should render null', () => {
            // Arrange
            const props = {
                lastFiveSpecialRemarks: null,
                getLastFiveRemark: jest.fn(),
                getLastFiveSpecialRemarks: jest.fn()
            };

            const container = shallow(<LastFiveSpecialRemarkDataGrid {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toEqual(null);
        });
    });
});