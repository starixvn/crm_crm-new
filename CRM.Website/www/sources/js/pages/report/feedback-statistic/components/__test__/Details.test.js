import React from 'react';
import { Details } from '../Details';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('Details', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange
            const props = {
                details: { totalItems: 1, data: [] },
                gridParamDetails : { pageIndex: 1, pageSize: 100 }
            };

            // Act
            const container = shallow(<Details  {...props}/>).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(5);
        });
    });

    describe('buildBody', () => {
        it('should render no data when details is empty', () => {
            // Arrange
            const props = {
                details: { totalItems: 1, data: [] },
                gridParamDetails : { pageIndex: 1, pageSize: 100 }              
            };
            const expectedBody = [<Row key='body-nodata' className='no-data' ><Cell className='text-center' colSpan={5}>ThereIsNoData</Cell></Row>];
            const container = shallow(<Details {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when details has data', () => {
            // Arrange
            const props = {
                details: {
                    totalItems: 1,
                    data: [ { feedbackId: 1234,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2" } ],
                    mainCategories: [{settingId: 0, settingValue: 'test', childSettings: [{subCategoryId: 0, name: "All"}]}]
                },
                gridParamDetails : { pageIndex: 1, pageSize: 100 } 
            };
            const container = shallow(<Details {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange
            const props = {
                gridParamDetails : { username: 'test' },
                exportExcelDetails: jest.fn()
            };

            // Act
            const container = shallow(<Details {...props}/>);
            container.instance().handleExportExcel();
           
            // Assert
            expect(props.exportExcelDetails).toHaveBeenCalledWith({ username: 'test' });
        });
    });

    describe('handleOpenViewRelatedCustomer ', () => {
        it('should call exactly functions when open related customer', () => {
            // Arrange
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            };
            const relatedCustomers  = 'test';

            // Act
            const container = shallow(<Details {...props}/>);
            container.instance().handleOpenViewRelatedCustomer(relatedCustomers );
           
            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith({ show: true, relatedCustomers });
        });
    });

    describe('renderStatus', () => {
        it('should return pending', () => {
            // Arrange
            // Act
            const container = shallow(<Details/>);
            const actual = container.instance().renderStatus('Pending');
           
            // Assert
            expect(actual).toEqual('pending');
        });

        it('should return closed', () => {
            // Arrange
            // Act
            const container = shallow(<Details/>);
            const actual = container.instance().renderStatus('Closed');
           
            // Assert
            expect(actual).toEqual('closed');
        });
    });

    describe('handleGroupCategory', () => {
        it('should return expect array', () => {
            // Arrange
            const params = [
                { settingId: 3024, subSettingId: 4069 },
                { settingId: 3024, subSettingId: 4070 },
                { settingId: 3025, subSettingId: 4080 },
                { settingId: 3024, subSettingId: 4071 }
            ];
            const expectValue = [
                { settingId: 3024, subSettingId: [ 4069, 4070, 4071 ] },
                { settingId: 3025, subSettingId: [ 4080 ] }
            ];
            // Act
            const container = shallow(<Details />);
            const received = container.instance().handleGroupCategory(params);

            // Assert
            expect(received).toEqual(expectValue);
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {
                gridParamDetails : { pageIndex: 1, pageSize: 100 },
                details: { totalItems: 1, data: [] },
                setGridParamDetails : jest.fn(),
                getDetails: jest.fn()
            };
            const expectedGridParamDetails  = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<Details {...props} />).instance();

            // Act
            container.onPaging(expectedGridParamDetails .pageIndex, expectedGridParamDetails .pageSize);

            // Assert
            expect(props.setGridParamDetails ).toHaveBeenCalledWith(expectedGridParamDetails );
            expect(props.getDetails).toHaveBeenCalledWith(expectedGridParamDetails );
        });
    });

    describe('renderRelatedCustomer', () => {
        it('should return exact info customer when items less than 20', () => {
            // Arrange
            const params = [1,2];
            const expected = '1, 2';
            const container = shallow(<Details />).instance();
            // Act
            const result = container.renderRelatedCustomer(params);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return exact info customer when items greater than 20', () => {
            // Arrange
            const params = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
            const expected = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21';
            const container = shallow(<Details />);
            container.instance().handleOpenViewRelatedCustomer = jest.fn();
            // Act
            const render = shallow(container.instance().renderRelatedCustomer(params));
            render.find('a').simulate('click');
            // Assert
            expect(container.instance().handleOpenViewRelatedCustomer).toHaveBeenCalledWith(expected);
        });
    });
});