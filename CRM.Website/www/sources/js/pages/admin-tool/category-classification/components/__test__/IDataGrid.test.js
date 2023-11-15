import React from 'react';
import DataGridWrapper, { DataGrid } from '../DataGrid';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { PAGING_SIZES } from '@jsroot/common/constants';
import configureMockStore from 'redux-mock-store';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    describe('handleEdit', () => {
        it('should calls setState when change category', async () => {
            // Arrange
            const props = {
                getCategoryClassById: jest.fn(),
                setEditCategoryClassPopup: jest.fn()
            };

            // Action
            const container = shallow(<DataGrid {...props} />, { disableLifecycleMethods: true });
            await container.instance().handleEdit('1', '1');

            // Assert
            expect(props.getCategoryClassById).toHaveBeenCalled();
            expect(props.setEditCategoryClassPopup).toHaveBeenCalled();
        });
    });

    describe('handleDelete', () => {
        it('should calls setState when change category', async () => {
            // Arrange
            const props = {
                getCategoryClassById: jest.fn(),
                setDeleteCategoryClassPopup: jest.fn()
            };

            // Action
            const container = shallow(<DataGrid {...props} />, { disableLifecycleMethods: true });
            await container.instance().handleDelete('1', '1');

            // Assert
            expect(props.getCategoryClassById).toHaveBeenCalled();
            expect(props.setDeleteCategoryClassPopup).toHaveBeenCalled();
        });
    });

    describe('buildHeader', () => {
        it('should render expected header when isHost = false', () => {
            // Arrange
            const container = shallow(<DataGrid />).instance();

            // Act
            const header = shallow(container.buildHeader(false));

            // Assert
            expect(header.find(HeaderCell).length).toBe(3);
        });

        it('should render expected header when isHost = true', () => {
            // Arrange
            const container = shallow(<DataGrid />).instance();

            // Act
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(4);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridParamsCommunication: { pageSize: 100, pageIndex: 1 },
                gridDataCommunication: {
                    totalItems: 1,
                    data: []
                }
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBodyCommunication(true);

            // Assert
            expect(actual).toEqual([<Row key={`body${1}`} className='no-data'><Cell className='text-center' colSpan='4'>ThereIsNoData</Cell></Row>]);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {
                gridParamsCommunication: { pageSize: 100, pageIndex: 1 },
                gridDataCommunication: {
                    totalItems: 1,
                    data: [{
                        defaultCommId: 1,
                        username: 'asd'
                    }]
                }
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRowCommunication = jest.fn(() => <div />);

            // Act
            const actual = container.buildBodyCommunication(true);

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

})