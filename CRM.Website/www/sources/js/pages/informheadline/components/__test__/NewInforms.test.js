import React from 'react';
import { NewInforms } from '../NewInforms';
import { shallow } from 'enzyme';
import FilterEditInforms from '../FilterEditInforms';
import DataGridEdit from '../DataGridEdit';

describe('NewInforms', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        allSettings: {
            currencies: [{id: 1, name: 'test'},{id: 2, name: 'test'},{id: 3, name: 'test'},{id: 4, name: 'test'}],
            sites: [{childSites: [{id: 1, name: '123'},{id: 2, name: '123'},{id: 3, name: '123'},{id: 4, name: '123'}]}]
        },
        getAllSettings: jest.fn(),
        getNewInforms: jest.fn(),
        newInforms: [{headlineId: 720, groupId: 12, username: 'test'}],
        gridParams: { pageIndex: 1, pageSize: 100 }
    };

    describe('initFormData', () => {
        it('should return exactly when initFormData', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<NewInforms {...props} />).instance();
            const actual = container.initFormData();
           
            // Assert
            expect(actual).toEqual({
                title: '', currencyId: '',
                levelId: '', siteId: '',
                vipId: 2, typeAccount: 3,
                isHeadline: true, isNoGroup: true,
                isExcludeIgnoredAccounts: true,
                submit: true
            });
        });
    });

    describe('validateFormik', () => {
        it('should return exactly when error with title', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                title: '',
                submit: true,
                isHeadline: true
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({title: "FieldRequired"});
        });

        it('should return exactly when error with currencyId', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                currencyId: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({currencyId: "FieldRequired"});
        });

        it('should return exactly when error with levelId', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                levelId: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({levelId: "FieldRequired"});
        });

        it('should return exactly when error with siteId', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                siteId: '',
                isHeadline: true
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({siteId: "FieldRequired"});
        });

        it('should return exactly when error with DirectAccount', () => {
            // Arrange
            const props = {...initProps};
            const values = {
                isHeadline: false,
                isNoGroup: false
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            const actual = container.instance().validateFormik(values);
           
            // Assert
            expect(actual).toEqual({isHeadline: "FieldRequired"});
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
            const container = shallow(<NewInforms {...props} />);
            container.instance().getTypeAccount(values);
           
            // Assert
            expect(values.typeAccount).toBe(3);
        });
    });

    describe('setAlert', () => {
        it('should call exactly functions when save', () => {
            // Arrange
            const props = {
                ...initProps,
                resultInsertInforms: 'Successfully!',
                getInforms: jest.fn()
            };
            jest.useFakeTimers();
            // Act
            const container = shallow(<NewInforms {...props}/>);
            container.instance().setAlert();
            setTimeout(props.getInforms, 3000);
           
            // Assert
            expect(container.state().saveResult).toBe('Successfully!');
            expect(setTimeout).toHaveBeenCalledTimes(2);
            expect(setTimeout).toHaveBeenLastCalledWith(props.getInforms, 3000);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when search', async () => {
            // Arrange
            const props = {...initProps};
            const values = {
                submit: false,
                title: 'test', isHeadline: true,
                isNoGroup: true, typeAccount: 0,
                currencyId: '1,2,3', levelId: '4,5,6',
                siteId: '1,2', vipId: '2',
                isExcludeIgnoredAccounts: true
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            container.instance().handleSubmit(values, {setSubmitting: jest.fn()});
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({
                title: 'test', typeAccount: 3,
                currencies: '1,2,3', levels: '4,5,6',
                sites: '1,2', isVip: 2,
                excludeIgnoredAccounts: true,
                pageIndex: 1, pageSize: 100 
            });
            expect(await props.getNewInforms).toHaveBeenCalledWith({
                title: 'test', typeAccount: 3,
                currencies: '1,2,3', levels: '4,5,6',
                sites: '1,2', isVip: 2,
                excludeIgnoredAccounts: true,
                pageIndex: 1, pageSize: 10000
            });
        });

        it('should call exactly functions when save', async () => {
            // Arrange
            const props = {
                ...initProps,
                insertInforms: jest.fn()
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            container.setState({
                filterData: {currencyId: '1,2,3'},
                informs: [
                    {headlineId: 720, groupId: 12, username: 'test', remark: '&t'},
                    {headlineId: 722, groupId: 121, username: 'test'},
                ]
            });
            await container.instance().handleSubmit(values, {setSubmitting: jest.fn()});
           
            // Assert
            expect(await props.insertInforms).toHaveBeenCalledWith({
                title: 'test', typeAccount: 3,
                currencies: '1,2,3', levels: '4,5,6',
                sites: '1,2', isVip: 2,
                excludeIgnoredAccounts: true,
                pageIndex: 1, pageSize: 10000,
                informs: [{headlineId: 720, groupId: 12, username: 'test', remark: '&amp;t'}, {headlineId: 722, groupId: 121, username: 'test'}]
            });
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange
            const props = {
                ...initProps, 
                exportNewInforms: jest.fn()
            };
            const values = {
                submit: true, 
                title: 'test', isHeadline: true,
                isNoGroup: true, typeAccount: 0,
                currencyId: '1,2,3', levelId: '4,5,6',
                siteId: '1,2', vipId: '2',
                isExcludeIgnoredAccounts: true
            };
            // Act
            const container = shallow(<NewInforms {...props}/>);
            container.instance().handleExportExcel(values);
           
            // Assert
            expect(props.exportNewInforms).toHaveBeenCalledWith({ 
                title: 'test', typeAccount: 3,
                currencies: '1,2,3', levels: '4,5,6',
                sites: '1,2', isVip: 2,
                excludeIgnoredAccounts: true,
                pageIndex: 1, pageSize: 10000
            });
        });
    });

    describe('onPaging', () => {
        it('should call exactly functions when onPaging', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<NewInforms {...props}/>);
            container.instance().onPaging(1,100);
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getNewInforms).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
        });
    });

    describe('htmlDecode', () => {
        it('should call exactly functions when submit with remark', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<NewInforms {...props}/>);
            const remark = container.instance().htmlDecode("&test");
           
            // Assert
            expect(remark).toBe("&amp;test");
        });
    });

    describe('handleChangeDataGrid', () => {
        it('should call setState push exactly when handle change', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<NewInforms {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.instance().handleChangeDataGrid(mockEvent, 720);
           
            // Assert
            expect(container.state().informs).toEqual([
                { groupId: 12, headlineId: 720, statuses: "Done", username: "test" }
            ]);
        });

        it('should call setState replace exits exactly when handle change', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<NewInforms {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.setState({informs: [{ groupId: 12, headlineId: 720, username: "test" }]})
            container.instance().handleChangeDataGrid(mockEvent, 720);
           
            // Assert
            expect(container.state().informs).toEqual([
                { groupId: 12, headlineId: 720, statuses: "Done", username: "test" }
            ]);
        });
    });

    describe('renderFilterForm', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportNewInforms: jest.fn(),
                gridParams: { pageIndex: 1, pageSize: 100}
            };

            const param = {
                values: {
                    submit: true, title: 'test',
                    isHeadline: true, isNoGroup: true,
                    typeAccount: 0, currencyId: '1,2,3',
                    levelId: '4,5,6', siteId: '1,2',
                    vipId: '2',
                    isExcludeIgnoredAccounts: true
                },
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            container.setState({filterData: {currencyId: '1,2,3'}});
            const form = shallow(container.instance().renderFilterForm(param));
            
            // Assert
            expect(container).toMatchSnapshot();
            expect(form.find(FilterEditInforms).length).toBe(1);
            expect(form.find(DataGridEdit).length).toBe(1);
        });
    });

    describe('render', () => {
        it('should render Formik component', () => {
            // Arrange
            const props = {...initProps };

            // Act
            const container = shallow(<NewInforms {...props}/>);
            container.setState({filterData: {currencyId: '1,2,3'}});
            
            // Assert
            expect(container.find(Formik).length).toBe(1);
        });

        it('should render null when allSettings null', () => {
            // Arrange
            const props = {
                allSettings: null
            };

            // Act
            const container = shallow(<NewInforms {...props}/>);
            
            // Assert
            expect(container).toEqual({});
        });
    });

    describe('renderExportExcelText', () => {
        it('should call exactly function', () => {
            // Act
            const props = {...initProps};
            const container = shallow(<NewInforms {...props}/>).instance();
            container.handleExportExcel = jest.fn();
            const actual = shallow(container.renderExportExcelText(5));
            actual.find('.icon-excel').at(0).props().onClick();

            // Assert
            expect(actual.find('span').length).toBe(2);
            expect(container.handleExportExcel).toHaveBeenCalledWith(5);
        });
    });
});