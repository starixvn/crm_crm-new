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
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(7);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridData: { totalItems: 1, data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 }              
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={7}>ThereIsNoData</Cell></Row>];
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
                    data: [ {deletedFeedbacks:{feedbackId: 1234,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2" }} ],
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                },
                gridParams: { pageIndex: 1, pageSize: 100 } 
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderCollapseRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([[<div />]]);
        });
    });

    describe('handleEditDeletedFeedback', () => {
        it('should call exactly functions when handle edit', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: false },
                setEditFeedbackDialog: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleEditDeletedFeedback(1);
           
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

    describe('handleOpenViewRelatedCustomerDialog', () => {
        it('should call exactly param', () => {
            // Arrange
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            };
            const relatedCustomers = ["test"];
            const expectedParams = { show: true, relatedCustomers};

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleOpenViewRelatedCustomerDialog(relatedCustomers);

            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith(expectedParams);
        });
    });

    describe('handleCollapseExpend', () => {
        it('should return empty array', () => {
            // Arrange
            const state = {
                toggleHandler: ['sa']
            };
            // Act
            const container = shallow(<DataGrid />).instance();
            container.setState(state);
            container.handleCollapseExpend({ preventDefault: jest.fn()}, 'sa');

            // Assert
            expect(container.state.toggleHandler).toEqual([]);
        });

        it('should add data to array', () => {
            // Arrange
            const state = {
                toggleHandler: ['test1']
            };
            // Act
            const container = shallow(<DataGrid />).instance();
            container.setState(state);
            container.handleCollapseExpend({ preventDefault: jest.fn()}, 'test2');

            // Assert
            expect(container.state.toggleHandler).toEqual(['test1', 'test2']);
        });
    });

    describe('renderCategory', () => {
        it('return empty array', () => {
            // Arrange
            const props = {
                gridData: {
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                }
            };
            const items = {settings: [{settingType: 'Category', settingValue: ''}]};
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleGroupCategory = jest.fn(() => []);

            // Act
            const actual = container.renderCategory(items);

            // Assert
            expect(actual).toEqual([]);
        });

        it('return exact value', () => {
            // Arrange
            const props = {
                gridData: {
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                }
            };
            const items = {settings: [{settingType: 'Category', settingValue: ''}]};
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleGroupCategory = jest.fn(() => [{settingId: 0, subSettingId: [0]}]);

            // Act
            const actual = container.renderCategory(items);
            // Assert
            expect(actual.length).toBe(1);
        });
    });
    
    describe('renderCollapseRow', () => {
        it('return expect value', () => {
            // Arrange
            const state = {
                isCollapse: false
            };
            const item = {
                handler: 'test',
                deletedFeedbacks: [{
                    feedbackId: 1,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2"
                }]
            };
            const container = shallow(<DataGrid />).instance();
            container.setState(state);
            container.renderRow= jest.fn(() => <Cell />);

            // Act
            const row = container.renderCollapseRow(item, 1);

            // Assert
            expect(row.length).toBe(2);
        });
    });

    describe('renderRelatedCustomer', () => {
        it('should call handleOpenViewRelatedCustomerDialog when item greater than 20', () => {
            // Arrange
            const relatedCustomer = ["test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test"];
            const container = shallow(<DataGrid />).instance();

            const expectedRelatedCustomer = "test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test";
            container.handleOpenViewRelatedCustomerDialog = jest.fn();
            const link = shallow(container.renderRelatedCustomer(relatedCustomer));

            // Act
            link.find('a').at(0).props().onClick();

            // Assert
            expect(container.handleOpenViewRelatedCustomerDialog).toHaveBeenCalledWith(expectedRelatedCustomer);
        });

        it('return exact value', () => {
            // Arrange
            const relatedCustomer = ["test","test"];
            const container = shallow(<DataGrid />).instance();

            // Act
            var actual = container.renderRelatedCustomer(relatedCustomer);

            // Assert
            expect(actual).toEqual("test, test");
        });
    });

    describe('renderRow', () => {
        it('should return null', () => {
            // Arrange
            const state = {
                toggleHandler: ['test1']
            };
            const props = {
                gridData: {
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                }
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);

            // Act
            const actual = container.renderRow('test1', {}, 1);

            // Assert
            expect(actual).toBeNull();
        });

        it('should return exact cells', () => {
            // Arrange
            const state = {
                toggleHandler: ['test']
            };
            const item = {
                createDate: new Date(),
                handler: 'handler',
                deletor: 'deletor',
                feedbackId: 1,
                subject: 'subject',
                customer: 'customer',
                relatedCustomer: '1,2,3'
            };
            const props = {
                gridData: {
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                }
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            container.renderCategory = jest.fn(() => "<div></div>" );
            container.renderRelatedCustomer = jest.fn(() => "<div></div>" );

            // Act
            const actual = shallow(container.renderRow('test1', item, 1));

            // Assert
            expect(actual.find(Cell).length).toBe(7);
        });
    });
});