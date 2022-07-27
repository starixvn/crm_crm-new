import React from 'react';
import  DataGrid  from '../DataGrid';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import MultipleSelect from '@jsroot/components/multiple-select';
const commonFunction = require('../../common.functions');
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

describe('DataGridCustomerInfo', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.resolveClientUrl = jest.fn((url) => url);
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        //Arrange
        const props = {
            settings: {
                languages:[]
            },
            getSettings: jest.fn(() => Promise.resolve({}))
        };

        // Act
        const container = shallow(<DataGrid {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('render Formik component', () => {
        //Arrange
        const props = {
            settings: {
                languages: [{ settingId: 1, settingName: 'language' }],
                sites: [],
                countries: []
            },
            customerInfo: {
                languages: [1, 2],
                uplineInfo: [],
                roleName:'test'
            },
            getSettings: jest.fn(() => Promise.resolve({}))
        };

        //Act
        const container = shallow(<DataGrid {...props} />);

        //Assert
        expect(container.find(Formik).length).toBe(1);
    });

    describe('methods', () => {
        describe('ComponentDidUpdate', () => {
            it('ComponentDidUpdate run correctly', () => {
                //Arrange
                const props = {
                    settings: {
                        languages: [{ languageId: 1, name: 'name', checked: true }],
                        sites: [],
                        countries: []
                    },
                    customerInfo: {
                        languages: [1, 2],
                        uplineInfo: [],
                        roleName:'test'
                    },
                    getSettings: jest.fn(() => Promise.resolve({}))
                };

                const expected = {
                    langagues: [{ languageId: 1, name: 'name', checked: true }],
                    siteId: 0
                };

                // Act
                const container = shallow(<DataGrid {...props} />);

                // Assert
                expect(container.state().languages).toEqual(expected.langagues);
            });
        });

        describe('renderForm', () => {
            it('should show response message', () => {
                // Arrange
                const props = {
                    editCustomerInfoResult: {
                        isSuccessful: false,
                        message: 'unsuccessful'
                    },
                    customerInfo: {
                        languages: [1, 2],
                        uplineInfo: [],
                        roleName:'test'
                    },
                    getSettings: jest.fn(),
                    settings: {
                        languages: [],
                        sitesLicenseeInactive: [],
                        countries:[]
                    }
                };
                const formikProps = {
                    values: {
                        languages: [1, 2],
                        uplineInfo: [],
                        roleName:'test',
                        site: {}
                    },
                    errors: {},
                    touched: {}
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const form = shallow(container.renderForm(formikProps));

                // Assert
                expect(form).toMatchSnapshot();
            });

            it('should call exacly funtion', () => {
                const props = {
                    editCustomerInfoResult: {
                        isSuccessful: false,
                        message: 'unsuccessful'
                    },
                    customerInfo: {
                        languages: [1, 2],
                        uplineInfo: [],
                        roleName:'test'
                    },
                    getSettings: jest.fn(),
                    settings: {
                        languages: [],
                        sitesLicenseeInactive: [],
                        countries:[]
                    }
                };
                const formikProps = {
                    values: {
                        languages: [1, 2],
                        uplineInfo: [{ username: "tesla", roleName:'test'}],
                        roleName: 'test',
                        site: {}
                    },
                    errors: {},
                    touched: {},
                    handleChange: jest.fn(),
                    handleSubmit: jest.fn(),
                    isSubmitting: jest.fn(),
                    setFieldValue: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />);
                container.instance().handleSearchUplineInfo = jest.fn();

                // Act
                const form = shallow(container.instance().renderForm(formikProps));
                form.find('span').at(0).simulate('click', 'tesla');

                // Assert
                expect(container.instance().handleSearchUplineInfo).toHaveBeenCalledWith('tesla');
            });
        });

        describe('handle onChange MultipleSelect', () => {
            //Arrange
            const param = {
                values: {
                    languages: [1, 2],
                    uplineInfo: [],
                    roleName: 'test',
                    site: {}
                },
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                isSubmitting: jest.fn(),
                setFieldValue: jest.fn()
            };

            const props = {
                getSettings: jest.fn(),
                settings: {
                    languages: [],
                        sitesLicenseeInactive: [],
                        countries:[]
                }

            };

            const container = shallow(<DataGrid {...props} />);
            const form = shallow(container.instance().renderForm(param));

            it('should call correct function  when change languageId', () => {
                //Act
                form.find(MultipleSelect).at(0).props().onChange();

                //Assert
                expect(param.setFieldValue).toHaveBeenCalled();
            });
        });

        describe('validate', () => {
            it('should call correct functions when validate', () => {
                // Arrange
                const props = {
                    customerInfo: {
                        languages: [1, 2],
                        uplineInfo: [],
                        roleName: 'test'
                    },
                    getSettings: jest.fn(),
                    settings: {
                        languages: []
                    }
                };
                const values = {
                    languageId: null
                };
                const container = shallow(<DataGrid {...props} />);
                commonFunction.validateFormik = jest.fn();

                // Act
                container.find(Formik).props().validate(values);

                // Assert
                expect(container.find(Formik).length).toBe(1);
                expect(commonFunction.validateFormik).toHaveBeenCalledTimes(1);
            });
        });

        describe('IsInvalid', () => {
            it('isInvalid Customer Info languageId', () => {
                const param = {
                    values: {
                        languages: [1, 2],
                        uplineInfo: [],
                        roleName: 'test',
                        site: {}
                    },
                    errors: {
                        languageId: 'test'
                    },
                    touched: {
                        notificationTypeName: true
                    },
                    handleChange: jest.fn(),
                    handleSubmit: jest.fn(),
                    isSubmitting: jest.fn(),
                    setFieldValue: jest.fn(),
                    isInvalid: jest.fn()
                };

                const props = {
                    getSettings: jest.fn(),
                    settings: {
                        languages: [],
                        sitesLicenseeInactive: [],
                        countries:[]
                    }
                };

                const container = shallow(<DataGrid {...props} />);

                // Act
                const form = shallow(container.instance().renderForm(param));

                // Assert
                expect(form.find(Form.Control).at(0).props().isInvalid).toEqual(param.errors.notificationTypeName);
            });
        });

        describe('handleChangeSite', () => {
            it('should call setState', () => {
                //Arrange
                const expected = {
                    isShowDetail: true,
                    languages: [],
                    siteId: 1
                };
                const props = {
                    getSettings: jest.fn(),
                    settings: {
                        languages: []
                    }
                };
                const container = shallow(<DataGrid {...props} />);

                //Act
                container.instance().handleChangeSite({ id: 1, name: 'name' });

                //Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('renderDetail', () => {
            it('should call setState', () => {
                //Arrange
                const props = {
                    getSettings: jest.fn(),
                    settings: {
                        languages: []
                    }
                };
                const state = {
                    isShowDetail: false
                };
                const container = shallow(<DataGrid {...props} />);
                container.instance().setState(state);
                //Act
                const detail = shallow(container.instance().renderDetail(false));
                detail.find(Row).at(0).simulate('click');
                //Assert
                expect( container.instance().state.isShowDetail).toEqual(true);
            });

            const cases = [['Detail', 0], ['AddFeedback', 1], ['LatestFeedback', 2], ['ManageFeedback', 3]];
            test.each(cases)(
                "should navigate to %s",
                (firstArg, secondArg) => {
                    const props = {
                        getSettings: jest.fn(),
                        settings: {
                            languages: []
                        },
                        handleNavigate: jest.fn()
                    };
                    const state = {
                        isShowDetail: true
                    };
                    const container = shallow(<DataGrid {...props} />);
                    container.instance().setState(state);
                    //Act
                    const detail = shallow(container.instance().renderDetail(false));
                    detail.find('li').at(secondArg).find('a').simulate('click');
                    //Assert
                    expect(props.handleNavigate).toHaveBeenCalledWith(firstArg);
                }
            );
        });

        describe('handleSubmit', () => {
            it('should call exactly functions when edit successful', async () => {
                const promise = Promise.resolve({data:{ code: 0, isSuccessful: true}});
                const secondParam = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    customerInfo: {
                        provinceId: 0,
                        id: 0,
                        languages: []
                    },
                    handleCloseEditCustomerInfoPopup: jest.fn(),
                    getCustomerInfo: jest.fn(),
                    getSettings: jest.fn(),                    
                    settings: {
                        languages: []
                    }
                };
                DataService.postDataAsync = jest.fn(() => promise);
                const values = {
                    siteId: '',
                    countries: '',
                    languageId: ''
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleSubmit(values, secondParam);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(props.handleCloseEditCustomerInfoPopup).toHaveBeenCalled();
                expect(props.getCustomerInfo).toHaveBeenCalled();
            });

            it('handleSubmit run correctly when submit unsuccess', async () => {
                // Arrange
                const promise = Promise.resolve({data:{ code: 0, isSuccessful: false}});
                const secondParam = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    customerInfo: {
                        provinceId: 0,
                        id: 0,
                        languages: []
                    },
                    handleCloseEditCustomerInfoPopup: jest.fn(),
                    getCustomerInfo: jest.fn(),
                    getSettings: jest.fn(),                    
                    settings: {
                        languages: []
                    }
                };
                DataService.postDataAsync = jest.fn(() => promise);
                const values = {
                    siteId: '',
                    countries: '',
                    languageId: ''
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleSubmit(values, secondParam);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(props.handleCloseEditCustomerInfoPopup).toHaveBeenCalled();
            });
        });

        describe('handleSearchUplineInfo', () => {
            it('handleSearchUplineInfo run correctly', () => {
                //Arrange
                const props = {
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(),
                    getSettings: jest.fn(),
                    setUserName: jest.fn(),
                    gridParams: {
                        username: 'test',
                        isGuest: false
                    },
                    settings: {
                        languages: []
                    }
                };
                const username = "test1";
                const expected = {
                    username: 'test1',
                    isGuest: false
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleSearchUplineInfo(username);

                //Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expected);
                expect(props.getCustomerInfo).toHaveBeenCalledTimes(1);
            });
        });
    });
});