import React from 'react';
import { RemovedAccountLogs } from '../RemovedAccountLogs';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('RemovedAccountLogs', () => {
    afterAll(() => {
        jest.clearAllMock();
    });

    const initProps = {
        removedAccountLogs: {
            item: [{ logId: 1, username: 'test'}]
        },
        gridParamRemovedLogs: {
            pageIndex: 1,
            pageSize: 100
        }
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<RemovedAccountLogs />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(3);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                removedAccountLogs: {
                    item: []
                }
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={3}>ThereIsNoData</Cell></Row>];
            const container = shallow(<RemovedAccountLogs {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<RemovedAccountLogs {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('handleRemovedAccountLogs', () => {
        it('should call exactly functions when handle click show remove detail', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParamRemovedLogDetails: jest.fn(),
                getRemovedAccountLogDetails: jest.fn(),
                setRemovedLogDetailDialog : jest.fn()
            };

            // Act
            const container = shallow(<RemovedAccountLogs {...props}/>);
            container.instance().handleRemovedAccountLogDetails(12);
           
            // Assert
            expect(props.setGridParamRemovedLogDetails).toHaveBeenCalledWith({ logId: 12, pageIndex: 1, pageSize: 100 });
            expect(props.getRemovedAccountLogDetails).toHaveBeenCalledWith({ logId: 12, pageIndex: 1, pageSize: 100 });
            expect(props.setRemovedLogDetailDialog).toHaveBeenCalledWith({show: true});
        });
    });

    describe('onPaging', () => {
        it('should call exactly functions when onPaging', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParamRemovedLogs: jest.fn(),
                getRemovedAccountLogs: jest.fn()
            };

            // Act
            const container = shallow(<RemovedAccountLogs {...props}/>);
            container.instance().onPaging(1,100);
           
            // Assert
            expect(props.setGridParamRemovedLogs).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getRemovedAccountLogs).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
        });
    });

    describe('renderRow', () => {
        // Arrange
        const props = {
            ...initProps
        };
        const item = {
            logId: 12, username: 'test', clientLogDate: 'Aug 24 2021', totals: 2
        };

        const container = shallow(<RemovedAccountLogs {...props} />).instance();
        container.handleRemovedAccountLogDetails = jest.fn();

        // Act
        const actual = shallow(container.renderRow(item,1));
        actual.find('Cell').at(2).find('span').at(0).props().onClick();

        // Assert
        expect(container.handleRemovedAccountLogDetails).toHaveBeenCalledWith(12);
    });
});