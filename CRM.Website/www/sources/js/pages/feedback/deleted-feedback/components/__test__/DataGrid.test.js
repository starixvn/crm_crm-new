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
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(5);
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
            container.instance().handleEditFeedback(147258);
           
            // Assert
            expect(props.setEditFeedbackDialog).toHaveBeenCalledWith({ show: true, feedbackId: 147258 });
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

    describe('handleOpenViewRelatedCustomerDialog', () => {
        it('should call exactly param', () => {
            // Arrange
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            }
            const relatedCustomers = ["test"];
            const expectedParams = { show: true, relatedCustomers};

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleOpenViewRelatedCustomerDialog(relatedCustomers);

            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith(expectedParams);
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {
                gridParams: { pageIndex: 1, pageSize: 100 },
                gridData: { totalItems: 1, data: [] },
                setGridParams: jest.fn(),
                getDeletedFeedback: jest.fn()
            };
            const expectedGridParams = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith(expectedGridParams);
            expect(props.getDeletedFeedback).toHaveBeenCalledWith(expectedGridParams);
        });
    });

    describe('renderRow', () => {
        it('should call handleEditFeedback when click FeedbackId', () => {
            // Arrange
            const props = {
                gridData: {
                    totalItems: 1,
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                },
                gridParams: { pageIndex: 1, pageSize: 100 } 
            };
            const item = {
                feedbackId: 1234,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2"
            }
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleEditFeedback = jest.fn();

            const row = shallow(container.renderRow(item, 1));

            // Act
            row.find(Cell).at(0).find('div').at(0).props().onClick();

            // Assert
            expect(container.handleEditFeedback).toHaveBeenCalledWith(1234);
        });
    });

    describe('renderRelatedCustomerColumn', () => {
        it('should call handleOpenViewRelatedCustomerDialog when item greater than 20', () => {
            // Arrange
            const relatedCustomer = ["test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test"];
            const container = shallow(<DataGrid />).instance();

            const expectedRelatedCustomer = "test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test";
            container.handleOpenViewRelatedCustomerDialog = jest.fn();
            const link = shallow(container.renderRelatedCustomerColumn(relatedCustomer));

            // Act
            link.find('a').at(0).props().onClick();

            // Assert
            expect(container.handleOpenViewRelatedCustomerDialog).toHaveBeenCalledWith(expectedRelatedCustomer);
        });
    });
});