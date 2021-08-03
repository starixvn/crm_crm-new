import React from 'react';
import FilterWrapper, { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('Filter', () => {
    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: { customerTypes: [{ id: 1, name: 'Text' }] },
            gridParams: { username: "" }
        };

        const store = mockStore(initialState);

        // Act
        const wrapper = shallow(<FilterWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
            expect(wrapper.props().children.props.gridParams).toEqual(initialState.gridParams);
        });
    });

    describe('handleChangeFromDate', () => {
        it('should not update toDate when fromDate is before toDate', () => {
            // Arrange
            const props = {
                settings: {
                    customerTypes: [{ id: 1, name: 'Text' }],
                    mainCategories: [{ mainCategoryID : 0 }],
                    subCategories: [{ mainCategoryID : 0 }],
                    communications: [{ id: 1, name: "test"}],
                    customerResponses: [{ id: 1, name: "test"}]
                }
            };
            const fromDate = '1/8/2021 5:20:25 PM';
            const toDate = '1/8/2021 5:20:26 PM';

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeFromDate(fromDate, toDate);

            // Assert
            expect(container.state().formData.fromDate).toEqual('1/8/2021 5:20:25 PM');
        });

        it('should update toDate when fromDate is before toDate', () => {
            // Arrange
            const props = {
                settings: {
                    customerTypes: [{ id: 1, name: 'Text' }],
                    mainCategories: [{ mainCategoryID : 0 }],
                    subCategories: [{ mainCategoryID : 0 }],
                    communications: [{ id: 1, name: "test"}],
                    customerResponses: [{ id: 1, name: "test"}]
                }
            };
            const fromDate = '1/8/2021 5:20:25 PM';
            const toDate = '1/8/2021 5:20:24 PM';

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '1/8/2021 5:20:25 PM');
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeFromDate(fromDate, toDate);

            // Assert
            expect(container.state().formData.fromDate).toEqual('1/8/2021 5:20:25 PM');
            expect(container.state().formData.toDate).toEqual(new Date('1/8/2021 5:21:25 PM'));
        });
    });

    describe('handleChangeToDate', () => {
        it('should not update fromDate when fromDate is before toDate', () => {
            // Arrange
            const props = {
                settings: {
                    customerTypes: [{ id: 1, name: 'Text' }],
                    mainCategories: [{ mainCategoryID : 0 }],
                    subCategories: [{ mainCategoryID : 0 }],
                    communications: [{ id: 1, name: "test"}],
                    customerResponses: [{ id: 1, name: "test"}]
                }
            };
            const fromDate = '1/8/2021 5:20:25 PM';
            const toDate = '1/8/2021 5:20:26 PM';

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeToDate(fromDate, toDate);

            // Assert
            expect(container.state().formData.toDate).toEqual('1/8/2021 5:20:26 PM');
        });

        it('should update fromDate when fromDate is before toDate', () => {
            // Arrange
            const props = {
                settings: {
                    customerTypes: [{ id: 1, name: 'Text' }],
                    mainCategories: [{ mainCategoryID : 0 }],
                    subCategories: [{ mainCategoryID : 0 }],
                    communications: [{ id: 1, name: "test"}],
                    customerResponses: [{ id: 1, name: "test"}]
                }
            };
            const fromDate = '1/8/2021 5:20:25 PM';
            const toDate = '1/8/2021 5:20:24 PM';

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '1/8/2021 5:20:24 PM');
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeToDate(fromDate, toDate);

            // Assert
            expect(container.state().formData.fromDate).toEqual(new Date('1/8/2021 5:19:24 PM'));
            expect(container.state().formData.toDate).toEqual('1/8/2021 5:20:24 PM');
        });
    });

    describe('handleSubmit', () => {
        it('data is called - should call exactly functions when submit', () => {
            // Arrange
            const props = {
                settings: {
                    customerTypes: [{ id: 1, name: 'Text' }],
                    mainCategories: [{ mainCategoryID : 0 }],
                    subCategories: [{ mainCategoryID : 0 }],
                    communications: [{ id: 1, name: "test"}],
                    customerResponses: [{ id: 1, name: "test"}]
                },
                getGridParams: jest.fn(),
                getDeletedFeedback: jest.fn()
            };
            const expectedParams = {
                username: '',
                isGuest: null,
                fromDate: "Jan 01, 1970",
                toDate: "Jan 01, 1970",
                pageIndex: 1,
                pageSize: 100,
                mainCategoryId: null,
                subCategoryId: null,
                communicationId: 1005,
                responseId: 10002,
                isReviewed: null
            }
            const formEventMocked = { preventDefault: jest.fn() };
            
            //Act
            const container = shallow(<Filter {...props} />);
            container.find("Form").simulate("submit", formEventMocked);

            // Assert
            expect(container.find("Form")).toHaveLength(1);
            expect(formEventMocked.preventDefault).toBeCalledTimes(1);
            expect(props.getGridParams).toHaveBeenCalledWith(expectedParams);
            expect(props.getDeletedFeedback).toHaveBeenCalledWith(expectedParams);
        });
    });

    describe('handleChangeFormData', () => {
        it("setState formData", () => {
            // Arrange
            const props = {
                settings: {
                    customerTypes: [{ id: 1, name: 'Text' }],
                    mainCategories: [{ mainCategoryID : 0 }],
                    subCategories: [{ mainCategoryID : 0 }],
                    communications: [{ id: 1, name: "test"}],
                    customerResponses: [{ id: 1, name: "test"}]
                },
                getGridParams: jest.fn(),
                getDeletedFeedback: jest.fn()
            };
            
            const name = "username"
            const value = "123";
            
            //Act
            const container = shallow(<Filter {...props}/>);
            container.find('FormControl[name="username"]').at(0).simulate("change", { target: { name, value } });

            // Assert
            expect(container.find('FormControl[name="username"]')).toHaveLength(1);
            expect(container.state().formData.username).toBe('123');
        });
    });

    describe('render', () => {
        it('should return null when settings are null', () => {
            // Arrange
            const props = {
                settings: null
            };
            const container = shallow(<Filter {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toBeNull();
        });
    });
});