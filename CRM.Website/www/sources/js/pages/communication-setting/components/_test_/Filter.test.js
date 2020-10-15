import React from 'react';
import FilterWrapper, { Filter } from '../Filter';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Form, Button } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: {},
            gridParamsCommunication: {}
        };

        const store = mockStore(initialState);

        // Action
        const wrapper = shallow(<FilterWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.gridParamsCommunication).toEqual(initialState.gridParamsCommunication);
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
        });

        it('component has correct initialState', () => {
            // Arrange
            const initialState = {
                filter: {
                    customerNameInput: '',
                    mainCategoriesTypes: '',
                    subCategoriesTypes: '',
                    isDisableCategorySubCategory: true
                },
                selectedSubCategoryIdsFilter: [],
                mainCategoryOptionsFilter: [],
                subCategoryOptionsFilter: []
            };
            const props = {
                gridParamsCommunication: {},
                settings: {}
            };

            // Action
            const filter = shallow(<Filter {...props} />);

            // Assert
            expect(filter.state()).toEqual(initialState);
        });
    });

    describe('methods', () => {
        describe('componentDidUpdate', () => {
            it('function run correctly', async () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '1',
                        subCategoriesTypes: '2',
                        isDisableCategorySubCategory: true
                    }
                };
                const promise = Promise.resolve({});
                const newProp = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1, name: 'test' }],
                        subCategories: [{ subCategoryId: 2, mainCategoryID: 1, name: 'asd' }]
                    }
                };
                const props = {
                    mainCategoryOptionsFilter: {},
                    subCategoryOptionsFilter: {},
                    settings: {},
                    gridParamsCommunication: {
                        pageIndex: 1,
                        pageSize: 100
                    },
                    setGridParamsCommunication: jest.fn(),
                    getGridCommunicationSetting: jest.fn()
                };
                const params = {
                    username: state.filter.customerNameInput,
                    categoryIds: state.filter.mainCategoriesTypes,
                    subCategoryIds: state.filter.subCategoriesTypes,
                    isDisableCategorySubCategory: state.filter.isDisableCategorySubCategory,
                    pageIndex: props.gridParamsCommunication.pageIndex,
                    pageSize: props.gridParamsCommunication.pageSize
                };
                const mainCategoryOptionsFilter = [{ checked: true, mainCategoryID: 1, name: 'test' }];
                const subCategoryOptionsFilter = [{ checked: true, subCategoryId: 2, name: 'asd' }];

                // Action
                const filter = shallow(<Filter {...props} />);
                filter.setProps(newProp);
                filter.instance().getParams = jest.fn().mockReturnValue(params);

                // Assert
                promise.then(() => {
                    expect(filter.instance().state.mainCategoryOptionsFilter).toEqual(mainCategoryOptionsFilter);
                    expect(filter.instance().state.subCategoryOptionsFilter).toEqual(subCategoryOptionsFilter);
                    expect(filter.instance().state.filter.mainCategoriesTypes).toEqual('1');
                    expect(filter.instance().state.filter.subCategoriesTypes).toEqual('2');
                    expect(props.setGridParamsCommunication).toHaveBeenCalledWith(params);
                    expect(props.getGridCommunicationSetting).toHaveBeenCalledWith({ ...params });
                });
            });
        });

        describe('handle change', () => {
            describe('mainCategoriesChangeFilter', () => {
                it('should calls setState when change catagory', () => {
                    // Arrange
                    const props = {
                        settings: {
                            mainCategories: [{ mainCategoryID: 1 }],
                            subCategories: [{ mainCategoryID: 1, name: 'asd', subCategoryId: 2 }]
                        }
                    };
                    const state = {
                        selectedSubCategoryIdsFilter: []
                    };
                    const promise = Promise.resolve({});

                    // Action
                    const filter = shallow(<Filter {...props} />);
                    filter.instance().mainCategoriesChangeFilter('name', '1');

                    // Assert
                    expect(filter.instance().state.filter.mainCategoriesTypes).toBe('1');
                });

                it('should receive non duplicate subCategoryOptionsFilter', () => {
                    // Arrange
                    const props = {
                        settings: {
                            mainCategories: [
                                { mainCategoryID: 1 },
                                { mainCategoryID: 2 }
                            ],
                            subCategories: [
                                { mainCategoryID: 1, name: 'asd', subCategoryId: 2 },
                                { mainCategoryID: 2, name: 'asd', subCategoryId: 2 }
                            ]
                        }
                    };
                    const state = {
                        selectedSubCategoryIdsFilter: []
                    };
                    const promise = Promise.resolve({});
                    const expectedSubCategoryOptions = [
                        { checked: false, name: 'asd', subCategoryId: 2 }
                    ];

                    // Action
                    const filter = shallow(<Filter {...props} />);
                    filter.instance().setState(state);
                    filter.instance().mainCategoriesChangeFilter('name', '1,2');

                    // Assert
                    promise.then(() => {
                        expect(filter.instance().state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                        expect(filter.instance().state.subCategoryOptionsFilter).toEqual(expectedSubCategoryOptions);
                    });
                });

                it('should receive subCategoryOptionsFilter with no check element', () => {
                    // Arrange
                    const props = {
                        settings: {
                            mainCategories: [{ mainCategoryID: 1 }],
                            subCategories: [{ mainCategoryID: 1, name: 'asd', subCategoryId: 2 }]
                        }
                    };
                    const state = {
                        selectedSubCategoryIdsFilter: []
                    };
                    const promise = Promise.resolve({});
                    const expectedSubCategoryOptions = [
                        { checked: false, name: 'asd', subCategoryId: 2 }
                    ];

                    // Action
                    const filter = shallow(<Filter {...props} />);
                    filter.instance().setState(state);
                    filter.instance().mainCategoriesChangeFilter('name', '1');

                    // Assert
                    promise.then(() => {
                        expect(filter.instance().state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                        expect(filter.instance().state.subCategoryOptionsFilter).toEqual(expectedSubCategoryOptions);
                    });
                });

                it('should receive subCategoryOptionsFilter with checked element', () => {
                    // Arrange
                    const props = {
                        settings: {
                            mainCategories: [{ mainCategoryID: 1 }],
                            subCategories: [
                                { mainCategoryID: 1, name: 'a', subCategoryId: 2 },
                                { mainCategoryID: 1, name: 'b', subCategoryId: 3 },
                                { mainCategoryID: 1, name: 'c', subCategoryId: 4 }
                            ]
                        }
                    };
                    const state = {
                        selectedSubCategoryIdsFilter: '2,3'
                    };
                    const promise = Promise.resolve({});
                    const expectedSubCategoryOptions = [
                        { checked: true, name: 'a', subCategoryId: 2 },
                        { checked: true, name: 'b', subCategoryId: 3 },
                        { checked: false, name: 'c', subCategoryId: 4 }
                    ];
                    // Action
                    const filter = shallow(<Filter {...props} />);
                    filter.instance().setState(state);
                    filter.instance().mainCategoriesChangeFilter('name', '1');

                    // Assert
                    promise.then(() => {
                        expect(filter.instance().state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                        expect(filter.instance().state.subCategoryOptionsFilter).toEqual(expectedSubCategoryOptions);
                    });
                });

                it('should receive empty subCategoryOptionsFilter when no catagory choose', () => {
                    // Arrange
                    const props = {
                        settings: {
                            mainCategories: [{}],
                            subCategories: [{}]
                        }
                    };
                    const state = {
                        selectedSubCategoryIdsFilter: []
                    };
                    const promise = Promise.resolve({});

                    // Action
                    const filter = shallow(<Filter {...props} />).instance();
                    filter.setState(state);
                    filter.mainCategoriesChangeFilter('name', '');

                    // Assert
                    promise.then(() => {
                        expect(filter.state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                        expect(filter.state.subCategoryOptionsFilter).toEqual([]);
                    });
                });
            });

            describe('subCategoriesChangeFilter', () => {
                it('should calls setState when change sub-catagory', () => {
                    // Arrange
                    const props = {
                        gridParamsCommunication: {},
                        settings: {}
                    };

                    const filter = shallow(<Filter {...props} />).instance();

                    // Action
                    filter.subCategoriesChangeFilter('name', 'value');

                    // Assert
                    expect(filter.state.filter.subCategoriesTypes).toBe('value');
                });

                it('should calls setState with data 0 when change sub-catagory', () => {
                    // Arrange
                    const props = {
                        gridParamsCommunication: {},
                        settings: {}
                    };
                    const state = {
                        subCategoryOptionsFilter: [
                            { subCategoryId: '1' },
                            { subCategoryId: '2' }
                        ]
                    };
                    const filter = shallow(<Filter {...props} />).instance();
                    filter.setState(state);

                    // Action
                    filter.subCategoriesChangeFilter('name', '1,2');

                    // Assert
                    expect(filter.state.filter.subCategoriesTypes).toBe('0');
                });
            });

            describe('handlecustomerNameChange', () => {
                it('should calls setState when change customer name', () => {
                    // Arrange
                    const props = {
                        gridParamsCommunication: {},
                        settings: {}
                    };
                    const event = {
                        target: {
                            value: 'test'
                        }
                    };
                    const filter = shallow(<Filter {...props} />);

                    // Action
                    filter.instance().handlecustomerNameChange(event);

                    // Assert
                    expect(filter.instance().state.filter.customerNameInput).toBe(event.target.value);
                });
            });
        });

        describe('getParams', () => {
            it('return expected params', () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '1',
                        subCategoriesTypes: '2',
                        isDisableCategorySubCategory: false
                    }
                };
                const props = {
                    gridParamsCommunication: {
                        pageIndex: 1,
                        pageSize: 100
                    },
                    settings: {
                        mainCategories: [],
                        subCategories: []
                    }
                };
                const expected = {
                    username: state.filter.customerNameInput,
                    categoryIds: state.filter.mainCategoriesTypes,
                    subCategoryIds: state.filter.subCategoriesTypes,
                    isDisableCategorySubCategory: state.filter.isDisableCategorySubCategory,
                    pageIndex: props.gridParamsCommunication.pageIndex,
                    pageSize: props.gridParamsCommunication.pageSize
                };
                const filter = shallow(<Filter {...props} />);
                filter.instance().setState(state);

                // Action
                const result = filter.instance().getParams();

                // Assert
                expect(result).toEqual(expected);
            });

            it('return 0', () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '1',
                        subCategoriesTypes: '2',
                        isDisableCategorySubCategory: false
                    }
                };

                const props = {
                    gridParamsCommunication: {
                        pageIndex: 1,
                        pageSize: 100
                    },
                    settings: {
                        mainCategories: [1],
                        subCategories: [1]
                    }
                };

                const expected = {
                    username: state.filter.customerNameInput,
                    categoryIds: '0',
                    subCategoryIds: '0',
                    isDisableCategorySubCategory: state.filter.isDisableCategorySubCategory,
                    pageIndex: props.gridParamsCommunication.pageIndex,
                    pageSize: props.gridParamsCommunication.pageSize
                };

                const filter = shallow(<Filter {...props} />);
                filter.instance().setState(state);

                // Action
                const result = filter.instance().getParams();

                // Assert
                expect(result).toEqual(expected);
            });
        });
        describe('isDisableCatelogy', () => {
            it('should calls setState when click button disable', () => {
                // Arrange
                const props = {
                    gridParamsCommunication: {},
                    settings: {}
                };
                const state = {
                    filter: {
                        isDisableCategorySubCategory: true
                    }
                };

                // Action
                const filter = shallow(<Filter {...props} />).instance();
                filter.isDisableCatelogy();

                // Assert
                expect(filter.state.filter.isDisableCategorySubCategory).toBe(!state.filter.isDisableCategorySubCategory);
            });
        });

        describe('searchHandler', () => {
            it('should calls exactly functions', () => {
                // Arrange
                const params = { value: 'value' };
                const props = {
                    gridParamsCommunication: {
                        pageIndex: 1,
                        pageSize: 100
                    },
                    setGridParamsCommunication: jest.fn(),
                    getGridCommunicationSetting: jest.fn()
                };
                const event = {
                    preventDefault: jest.fn()
                };
                const filter = shallow(<Filter {...props} />).instance();
                filter.getParams = jest.fn().mockReturnValue(params);

                // Action
                filter.searchHandler(event);

                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(props.setGridParamsCommunication).toHaveBeenCalledWith(params);
                expect(props.getGridCommunicationSetting).toHaveBeenCalledWith({ ...params });
            });
        });

        describe('handleOpenCreatePopup', () => {
            it('should calls exactly functions', () => {
                // Arrange
                const props = {
                    isHost: true,
                    setCreateCommunicationPopup: jest.fn()
                };
                const container = shallow(<Filter {...props} />).instance();

                // Act
                container.handleOpenCreatePopup();

                // Assert
                expect(props.setCreateCommunicationPopup).toHaveBeenCalledWith({ show: true });
            });
        });

        describe('disableElement', () => {
            it('disable search button return true', () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '',
                        subCategoriesTypes: '',
                        isDisableCategorySubCategory: false
                    }
                };

                // Act
                const filter = shallow(<Filter />);
                filter.instance().setState(state);

                // Assert
                expect(filter.find(Form.Group).find(Button).props().disabled).toBe(true);
            });

            it('disable search button return false', () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '',
                        subCategoriesTypes: '',
                        isDisableCategorySubCategory: true
                    }
                };

                // Act
                const filter = shallow(<Filter />);
                filter.instance().setState(state);

                // Assert
                expect(filter.find(Form.Group).find(Button).props().disabled).toBe(false);
            });

            it('disable multipleSelect catagory and sub-catagory return true', () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '',
                        subCategoriesTypes: '',
                        isDisableCategorySubCategory: true
                    }
                };

                // Act
                const filter = shallow(<Filter />);
                filter.instance().setState(state);

                // Assert
                expect(filter.find(Form.Group).at(1).find('div').find(MultipleSelect).props().isDisable).toBe(true);
                expect(filter.find(Form.Group).at(2).find('div').find(MultipleSelect).props().isDisable).toBe(true);
            });

            it('disable multipleSelect sub-category return true with invalid filter', () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '1',
                        subCategoriesTypes: '',
                        isDisableCategorySubCategory: false
                    },
                    subCategoryOptionsFilter: []
                };
                const props = {
                    searchHandler: jest.fn()
                };

                // Act
                const filter = shallow(<Filter {...props} />);
                filter.instance().setState(state);

                // Assert
                expect(filter.find(Form.Group).at(2).find('div').find(MultipleSelect).props().isDisable).toBe(true);
            });

            it('disable multipleSelect sub-category return fasle with valid filter', () => {
                // Arrange
                const state = {
                    filter: {
                        customerNameInput: '',
                        mainCategoriesTypes: '1',
                        subCategoriesTypes: '1',
                        isDisableCategorySubCategory: false
                    },
                    subCategoryOptionsFilter: [{ checked: false, name: 'Compliments', subCategoryId: 2 }]
                };

                // Act
                const filter = shallow(<Filter />);
                filter.instance().setState(state);

                // Assert
                expect(filter.find(Form.Group).at(2).find('div').find(MultipleSelect).props().isDisable).toBe(false);
            });
        });
    });
});