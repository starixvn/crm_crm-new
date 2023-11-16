import React from 'react';
import { EditCategoryClassification } from '../EditCategoryClassification';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import CkEditor from '@jsroot/components/ckeditor/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';

describe('EditCategoryClassification', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        selectCategoryClass: {
            mainCategoryID: 1,
            subCategoryID: 1,
            mainCategory: 1,
            subCategory: 1,
            remark: 'test'
        }
    };

    describe('getParams', () => {
        it('should return exactly data when getParams have remark data', () => {
            //Arrange
            const props = {
                ...initProps
            };
            const values = {
                remark: 'test'
            };
            const expected = {
                mainCategoryID: 1,
                subCategoryID: 1,
                remarkNewValue: 'test',
                actionType: 1
            };
            const container = shallow(<EditCategoryClassification {...props}/>).instance();

            //Act
            const actual = container.getParams(values);

            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return exactly data when getParams not have remark data', () => {
            //Arrange
            const props = {
                selectCategoryClass: {
                    mainCategoryID: 1,
                    subCategoryID: 1
                }
            }
            const values = {
                remark: null
            }
            const expected = {
                mainCategoryID: 1,
                subCategoryID: 1,
                remarkNewValue: null,
                actionType: 2
            }
            const container = shallow(<EditCategoryClassification {...props}/>).instance();

            //Act
            const actual = container.getParams(values);

            //Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly function if insert is successfully',async () => {
            // Arrange
            const response = {
                isSuccessful: true
            };
            const promise = Promise.resolve(response);
            const values = {
                remark: 'test'
            };
            const props = {
                ...initProps,
                editCategoryClassResult: { isSuccessful: true },
                editCategoryClass: jest.fn(() => promise),
                onSuccess: jest.fn()
            };
            const setSubmitting = jest.fn();
            const container = shallow(<EditCategoryClassification {...props} />).instance();
            container.getParams = jest.fn();

            //Act
            container.handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.editCategoryClass).toHaveBeenCalled();
            expect(props.onSuccess).toHaveBeenCalled();
        });

        it('should call exactly function if insert is unsuccessfully',async () => {
            // Arrange
            const response = {
                isSuccessful: true
            };
            const promise = Promise.resolve(response);
            const values = {
                remark: 'test'
            };
            const props = {
                ...initProps,
                editCategoryClassResult: { isSuccessful: false },
                editCategoryClass: jest.fn(() => promise)
            };
            const setSubmitting = jest.fn();
            const container = shallow(<EditCategoryClassification {...props} />).instance();
            container.getParams = jest.fn();

            //Act
            container.handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('getInitValues', () => {
        it('should return exactly value when getInitValues', () => {
            //Arrange
            const props = {
                ...initProps
            }
            const expected = {
                remark: 'test'
            };
            const container = shallow(<EditCategoryClassification {...props} />).instance();

            //Act
            const actual = container.getInitValues();

            //Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('renderForm', () => {
        it('should render FormikErrorMessage correctly', () => {
            // Arrange
            const params = {
                values:{},
                errors:{},
                touched:{},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn(),
                isSubmitting: jest.fn()
            };
            const props = {
                ...initProps,
                editCategoryClassResult: {
                    isSuccessful: true,
                    message: ''
                }
            }
            // Act
            const container = shallow(<EditCategoryClassification {...props} />);
            const form = shallow(container.instance().renderForm(params));
  
            // Assert
            expect(form.find(ResponseMessage).length).toBe(1);

            form.find(CkEditor).simulate('change', 'value');
            expect(params.setFieldValue).toHaveBeenCalledWith('remark' , 'value');
        });

    });
});