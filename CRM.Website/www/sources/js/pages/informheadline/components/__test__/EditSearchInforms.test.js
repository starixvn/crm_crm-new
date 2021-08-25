import React from 'react';
import { EditSearchInforms } from '../EditSearchInforms';
import { shallow } from 'enzyme';
import { Formik } from 'formik';
import FilterSearchInforms from '../FilterSearchInforms';
import DataGridEdit from '../DataGridEdit';

describe('EditSearchInforms', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        titleId: 720,
        titleDetail: {
            title: 'test', currencies: '1,2,3',
            sites: '1,2', typeAccount: 3,
            positions: '4,5,6', isVip: 2,
            excludeIgnoredAccounts: true
        },
        allSettings: {
            currencies: [{id: 1, name: 'test'},{id: 2, name: 'test'},{id: 3, name: 'test'},{id: 4, name: 'test'}],
            sites: [{childSites: [{id: 1, name: '123'},{id: 2, name: '123'},{id: 3, name: '123'},{id: 4, name: '123'}]}]
        },
        getTitleDetail: jest.fn(),
        getAllSettings: jest.fn(),
        searchInformSettings:{
            filterStatuses: [{ settingId: 1, settingValue: 'test'}]
        },
        searchInforms: [{headlineId: 720, groupId: 12, username: 'test', remark: '&t'}],
        getSearchInforms: jest.fn(),
        setGridParams: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call functions api', async () => {
            // Arrange
            const props = {...initProps};

            //Act
            const container = shallow(<EditSearchInforms {...props} />);

            // Assert
            expect(await props.getTitleDetail).toHaveBeenCalledWith({titleId: 720});
            expect(await props.getAllSettings).toHaveBeenCalled();
            expect(await props.getSearchInforms).toHaveBeenCalledWith({
                titleId: 720, typeAccount: 3,
                currencies: "1,2,3", levels: "4,5,6",
                sites: "1,2", isVip: 2,
                excludeIgnoredAccounts: true,
                pageIndex: 1, pageSize: 10000
            });
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1,pageSize: 100 });
            expect(container.state().totalSearchInform).toBe(1);
            expect(container.state().includeCurrencies).toBe('1,2,3');
            expect(container.state().includeSites).toBe('1,2');
            expect(container.state().filterData).toEqual({
                currencyId: '1,2,3', 
                isExcludeIgnoredAccounts: true, 
                isHeadline: true, isNoGroup: true, 
                levelId: '4,5,6', siteId: '1,2', 
                submit: true, title: 'test', 
                typeAccount: 3, vipId: 2
            });
        });
    });

    describe('getIncludeInSetting', () => {
        it('should return exactly when get include in setting', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<EditSearchInforms {...props} />);
            const actual = container.instance().getIncludeInSetting(props.titleDetail.currencies,props.allSettings.currencies);
           
            // Assert
            expect(actual).toBe('1,2,3');
        });
    });

    describe('initFormData', () => {
        it('should return exactly when initFormData', () => {
            // Arrange
            const props = {...initProps};
            // Act
            const container = shallow(<EditSearchInforms {...props} />).instance();
            const includeCurrencies = container.getIncludeInSetting(props.titleDetail.currencies, props.allSettings.currencies);
            const includeSites = container.getIncludeInSetting(props.titleDetail.sites, props.allSettings.sites[0].childSites);
            const actual = container.initFormData(includeCurrencies,includeSites);
           
            // Assert
            expect(actual).toEqual({
                currencyId: '1,2,3', 
                isExcludeIgnoredAccounts: true, 
                isHeadline: true, isNoGroup: true, 
                levelId: '4,5,6', siteId: '1,2', 
                submit: true, title: 'test', 
                typeAccount: 3, vipId: 2
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
            const container = shallow(<EditSearchInforms {...props} />);
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
            const container = shallow(<EditSearchInforms {...props} />);
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
            const container = shallow(<EditSearchInforms {...props} />);
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
            const container = shallow(<EditSearchInforms {...props} />);
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
            const container = shallow(<EditSearchInforms {...props} />);
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
            const container = shallow(<EditSearchInforms {...props} />);
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
                currencyId: '1,2,3'
            };

            // Act
            const container = shallow(<EditSearchInforms {...props} />);
            container.setState({filterData: {currencyId: '1,2,3'}});
            const actual = container.instance().getChangeFilter(values);
           
            // Assert
            expect(actual).toBe(true);
        });
    });

    describe('setAlert', () => {
        it('should call exactly functions when save', () => {
            // Arrange
            const props = {
                ...initProps,
                resultUpdateSearchInforms: 'Successfully!'
            };
            jest.useFakeTimers();
            // Act
            const container = shallow(<EditSearchInforms {...props}/>);
            container.instance().setAlert();
           
            // Assert
            expect(container.state().saveResult).toBe('Successfully!');
            expect(setTimeout).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when search', async () => {
            // Arrange
            const props = {...initProps};
            const values = {
                submit: false, isHeadline: true,
                isNoGroup: true, typeAccount: 0,
                currencyId: '1,2,3', levelId: '4,5,6',
                siteId: '1,2', vipId: '2',
                isExcludeIgnoredAccounts: true
            };

            // Act
            const container = shallow(<EditSearchInforms {...props} />);
            container.instance().handleSubmit(values, {setSubmitting: jest.fn()});
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(await props.getSearchInforms).toHaveBeenCalledWith({
                titleId: 720, typeAccount: 3,
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
                updateSearchInforms: jest.fn()
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
            const container = shallow(<EditSearchInforms {...props} />);
            container.setState({
                filterData: {currencyId: '1,2,3'},
                informs: [
                    {headlineId: 720, groupId: 12, username: 'test', remark: '&t'}
                ]
            });
            await container.instance().handleSubmit(values, {setSubmitting: jest.fn()});
           
            // Assert
            expect(await props.updateSearchInforms).toHaveBeenCalledWith({
                titleId: 720, title: 'test',
                changeFilter: true, typeAccount: 3,
                currencies: '1,2,3', levels: '4,5,6',
                sites: '1,2', isVip: 2,
                excludeIgnoredAccounts: true,
                informs: [{headlineId: 720, groupId: 12, username: 'test', remark: '&amp;t'}]
            });
        });
    });

    describe('onPaging', () => {
        it('should call exactly functions when onPaging', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<EditSearchInforms {...props}/>);
            container.instance().onPaging(1,100);
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getSearchInforms).toHaveBeenCalledWith({
                titleId: 720, typeAccount: 3,
                currencies: '', levels: '4,5,6',
                sites: '', isVip: 2,
                excludeIgnoredAccounts: true,
                pageIndex: 1, pageSize: 100
            });
        });
    });

    describe('htmlDecode', () => {
        it('should call exactly functions when submit with remark', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<EditSearchInforms {...props}/>);
            const remark = container.instance().htmlDecode("&test");
           
            // Assert
            expect(remark).toBe("&amp;test");
        });
    });

    describe('handleChangeDataGrid', () => {
        it('should call setState push exactly when handle change', () => {
            // Arrange
            const props = {
                ...initProps,
                updateContactInforms: jest.fn()
            };

            // Act
            const container = shallow(<EditSearchInforms {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.instance().handleChangeDataGrid(mockEvent, 720);
           
            // Assert
            expect(container.state().informs).toEqual([
                { groupId: 12, headlineId: 720, statuses: "Done", username: "test", remark: "&t" }
            ]);
        });
        
        it('should call setState replace exits exactly when handle change', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<EditSearchInforms {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.setState({informs: [{ groupId: 12, headlineId: 720, username: "test" }]})
            container.instance().handleChangeDataGrid(mockEvent, 720);
           
            // Assert
            expect(container.state().informs).toEqual([
                { groupId: 12, headlineId: 720, statuses: "Done", username: "test" }
            ]);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange
            const props = {
                ...initProps, 
                exportSearchInforms: jest.fn()
            };
            const values = {
                submit: true, title: 'test',
                isHeadline: true, isNoGroup: true,
                typeAccount: 0, currencyId: '1,2,3',
                levelId: '4,5,6', siteId: '1,2',
                vipId: '2',
                isExcludeIgnoredAccounts: true
            };
            // Act
            const container = shallow(<EditSearchInforms {...props}/>);
            container.instance().handleExportExcel(values);
           
            // Assert
            expect(props.exportSearchInforms).toHaveBeenCalledWith({ 
                titleId: 720, typeAccount: 3,
                currencies: '1,2,3', levels: '4,5,6',
                sites: '1,2', isVip: 2,
                excludeIgnoredAccounts: true,
                pageIndex: 1, pageSize: 10000
            });
        });
    });

    describe('renderFilterForm', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                exportSearchInforms: jest.fn(),
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
            const container = shallow(<EditSearchInforms {...props} />);
            container.setState({filterData: {currencyId: '1,2,3'}});
            const form = shallow(container.instance().renderFilterForm(param));
            
            // Assert
            expect(container).toMatchSnapshot();
            expect(form.find(FilterSearchInforms).length).toBe(1);
            expect(form.find(DataGridEdit).length).toBe(1);
        });
    });

    describe('render', () => {
        it('should render Formik component', () => {
            // Arrange
            const props = {...initProps };

            // Act
            const container = shallow(<EditSearchInforms {...props}/>);
            container.setState({filterData: {currencyId: '1,2,3'}});
            
            // Assert
            expect(container.find(Formik).length).toBe(1);
        });
    });

    describe('renderExportExcelText', () => {
        it('should call exactly function', () => {
            // Act
            const props = {...initProps};
            const container = shallow(<EditSearchInforms {...props}/>).instance();
            container.handleExportExcel = jest.fn();
            const actual = shallow(container.renderExportExcelText(5));
            actual.find('.icon-excel').at(0).props().onClick();

            // Assert
            expect(actual.find('span').length).toBe(2);
            expect(container.handleExportExcel).toHaveBeenCalledWith(5);
        });
    });
});