import React from 'react';
import { shallow } from 'enzyme';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ExcelIcon from '@jsroot/components/ExcelIcon';
import { FilterEditInforms } from '../FilterEditInforms';
import MultipleSelect from '@jsroot/components/multiple-select/index';

describe('FilterEditInforms', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        allSettings: {
            currencies: [{id: 1, name: 'test'},{id: 2, name: 'test'},{id: 3, name: 'test'},{id: 4, name: 'test'}],
            sites: [{childSites: [{id: 1, name: '123'},{id: 2, name: '123'},{id: 3, name: '123'},{id: 4, name: '123'}]}]
        },
        filterData: {values: {currencies: '1,2'}, errors: {}},
        detail: {
            titleId: 125 ,title: 'test', currencies: '1,2,3',
            sites: '1,2', typeAccount: 3,
            positions: '4,5,6', isVip: 2,
            excludeIgnoredAccounts: true
        },
        informData: [{headlineId: 720, groupId: 12, username: 'test', remark: '&t'}],
        includeCurrencies: '1,2,3',
        includeSites: '1,2',
        setFilterData: jest.fn(),
        isNewInform: false
    };

    describe('renderOptions', () => {
        it('should call render exactly when render options', () => {
            // Arrange
            const props = {...initProps};
            const expected = <option value={1}>test</option>;
            // Act
            const container = shallow(<FilterEditInforms {...props}/>);
            const actual = container.instance().renderOptions('test',1,1);
           
            // Assert
            expect(actual.toString()).toBe(expected.toString());
        });
    });

    describe('initFormData', () => {
        it('should return exactly when initFormData', () => {
            // Arrange
            const props = {...initProps};
            // Act
            const container = shallow(<FilterEditInforms {...props} />).instance();
            const actual = container.initFormData(props.includeCurrencies,props.includeSites);
           
            // Assert
            expect(actual).toEqual({
                currencies: '1,2,3', 
                excludeIgnoredAccounts: true, 
                isHeadline: true, isNoGroup: true, 
                levels: '4,5,6', sites: '1,2', 
                title: 'test', typeAccount: 3, isVip: 2
            });
        });
    });

    describe('initNewFormData', () => {
        it('should return exactly when initNewFormData', () => {
            // Arrange
            const props = {
                ...initProps,
                isNewInform: true
            };
            // Act
            const container = shallow(<FilterEditInforms {...props} />).instance();
            const actual = container.initNewFormData();
           
            // Assert
            expect(actual).toEqual({
                title: '', currencies: '',
                levels: '', sites: '',
                isVip: 2, typeAccount: 3,
                isHeadline: true, isNoGroup: true,
                excludeIgnoredAccounts: true
            });
        });
    });

    describe('getErrorValidate', () => {
        it('should return exactly when error with currencies', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                currencies: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().getErrorValidate(values);
           
            // Assert
            expect(actual).toEqual({currencies: "FieldRequired"});
        });

        it('should return exactly when error with levels', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                levels: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().getErrorValidate(values);
           
            // Assert
            expect(actual).toEqual({levels: "FieldRequired"});
        });

        it('should return exactly when error with sites', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                sites: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().getErrorValidate(values);
           
            // Assert
            expect(actual).toEqual({sites: "FieldRequired"});
        });

        it('should return exactly when error with DirectAccount', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                isHeadline: false,
                isNoGroup: false
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().getErrorValidate(values);
           
            // Assert
            expect(actual).toEqual({isHeadline: "FieldRequired"});
        });

        it('should return exactly when error with Title', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                title: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().setState({ isSave: true });
            const actual = container.instance().getErrorValidate(values);
           
            // Assert
            expect(actual).toEqual({title: "FieldRequired"});
        });
    });

    describe('validateFormik', () => {

        it('should return exactly when error with currencies', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                currencies: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({currencies: "FieldRequired"});
        });

        it('should return exactly when error with levels', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                levels: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({levels: "FieldRequired"});
        });

        it('should return exactly when error with sites', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                sites: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({sites: "FieldRequired"});
        });

        it('should return exactly when error with DirectAccount', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                isHeadline: false,
                isNoGroup: false
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({isHeadline: "FieldRequired"});
        });

        it('should call exactly function when validate with edit inform', () => {
            // Arrange
            const props = {
                ...initProps,
                setFilterData: jest.fn()
            };
            const values = {title: ''};

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().validateFormik(values);
           
            // Assert
            expect(props.setFilterData).toHaveBeenCalledWith({
                values: {
                    changeFilter: true,
                    title: '',
                    titleId: 125,
                    typeAccount: 0
                },
                errors: {title: 'err'}
            });
        });

        it('should call exactly function when validate with new inform', () => {
            // Arrange
            const props = {
                ...initProps,
                isNewInform: true,
                setFilterData: jest.fn()
            };
            const values = {title: ''};

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().validateFormik(values);
           
            // Assert
            expect(props.setFilterData).toHaveBeenCalledWith({
                values: {
                    title: '',
                    typeAccount: 0
                },
                errors: {title: 'err'}
            });
        });
    });

    describe('getTypeAccount', () => {
        it('should change value when get type account', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                isHeadline: true,
                isNoGroup: true,
                typeAccount: 0
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().getTypeAccount(values);
           
            // Assert
            expect(values.typeAccount).toBe(3);
        });
    });

    describe('getChangeFilter', () => {
        it('should return exactly when get change filter', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                currencies: '1,2,3'
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.setState({filterData: {currencies: '1,2,3'}});
            const actual = container.instance().getChangeFilter(values);
           
            // Assert
            expect(actual).toBe(true);
        });
    });

    describe('filterParams', () => {
        it('should return exactly when use filter params', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3,
                excludeIgnoredAccounts: true
            };
            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const actual = container.instance().filterParams(values);
           
            // Assert
            expect(actual).toEqual({
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3,
                excludeIgnoredAccounts: true
            });
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly when export excel', () => {
            // Arrange
            const props = {
                ...initProps,
                exportExcel: jest.fn()
            };
            const values = {
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3, title: 'test',
                excludeIgnoredAccounts: true
            };
            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().handleExportExcel(values);
           
            // Assert
            expect(props.exportExcel).toHaveBeenCalledWith({
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3, title: 'test',
                excludeIgnoredAccounts: true, titleId: 125
            });
        });
    });

    describe('handleSearchEdit', () => {
        it('should call exactly functions when search', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { pageIndex: 1, pageSize: 100 },
                setGridParams: jest.fn(),
                setFilterData: jest.fn(),
                setEditedInforms: jest.fn(),
                getEditInforms: jest.fn()
            };
            const values = {
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3,
                isHeadline: true, isNoGroup: true,
                excludeIgnoredAccounts: true, title: 'test'
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().handleSearchEdit(values, {setSubmitting: jest.fn()});
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getEditInforms).toHaveBeenCalledWith({
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3,
                excludeIgnoredAccounts: true,
                titleId: 125
            });
            expect(props.setEditedInforms).toHaveBeenCalledWith([]);
            expect(props.setFilterData).toHaveBeenCalledWith({
                values: {
                    currencies: '1,2,3',
                    levels: '1', sites: '1,2',
                    isVip: 2, typeAccount: 3,
                    excludeIgnoredAccounts: true,
                    titleId: 125, title: 'test',
                    changeFilter: true
                },
                errors: {}
            });
        });
    });

    describe('handleSearchNew', () => {
        it('should call exactly functions when search new', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParams: jest.fn(),
                setFilterData: jest.fn(),
                setEditedInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100 },
                getNewInforms: jest.fn()
            };
            const values = {
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3,
                isHeadline: true, isNoGroup: true,
                excludeIgnoredAccounts: true, title: 'test'
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().handleSearchNew(values, {setSubmitting: jest.fn()});
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getNewInforms).toHaveBeenCalledWith({
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3,
                excludeIgnoredAccounts: true
            });
            expect(props.setEditedInforms).toHaveBeenCalledWith([]);
            expect(props.setFilterData).toHaveBeenCalledWith({
                values: {
                    currencies: '1,2,3',
                    levels: '1', sites: '1,2',
                    isVip: 2, typeAccount: 3,
                    excludeIgnoredAccounts: true,
                    title: 'test'
                },
                errors: {}
            });
        });
    });

    describe('changeFilter', () => {
        it('should return true', () => {
            // Arrange
            const props = { ...initProps };
            const value = {
                isVip: 1,
                typeAccount: 1,
                excludeIgnoredAccounts: false
            };

            // Act
            const container = shallow(<FilterEditInforms {...props}/>);
            const actual = container.instance().changeFilter(value);

            expect(actual).toBe(true);
        });

        it('should return false', () => {
            // Arrange
            const props = { ...initProps };
            const value = {
                isVip: 2,
                typeAccount: 3,
                excludeIgnoredAccounts: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props}/>);
            const actual = container.instance().changeFilter(value);

            expect(actual).toBe(false);
        });
    });

    describe('handleValidate', () => {
        it('should setState exactly', () => {
            // Arrange
            const props = {...initProps };
            const container = shallow(<FilterEditInforms {...props}/>).instance();

            container.formik = {
                handleSubmit: jest.fn()
            };

            //Act
            container.handleValidate();

            //Assert
            expect(container.state.isSave).toBe(true);
            expect(container.formik.handleSubmit).toHaveBeenCalled();
        });
    })

    describe('render', () => {
        it('component map correct innerRef in formik', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const render = shallow(container.instance().render());
            render.find(Formik).props().innerRef({});
        });

        it('should render Formik component', () => {
            // Arrange
            const props = {...initProps };

            // Act
            const container = shallow(<FilterEditInforms {...props}/>);
            
            // Assert
            expect(container.find(Formik).length).toBe(1);
        });
    });

    describe('renderFilterForm', () => {
        const param = {
            values: {
                currencies: '1,2,3',
                levels: '1', sites: '1,2',
                isVip: 2, typeAccount: 3,
                isHeadline: true, isNoGroup: true,
                excludeIgnoredAccounts: true, title: 'test'
            },
            errors: {},
            touched: {},
            handleChange: jest.fn(),
            handleSubmit: jest.fn(),
            setFieldValue: jest.fn()
        };

        it('should render FormikErrorMessage correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const form = shallow(container.instance().renderFilterForm(param));
            
            // Assert
            expect(container).toMatchSnapshot();
            expect(form.find(FormikErrorMessage).length).toBe(1);
        });

        it('should render ExcelIcon correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100},
                //exportExcel: jest.fn()
            };
            const values = {
                levels: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            container.instance().handleExportExcel = jest.fn();
            const form = shallow(container.instance().renderFilterForm(param));
            form.find(ExcelIcon).invoke('handleExportExcel')(values);

            // Assert
            expect(form.find(ExcelIcon).length).toBe(1);
            expect(container.instance().handleExportExcel).toHaveBeenCalled();
        });

        it('should render Form Control correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const form = shallow(container.instance().renderFilterForm(param));
            
            const mockEvent = { target: { name: 'title', value: 'test'}}
            form.find(Form.Control).at(0).simulate('change',mockEvent);
            
        });

        it('should render multiSelect currencies correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const form = shallow(container.instance().renderFilterForm(param));
            
            form.find(MultipleSelect).at(0).simulate('change',currentItem, selectedItemsKey);
            
            // Assert
            expect(param.setFieldValue).toHaveBeenCalledWith('currencies', selectedItemsKey);
        });

        it('should render multiSelect levels correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const form = shallow(container.instance().renderFilterForm(param));
            
            form.find(MultipleSelect).at(1).simulate('change',currentItem, selectedItemsKey);
            
            // Assert
            expect(param.setFieldValue).toHaveBeenCalledWith('levels', selectedItemsKey);
        });

        it('should render multiSelect sites correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const form = shallow(container.instance().renderFilterForm(param));
            
            form.find(MultipleSelect).at(2).simulate('change',currentItem, selectedItemsKey);
            
            // Assert
            expect(param.setFieldValue).toHaveBeenCalledWith('sites', selectedItemsKey);
        });

        it('should render button correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };

            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const form = shallow(container.instance().renderFilterForm(param));
            
            form.find(Button).at(0).simulate('click');
            
            // Assert
            expect(param.setFieldValue).toHaveBeenCalledWith('submit', false);
        });

        it('should render form check correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };
            const mockEvent = { target: { check: false }}
            // Act
            const container = shallow(<FilterEditInforms {...props} />);
            const form = shallow(container.instance().renderFilterForm(param));
            
            form.find(Form.Check).at(0).simulate('change', mockEvent);
            form.find(Form.Check).at(1).simulate('change', mockEvent);
        });
    });
});