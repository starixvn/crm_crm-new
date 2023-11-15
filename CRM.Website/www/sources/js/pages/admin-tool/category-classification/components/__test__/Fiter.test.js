import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import FilterWrapper, { Filter } from '../Filter';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Form, Button } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import toJson from 'enzyme-to-json';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

describe('Filter', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call exact props get data', async () => {
            //Arrange
            const promise = Promise.resolve(() => {});
            const props = {
                getAllSettings: jest.fn(() => promise)
            };

            //Act
            const container = shallow(<Filter {...props}/>);
            container.instance().setState = jest.fn();
            container.instance().getSettings = jest.fn();
            await promise;

            //Assert
            expect(props.getAllSettings).toHaveBeenCalled();
            expect(container.instance().setState).toHaveBeenCalled();
            expect(container.instance().getSettings).toHaveBeenCalled();
        });
    });

    describe('getSettings', () => {
        it('should call exact props get data', async () => {
            //Arrange
            const state = {
                filter: {
                    mainCategoriesTypes: '',
                    subCategoriesTypes: '',
                    remark: ''
                }
            };
            const settings = {
                mainCategories: [{ mainCategoryID: 1, name: 'test' }],
                subCategories: [{ subCategoryId: 2, mainCategoryID: 1, name: 'asd' }]
            }
            const promise = Promise.resolve({});
            const params = {
                categoryIds: state.filter.mainCategoriesTypes,
                subCategoryIds: state.filter.subCategoriesTypes,
                remark: state.filter.remark,
            };
            const mainCategoryOptionsFilter = [{ checked: true, mainCategoryID: 1, name: 'test' }];
            const subCategoryOptionsFilter = [{ checked: true, subCategoryId: 2, name: 'asd' }];
            const props = {
                setGridParams: jest.fn(),
                getGridData: jest.fn()
            };

            // Action
            const container = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            container.instance().getParams = jest.fn().mockReturnValue(params);
            container.instance().getSettings(settings, true);

            // Assert
            promise.then(() => {
                expect(container.instance().state.mainCategoryOptionsFilter).toEqual(mainCategoryOptionsFilter);
                expect(container.instance().state.subCategoryOptionsFilter).toEqual(subCategoryOptionsFilter);
                expect(container.instance().state.filter.mainCategoriesTypes).toEqual('1');
                expect(container.instance().state.filter.subCategoriesTypes).toEqual('2');
                expect(props.setGridParams).toHaveBeenCalledWith(params);
                expect(props.getGridData).toHaveBeenCalledWith({ ...params });
            });
        });
    });

    describe('handleChangeMainCategory', () => {
        it('should calls setState when change catagory', () => {
            // Arrange
            const props = {
                settings: {
                    mainCategories: [{ mainCategoryID: 1 }],
                    subCategories: [{ mainCategoryID: 1, name: 'asd', subCategoryId: 2 }]
                }
            };

            // Action
            const container = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            container.instance().handleChangeMainCategory('name', '1');

            // Assert
            expect(container.instance().state.filter.mainCategoriesTypes).toBe('1');
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
            const container = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            container.instance().handleChangeMainCategory('name', '1,2');

            // Assert
            promise.then(() => {
                expect(container.instance().state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                expect(container.instance().state.subCategoryOptionsFilter).toEqual(expectedSubCategoryOptions);
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
            const container = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            container.instance().handleChangeMainCategory('name', '1');

            // Assert
            promise.then(() => {
                expect(container.instance().state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                expect(container.instance().state.subCategoryOptionsFilter).toEqual(expectedSubCategoryOptions);
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
            const container = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            container.instance().handleChangeMainCategory('name', '1');

            // Assert
            promise.then(() => {
                expect(container.instance().state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                expect(container.instance().state.subCategoryOptionsFilter).toEqual(expectedSubCategoryOptions);
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
            const container = shallow(<Filter {...props} />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.handleChangeMainCategory('name', '');

            // Assert
            promise.then(() => {
                expect(container.state.selectedSubCategoryIdsFilter).toEqual(state.selectedSubCategoryIdsFilter);
                expect(container.state.subCategoryOptionsFilter).toEqual([]);
            });
        });
    });

    describe('handleChangeSubCategory', () => {
        it('should set state exactly', () => {
            // Arrange
            const container = shallow(<Filter />, { disableLifecycleMethods: true }).instance();

            // Action
            container.handleChangeSubCategory('name', 'value');

            // Assert
            expect(container.state.filter.subCategoriesTypes).toBe('value');
            expect(container.state.selectedSubCategoryIdsFilter).toBe('value');
        });
    });

    describe('handleChangeRemark', () => {
        it('should set state exactly', () => {
            // Arrange
            const state = {
                filter: {
                    mainCategoriesTypes: '',
                    subCategoriesTypes: '',
                    remark: ''
                }
            };
            const event = { 
                target: {
                    value: 'value'
                }
            };
            const container = shallow(<Filter />, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            // Action
            container.handleChangeRemark(event);

            // Assert
            expect(container.state.filter.remark).toBe('value');
        });
    });

    describe('getParams', () => {
        it('should set state exactly', () => {
            // Arrange
            const props = {
                gridParams: {
                    pageIndex: 1,
                    pageSize: 100,
                    data: {}
                }
            };
            const state = {
                filter: {
                    mainCategoriesTypes: '1,2,3',
                    subCategoriesTypes: '1,2,3',
                    remark: 'test'
                },
                settings: {
                    subCategories: [
                        {
                            subCategoryId: '1',
                            mainCategoryID: '1'
                        }
                    ]
                }
            };
            const expected = {
                categories: [],
                remark: 'test',
                pageIndex: 1,
                pageSize: 100
            }
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.getCategoryParams = jest.fn();

            // Action
            const actual = container.getParams();

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('isValidParams', () => {
        it('should return exactly err', () => {
            //Arrange
            const state = {
                filter: {
                    mainCategoriesTypes: '',
                    subCategoriesTypes: '',
                    remark: ''
                }
            };
            const expected = {
                isValid: false,
                errResult: ['PleaseChoose Category, SubCategory']
            };
            const container = shallow(<Filter />, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            const actual = container.isValidParams();

            //Assert
            expect(actual).toEqual(expected);
        })
    });

    describe('handleSubmit', () => {
        it('should call exactly props func when isValid', () => {
            //Arrange
            const props = {
                setGridParams: jest.fn(),
                getGridData: jest.fn()
            };
            const event = {
                preventDefault: jest.fn()
            };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.isValidParams = jest.fn(() => ({ isValid: true }));
            container.getParams = jest.fn();

            //Act
            container.handleSubmit(event);

            //Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
        })

        it('should call toast err when not valid', () => {
            //Arrange
            const props = {
                setGridParams: jest.fn(),
                getGridData: jest.fn()
            };
            const event = {
                preventDefault: jest.fn()
            };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.isValidParams = jest.fn(() => ({ isValid: false, errResult: ['Error 1', 'Error 2'] }));
            container.getParams = jest.fn();

            //Act
            container.handleSubmit(event);

            //Assert
            expect(toast.error).toHaveBeenCalledWith('Error 1');
            expect(toast.error).toHaveBeenCalledWith('Error 2');
        })
    });

    describe('render', () => {
        it('should call MultipleSelect exactly', () => {
            //Arrange
            const promise = Promise.resolve(() => {});
            const props = {
                getAllSettings: jest.fn(() => promise)
            };
            const event = {
                target: {
                    value: 'value'
                }
            };

            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true });
            container.instance().handleChangeMainCategory = jest.fn();
            container.instance().handleChangeSubCategory = jest.fn();
            //Act

            //Assert
            expect(container.find(Form.Group).at(0).find(MultipleSelect).length).toBe(1);
            expect(container.find(Form.Group).at(1).find(MultipleSelect).length).toBe(1);
        });
    });
})