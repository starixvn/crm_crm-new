import React from 'react';
import FilterWrapper, { Filter } from '../Filter';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Form, Button } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import toJson from 'enzyme-to-json';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call exact props get data', async () => {
            //Arrange
            const promise = Promise.resolve(() => {});
            const props = {
                getAllSettings: jest.fn(() => promise)
            }

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
                username: state.filter.customerNameInput,
                categoryIds: state.filter.mainCategoriesTypes,
                subCategoryIds: state.filter.subCategoriesTypes,
                isDisableCategorySubCategory: state.filter.isDisableCategorySubCategory,
                pageIndex: props.gridParamsCommunication.pageIndex,
                pageSize: props.gridParamsCommunication.pageSize
            };
            const mainCategoryOptionsFilter = [{ checked: true, mainCategoryID: 1, name: 'test' }];
            const subCategoryOptionsFilter = [{ checked: true, subCategoryId: 2, name: 'asd' }];
            const 

            // Action
            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
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
})