import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange
            const props = {
                gridData: { totalItems: 1, data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 },
                isHost: true
            };

            // Act
            const container = shallow(<DataGrid  {...props}/>).instance();
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(6);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridData: { totalItems: 1, data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 }              
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={5}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {
                gridData: {
                    totalItems: 1,
                    data: [ { feedbackId: 1234,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2" } ],
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                },
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

    describe('handleEditFeedback', () => {
        it('should call exactly functions when handle edit', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: false },
                setEditFeedbackDialog: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleEditFeedback(1);
           
            // Assert
            expect(props.setEditFeedbackDialog).toHaveBeenCalledWith({ show: true, feedbackId: 1 });
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange
            const props = {
                gridParams: { username: "test" },
                exportExcel: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleExportExcel();
           
            // Assert
            expect(props.exportExcel).toHaveBeenCalledWith({ username: "test" });
        });
    });

    describe('renderRelatedCustomerColumn', () => {
        it('should return exact info customer when items less than 20', () => {
            // Arrange
            const params = [1,2];
            const expected = <span>1, 2</span>;
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            // Act
            const result = container.renderRelatedCustomerColumn(params);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return exact info customer when items greater than 20', () => {
            // Arrange
            const params = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
            const expected = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21';
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            };
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleOpenViewRelatedCustomerDialog = jest.fn();
            // Act
            const render = shallow(container.instance().renderRelatedCustomerColumn(params));
            render.find('a').simulate('click');
            // Assert
            expect(container.instance().handleOpenViewRelatedCustomerDialog).toHaveBeenCalledWith(expected);
        });
    });
    

    describe('handleEditNoOfInquiry', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                gridData: { totalItems: 1, data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 },
                isHost: true,
                setEditNoOfInquiryDialog : jest.fn()
            };
            const container = shallow(<DataGrid {...props}/>).instance();

            // Act
            container.handleEditNoOfInquiry(1);

            // Assert
            expect(props.setEditNoOfInquiryDialog).toHaveBeenCalledWith({ show: true, feedbackId: 1 });
        });
    });

    describe('handleOpenViewRelatedCustomerDialog', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setViewRelatedCustomerDialog : jest.fn()
            };
            const container = shallow(<DataGrid {...props}/>).instance();

            // Act
            container.handleOpenViewRelatedCustomerDialog(1);

            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith({ show: true, relatedCustomers:1 });
        });
    });


    describe('renderRow', () => {
        it('should call exact handleEditFeedback when click feedbackId', () => {
            // Arrange
            const props = {
                gridData: {
                    totalItems: 1,
                    data: [ { feedbackId: 1, username: 'test', settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: 'test1,test2' } ],
                    mainCategories: [{settingId: 0, settingValue: 'test', childSettings: [{subCategoryId: 0, name: 'All'}]}]
                },
                gridParams: { pageIndex: 1, pageSize: 100 }
            };
            const item = {
                feedbackId: 1,
                settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}],
                relatedCustomer: 'test1,test2',
                status: 'Pending'
            };
            const container = shallow(<DataGrid  {...props}/>).instance();
            container.handleEditFeedback = jest.fn();
            // Act
            const row = shallow(container.tooltipFeedback(item));
            expect(row.find('div').at(0).simulate('click'));

            // Assert
            expect(container.handleEditFeedback).toHaveBeenCalledWith(1);
        });

        it('should call handleEditNoOfInquiry when click checkbox', () => {
            // Arrange
            const props = {
                gridData: {
                    totalItems: 1,
                    data: [ { feedbackId: 1, username: 'test', settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: 'test1,test2' } ],
                    mainCategories: [{settingId: 0, settingValue: 'test', childSettings: [{subCategoryId: 0, name: 'All'}]}]
                },
                gridParams: { pageIndex: 1, pageSize: 100 }
            };
            const item = {
                feedbackId: 1,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: 'test1,test2'
            };
            const container = shallow(<DataGrid  {...props}/>).instance();
            container.handleEditNoOfInquiry = jest.fn();

            const row = shallow(container.renderRow(item, 1, true));

            // Act
            row.find(Cell).at(1).find('span').simulate('click');

            // Assert
            expect(container.handleEditNoOfInquiry).toHaveBeenCalledWith(1);
        });
    });
});