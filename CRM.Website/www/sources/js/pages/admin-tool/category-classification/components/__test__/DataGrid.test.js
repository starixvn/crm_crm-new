import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

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

    const initProps = {
        gridData: {
            data: [
                { mainCategoryId: 1, subCategoryId: 1 }
            ],
            totalItems: 2
        },
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        }
    }

    describe('handleEdit', () => {
        it('should calls setState when change category', async () => {
            // Arrange
            const props = {
                ...initProps,
                getCategoryClassById: jest.fn(),
                setEditCategoryClassPopup: jest.fn()
            };

            // Action
            const container = shallow(<DataGrid {...props} />);
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
                ...initProps,
                getCategoryClassById: jest.fn(),
                setDeleteCategoryClassPopup: jest.fn()
            };

            // Action
            const container = shallow(<DataGrid {...props} />);
            await container.instance().handleDelete('1', '1');

            // Assert
            expect(props.getCategoryClassById).toHaveBeenCalled();
            expect(props.setDeleteCategoryClassPopup).toHaveBeenCalled();
        });
    });

    describe('buildHeader', () => {
        it('should render expected header when isHost = false', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps}/>).instance();

            // Act
            const header = shallow(container.buildHeader(false));

            // Assert
            expect(header.find(HeaderCell).length).toBe(3);
        });

        it('should render expected header when isHost = true', () => {
            // Arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();

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
                ...initProps,
                gridParams: { pageSize: 100, pageIndex: 1 },
                gridData: {
                    totalItems: 1,
                    data: []
                }
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual([<Row key={`body${1}`} className='no-data'><Cell className='text-center' colSpan={4}>ThereIsNoData</Cell></Row>]);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { pageSize: 100, pageIndex: 1 }
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('onPaging', () => {
        it('should call exactly props function when onPaging', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { pageSize: 100, pageIndex: 1 },
                setGridParams: jest.fn(),
                getGridData: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.onPaging();

            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
        });
    });

    describe('renderExportExcel', () => {
        it('return OverlayTrigger', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps}/>).instance();
            container.handleExportExcel = jest.fn();

            // Act
            const actual = container.renderExportExcel();

            // Assert
            expect(actual).toEqual(<OverlayTrigger
                placement="auto"
                overlay= {
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
                >
                {
                    <span className="fa fa-file-excel-o icon-excel" onClick={container.handleExportExcel} />
                }
                </OverlayTrigger>);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly props function when onPaging', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { pageSize: 100, pageIndex: 1 },
                exportExcel: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleExportExcel();

            // Assert
            expect(props.exportExcel).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should return null', () => {
            // Arrange
            const props = {
                gridData: {
                    data: null
                }
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toBeNull();
        });
    });
})