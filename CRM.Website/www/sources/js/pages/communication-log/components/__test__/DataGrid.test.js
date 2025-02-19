import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    beforeAll(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;    
        document.body.appendChild(appContainer);

        const rowContainer = document.createElement('div');
        rowContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(rowContainer);
    });

    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        const rowContainer = document.getElementById('right-row-container');
        document.body.removeChild(appContainer);
        document.body.removeChild(rowContainer);
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(9);
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {
                gridData: { data: [] },
                gridParams: { pageIndex: 1, pageSize: 100}         
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={9}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const props = {
                gridData: { 
                    data: [{ id: 1, communicationSettings: [{mainCategoryId: 3000, subCategoryId: 4000}], duration: '1 : 0', 
                    groupCategory: [{ mainCategoryId: 3000, subCategoryId:[4000] }]
                }],
                mainCategories:[{ settingId: 3000, childSettings:[{subCategoryId: 4000}] }]
                },
                gridParams: { pageIndex: 1, pageSize: 100}         
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('onSort', () => {
        it.each([
            'asc',
            'desc'
          ])("should call exact function when sortOrder is %s'", (sortOrder) => {
            // arrange
            const props = {
                gridData: { 
                    data: [{ id: 1, communicationSettings: [{mainCategoryId: 3000, subCategoryId: 4000}], duration: '1 : 0',
                    groupCategory: [{ mainCategoryId: 3000, subCategoryId:[4000] }]}],
                    mainCategories:[{ settingId: 3000, childSettings:[{subCategoryId: 4000}] }]
                },
                gridParams: { pageIndex: 1, pageSize: 100},
                setLogsByCustomerId: jest.fn()
            };
            const container = shallow(<DataGrid  {...props}/>).instance();
            
            // Act
            container.onSort('username', sortOrder);

            // Assert
            expect(props.setLogsByCustomerId).toHaveBeenCalled();
        });
    });

    describe('handleEditNoOfInquiry', () => {
        it('should call exactly function when handle edit no of inquiry', () => {
            // Arrange
            const props = {
                setEditNoOfInquiryDialog: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleEditNoOfInquiry(1);

            // Assert
            expect(props.setEditNoOfInquiryDialog).toHaveBeenCalledWith({ show: true, feedbackId: 1 });
        });
    });

    describe('handleEditCommunicationLog', () => {
        it('should call exactly function when handle edit communication log', () => {
            // Arrange
            const props = {
                setEditCommunicationDialog: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleEditCommunicationLog(1);

            // Assert
            expect(props.setEditCommunicationDialog).toHaveBeenCalledWith({ show: true, feedbackId: 1 });
        });
    });

    describe('onPaging', () => {
        it('should call exactly function when onPaging', () => {
            // Arrange
            const props = {
                setGridParams: jest.fn(),
                getLogsByCustomerId: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.onPaging(1,200);

            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getLogsByCustomerId).toHaveBeenCalled();
        });
    });

    describe('renderRow', () => {
        it('should call handleEditFeedback when click FeedbackId', () => {
            // Arrange
            const props = {
                gridData: { 
                    data: [{ id: 1, communicationSettings: [{mainCategoryId: 3000, subCategoryId: 4000}], duration: '1 : 0',
                        groupCategory: [{ mainCategoryId: 3000, subCategoryId:[4000] }]
                    }],
                    mainCategories:[{ settingId: 3000, childSettings:[{subCategoryId: 4000}] }]
                },
                gridParams: { pageIndex: 1, pageSize: 100}         
            };
            const item = {
                feedbackId: 1234, settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2",
                groupCategory: [{ mainCategoryId: 3000, subCategoryId:[4000] }],
                communicationSettings: [{mainCategoryId: 3000, subCategoryId: 4000}], duration: '1 : 0'
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleEditCommunicationLog = jest.fn();

            const row = shallow(container.renderRow(item, 1));

            // Act
            row.find(Cell).at(0).find('span').at(0).simulate('click');

            // Assert
            expect(container.handleEditCommunicationLog).toHaveBeenCalledWith(1234);
            expect(row.find(Cell).length).toBe(9);
        });

        it('should call handleEditNoOfInquiry when click FeedbackId', () => {
            // Arrange
            const props = {
                gridData: { 
                    data: [{ id: 1, communicationSettings: [{mainCategoryId: 3000, subCategoryId: 4000}], duration: '1 : 0',
                        groupCategory: [{ mainCategoryId: 3000, subCategoryId:[4000] }]
                    }],
                    mainCategories:[{ settingId: 3000, childSettings:[{subCategoryId: 4000}] }]
                },
                gridParams: { pageIndex: 1, pageSize: 100}         
            };
            const item = {
                feedbackId: 1234, settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2",
                groupCategory: [{ mainCategoryId: 3000, subCategoryId:[4000] }],
                communicationSettings: [{mainCategoryId: 3000, subCategoryId: 4000}], duration: '1 : 0'
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleEditNoOfInquiry = jest.fn();

            const row = shallow(container.renderRow(item, 1));

            // Act
            row.find(Cell).at(1).find('span').at(0).simulate('click');

            // Assert
            expect(container.handleEditNoOfInquiry).toHaveBeenCalledWith(1234);
        });
    });
});