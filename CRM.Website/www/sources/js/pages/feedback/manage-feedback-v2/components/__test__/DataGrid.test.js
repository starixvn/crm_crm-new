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

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange
            const props = {
                gridDataFeedbacks: { totalItems: 1, data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 },
                isHost: true
            };

            // Act
            const container = shallow(<DataGrid  {...props}/>).instance();
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(8);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridDataFeedbacks is empty', () => {
            // Arrange
            const props = {
                gridDataFeedbacks: { totalItems: 1, data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 }              
            };
            const expectedBody = [<Row key='body-nodata' className='no-data' ><Cell className='text-center' colSpan={8}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridDataFeedbacks has data', () => {
            // Arrange
            const props = {
                gridDataFeedbacks: {
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
            const container = shallow(<DataGrid />);
            const received = container.instance().handleGroupCategory(params);

            // Assert
            expect(received).toEqual(expectValue);
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {
                gridParams: { pageIndex: 1, pageSize: 100 },
                gridDataFeedbacks: { totalItems: 1, data: [] },
                setGridParams: jest.fn(),
                getGridFeedbacks: jest.fn()
            };
            const expectedGridParams = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith(expectedGridParams);
            expect(props.getGridFeedbacks).toHaveBeenCalledWith(expectedGridParams);
        });
    });

    describe('renderRelatedCustomer', () => {
        it('should return exact info customer when items less than 20', () => {
            // Arrange
            const params = [1,2];
            const expected = '1, 2';
            const container = shallow(<DataGrid />).instance();
            // Act
            const result = container.renderRelatedCustomer(params);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return exact info customer when items greater than 20', () => {
            // Arrange
            const params = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
            const expected = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21';
            const container = shallow(<DataGrid />);
            container.instance().handleOpenViewRelatedCustomer = jest.fn();
            // Act
            const render = shallow(container.instance().renderRelatedCustomer(params));
            render.find('a').simulate('click');
            // Assert
            expect(container.instance().handleOpenViewRelatedCustomer).toHaveBeenCalledWith(expected);
        });
    });

    describe('handleChangeCheckbox  ', () => {
        it('should setState correctly', () => {
            // Arrange
            const checkedItems = new Map();
            const state = {
                checkedItems: checkedItems
            };
            const expected = {
                checkedItems: checkedItems.set(1, true)
            };
            const container = shallow(<DataGrid />).instance();
            container.setState(state);

            // Act
            container.handleChangeCheckbox({ target: { checked:true , name: '1' } });

            // Assert
            expect(container.state.checkedItems).toEqual(expected.checkedItems);
        });
    });

    describe('handleChangeCheckBoxAll   ', () => {
        it('should reset state', () => {
            // Arrange
            const expected = {
                checkedItems:  new Map()
            };
            
            const container = shallow(<DataGrid />).instance();

            // Act
            container.handleChangeCheckBoxAll ({ target: { checked:false } });

            // Assert
            expect(container.state.checkedItems).toEqual(expected.checkedItems);
        });

        it('should setState correctly', () => {
            // Arrange
            const props = {
                gridDataFeedbacks: {
                    totalItems: 1,
                    data: [ { feedbackId: 1,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: 'test1,test2' } ],
                    mainCategories: [{settingId: 0, settingValue: 'test', childSettings: [{subCategoryId: 0, name: 'All'}]}]
                },
                gridParams: { pageIndex: 1, pageSize: 100 } 
            };
            const checkedItems = new Map();
            const expected = {
                checkedItems: checkedItems.set(1,true)
            };
            
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleChangeCheckBoxAll({ target: { checked:true } });

            // Assert
            expect(container.state.checkedItems).toEqual(expected.checkedItems);
        });
    });

    describe('handleEditNoOfInquiry', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                gridDataFeedbacks: { totalItems: 1, data: [] },
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

    describe('handleMultipleReviewAndStatus', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setEditMultipleLogStatusDialog: jest.fn()
            };
            const checkedItems = new Map();
            const state = {
                checkedItems: checkedItems.set(1,true)
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            // Act
            container.handleMultipleReviewAndStatus(1);

            // Assert
            expect(props.setEditMultipleLogStatusDialog).toHaveBeenCalledWith({ show: true, feedbackIds: [1] });
        });
    });

    describe('handleMultipleEdit', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                gridDataFeedbacks: {
                    totalItems: 1,
                    data: [ { feedbackId: 1, username: 'test', settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: 'test1,test2' } ],
                    mainCategories: [{settingId: 0, settingValue: 'test', childSettings: [{subCategoryId: 0, name: 'All'}]}]
                },
                gridParams: { pageIndex: 1, pageSize: 100 },
                setEditMultipleLogDialog: jest.fn()
            };
            const checkedItems = new Map();
            const state = {
                checkedItems: checkedItems.set(1,true)
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            // Act
            container.handleMultipleEdit();

            // Assert
            expect(props.setEditMultipleLogDialog).toHaveBeenCalledWith({ show: true, feedbackArr: [{feedbackId: 1, username:'test'}] });
        });
    });


    describe('renderRow', () => {
        it('should call exact handleEditFeedback when click feedbackId', () => {
            // Arrange
            const props = {
                gridDataFeedbacks: {
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
                gridDataFeedbacks: {
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