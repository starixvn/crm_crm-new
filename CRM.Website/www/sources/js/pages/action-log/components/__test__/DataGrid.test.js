import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    beforeAll(() => {
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
        activityLogs: {
            data: [{
                logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption',
                fieldNames: ['ts', 'remark'], oldValuesList: ['test'], newValuesList: ['test']
            }],
            totalItems: 18
        }
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(6);
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = { 
                activityLogs: {
                    data: [],
                    totalItems: 18
                },
                gridParams: { pageIndex: 1, pageSize: 100 }
             };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={6}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { pageIndex: 1, pageSize: 100 }
             };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('replaceText', () => {
        it('should return exactly when call function replaceText', () => {
            // Arrange
            const text = '\\n';
            const container = shallow(<DataGrid />).instance();

            // Act
            const actual = container.replaceText(text);

            // Assert
            expect(actual).toBe('<br />');
        });

        it('should return exactly when param function replaceText is null', () => {
            // Arrange
            const text = null;
            const container = shallow(<DataGrid />).instance();

            // Act
            const actual = container.replaceText(text);

            // Assert
            expect(actual).toBe('');
        });
    });

    describe('onPaging', () => {
        it('should call exactly function when onPaging', () => {
            // Arrange
            const props = {
                setGridParams: jest.fn(),
                getActivityLog: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.onPaging(1,200);

            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getActivityLog).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = { activityLogs: null };
            const container = shallow(<DataGrid {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });
    });
});