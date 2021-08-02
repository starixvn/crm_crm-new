import React from 'react';
import DataGridWrapper, { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: { customerTypes: [{ id: 1, name: 'Text' }] },
            gridParams: { username: "" },
            gridData: { username: "" }
        };

        const store = mockStore(initialState);

        // Act
        const wrapper = shallow(<DataGridWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
            expect(wrapper.props().children.props.gridParams).toEqual(initialState.gridParams);
            expect(wrapper.props().children.props.gridData).toEqual(initialState.gridData);
        });
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
                gridData: {
                    totalItems: 1,
                    data: []
                }
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
                    data: [
                        {
                            feedbackId: 1234,settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}], relatedCustomer: "test1,test2"
                        }
                    ],
                    mainCategories: [{settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
                }
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
});