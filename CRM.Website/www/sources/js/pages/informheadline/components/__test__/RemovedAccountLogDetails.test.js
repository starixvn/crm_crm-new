import React from 'react';
import { RemovedAccountLogDetails } from '../RemovedAccountLogDetails';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('RemovedAccountLogDetails', () => {
    afterAll(() => {
        jest.clearAllMock();
    });

    const initProps = {
        removedAccountLogDetails: {
            item: [{ logId: 1, username: 'test'}]
        },
        gridParamRemovedLogDetails: {
            pageIndex: 1,
            pageSize: 100
        }
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<RemovedAccountLogDetails />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(7);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                removedAccountLogDetails: {
                    item: []
                }
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={7}>ThereIsNoData</Cell></Row>];
            const container = shallow(<RemovedAccountLogDetails {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<RemovedAccountLogDetails {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('onPaging', () => {
        it('should call exactly functions when onPaging', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParamRemovedLogDetails: jest.fn(),
                getRemovedAccountLogDetails: jest.fn()
            };

            // Act
            const container = shallow(<RemovedAccountLogDetails {...props}/>);
            container.instance().onPaging(1,100);
           
            // Assert
            expect(props.setGridParamRemovedLogDetails).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getRemovedAccountLogDetails).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
        });
    });
});