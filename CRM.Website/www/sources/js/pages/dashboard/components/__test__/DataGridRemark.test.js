import React from 'react';
import { Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { DataGridRemark } from '../DataGridRemark';

describe('DataGridRemark', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getCustomerRemarks: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            
            const container = shallow(<DataGridRemark {...props} />).instance();

            // Act
            container.componentDidMount();

            // Assert
            expect(props.getCustomerRemarks).toHaveBeenCalled();
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                customerRemarks: []
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={1}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGridRemark {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            const props = {
                ...initProps,
                customerRemarks: ['<div>test</div>']
            };
            
            const container = shallow(<DataGridRemark {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                customerRemarks: null
            };
            const container = shallow(<DataGridRemark {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });
    });
});