import React from 'react';
import { DataGrid } from '../DataGrid';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import MultipleSelect from '../../../../../components/multiple-select';
const commonFunction = require('../../common.functions');
import toJson from 'enzyme-to-json';


describe('DataGridCustomerInfo', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        //Arrange
        const props = {
            getSettings: jest.fn(() => Promise.resolve({}))
        };

        // Act
        const container = shallow(<DataGrid {...props} />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
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
                role: { name: 'test' }
            },
            getSettings: jest.fn(() => Promise.resolve({}))
        };

        //Act
        const container = shallow(<DataGrid {...props} />);

        //Assert
        expect(container.find(Formik).length).toBe(1);
    });

    describe('methods', () => {
        describe('ComponentDidMount', () => {
            it('ComponentDidMount run correctly', () => {
                //Arrange
                const props = {
                    getSettings: jest.fn(() => Promise.resolve({}))
                };
                // Action
                shallow(<DataGrid {...props} />);

                // Assert
                expect(props.getSettings).toHaveBeenCalled();
            });
        });

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
                        role: { name: 'test' }
                    },
                    getSettings: jest.fn(() => Promise.resolve({}))
                };
                const newProps = {
                    customerInfo: null
                };

                const expected = {
                    langagues: [{ languageId: 1, name: 'name', checked: true }],
                    siteId: 0
                };

                const container = shallow(<DataGrid {...props} />);

                // Act
                container.instance().componentDidUpdate(newProps);

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
                        role: { name: 'test' }
                    },
                    getSettings: jest.fn()
                };
                const formikProps = {
                    values: {
                        languages: [1, 2],
                        uplineInfo: [],
                        role: { name: 'test' },
                        site: {}
                    },
                    errors: {},
                    touched: {}
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const form = shallow(container.renderForm(formikProps));

                // Assert
                expect(toJson(form)).toMatchSnapshot();
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
                        role: { name: 'test' }
                    },

                    getSettings: jest.fn()
                };
                const formikProps = {
                    values: {
                        languages: [1, 2],
                        uplineInfo: [{ username: "tesla", role: { name: 'test' } }],
                        role: { name: 'test' },
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
                form.find('form').find(Row).find(Col).at(1).find('a').simulate('click', 'tesla');

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
                    role: { name: 'test' },
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
                getSettings: jest.fn()
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
                        role: { name: 'test' }
                    },
                    getSettings: jest.fn()
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

        describe('initialValues', () => {
            it('initialValues correctly', () => {
                //Arrange
                const props = {
                    customerInfo: {
                        custId: 0,
                        username: '',
                        siteId: 0,
                        countryId: 0,
                        lastName: '',
                        firstName: '',
                        languages: [1, 2],
                        phoneInfo: '',
                        phoneCountryCode: '',
                        phoneAreaCode: '',
                        phone: '',
                        phone2CountryCode: '',
                        phone2AreaCode: '',
                        phone2: '',
                        phone3CountryCode: '',
                        phone3AreaCode: '',
                        phone3: '',
                        mobilePhoneCountryCode: '',
                        mobilePhoneAreaCode: '',
                        mobilePhone: '',
                        email: '',
                        telegram: '',
                        msn: '',
                        skype: '',
                        pic1Name: '',
                        pic1: '',
                        pic2Name: '',
                        pic2: '',
                        pic3Name: '',
                        pic3: '',
                        pic4Name: '',
                        pic4: '',
                        personalInfoContacts: [],
                        uplineInfo: [],
                        role: { name: 'test' },
                        status: '',
                        originalDangerLevel: 0,
                        abtDangerLevel: 0,
                        otherSportsDangerLevel: 0,
                        site: ''
                    },
                    getSettings: jest.fn()
                };
                const customerInfo = props.customerInfo;
                const values = {
                    custId: customerInfo.custId,
                    username: customerInfo.username || '',
                    siteId: customerInfo.siteId || 0,
                    countryId: customerInfo.countryId || 0,
                    firstName: customerInfo.firstName || '',
                    lastName: customerInfo.lastName || '',
                    nickname: customerInfo.nickname || '',
                    languageId: customerInfo.languages.map(x => x).toString(),
                    phoneInfo: customerInfo.phoneInfo || '',
                    phoneCountryCode: customerInfo.phoneCountryCode || '',
                    phoneAreaCode: customerInfo.phoneAreaCode || '',
                    phone: customerInfo.phone || '',
                    phone2CountryCode: customerInfo.phone2CountryCode || '',
                    phone2AreaCode: customerInfo.phone2AreaCode || '',
                    phone2: customerInfo.phone2 || '',
                    phone3CountryCode: customerInfo.phone3CountryCode || '',
                    phone3AreaCode: customerInfo.phone3AreaCode || '',
                    phone3: customerInfo.phone3 || '',
                    mobilePhoneCountryCode: customerInfo.mobilePhoneCountryCode || '',
                    mobilePhoneAreaCode: customerInfo.mobilePhoneAreaCode || '',
                    mobilePhone: customerInfo.mobilePhone || '',
                    email: customerInfo.email || '',
                    telegram: customerInfo.telegram || '',
                    msn: customerInfo.msn || '',
                    skype: customerInfo.skype || '',
                    pic1Name: customerInfo.pic1Name || '',
                    pic1: customerInfo.pic1 || '',
                    pic2Name: customerInfo.pic2Name || '',
                    pic2: customerInfo.pic2 || '',
                    pic3Name: customerInfo.pic3Name || '',
                    pic3: customerInfo.pic3 || '',
                    pic4Name: customerInfo.pic4Name || '',
                    pic4: customerInfo.pic4 || '',
                    pics: customerInfo.personalInfoContacts || '',
                    role: customerInfo.role,
                    uplineInfo: customerInfo.uplineInfo,
                    status: customerInfo.status,
                    originalDangerLevel: customerInfo.originalDangerLevel,
                    abtDangerLevel: customerInfo.abtDangerLevel,
                    otherSportsDangerLevel: customerInfo.otherSportsDangerLevel,
                    site: customerInfo.site
                };
                const container = shallow(<DataGrid {...props} />);

                //Act
                const form = mount(container.instance().render());

                //Assert
                expect(form.find(Formik).props().initialValues).toEqual(values);
            });
        });

        describe('IsInvalid', () => {
            it('isInvalid Customer Info languageId', () => {
                const param = {
                    values: {
                        languages: [1, 2],
                        uplineInfo: [],
                        role: { name: 'test' },
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
                    getSettings: jest.fn()
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
                    languages: [],
                    siteId: 1
                };
                const props = {
                    getSettings: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />);

                //Act
                container.instance().handleChangeSite({ id: 1, name: 'name' });

                //Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly functions when edit successful', async () => {
                //Arrange
                const promise = Promise.resolve({});
                const values = {
                    id: 1,
                    username: '',
                    siteId: 0,
                    countryId: 0,
                    firstName: '',
                    lastName: '',
                    nickname: '',
                    mobilePhone: '',
                    mobilePhoneAreaCode: '',
                    mobilePhoneCountryCode: '',
                    msn: '',
                    phone: '',
                    phone2: '',
                    phone2AreaCode: '',
                    phone2CountryCode: '',
                    phone3: '',
                    phone3AreaCode: '',
                    phone3CountryCode: '',
                    phoneAreaCode: '',
                    phoneCountryCode: '',
                    pic1: '',
                    pic1Name: '',
                    pic2: '',
                    pic2Name: '',
                    pic3: '',
                    pic3Name: '',
                    pic4: '',
                    pic4Name: '',
                    provinceId: 0,
                    site: 0,
                    skype: '',
                    custId: 0,
                    email: '',
                    languageId: ''
                };
                const params = {
                    site: 0,
                    countryId: 0,
                    provinceId: 0,
                    firstName: '',
                    lastName: '',
                    language: '',
                    phone: '',
                    phoneCountryCode: '',
                    phoneAreaCode: '',
                    phone2CountryCode: '',
                    phone2AreaCode: '',
                    phone2: '',
                    phone3CountryCode: '',
                    phone3AreaCode: '',
                    phone3: '',
                    mobilePhoneCountryCode: '',
                    mobilePhoneAreaCode: '',
                    mobilePhone: '',
                    email: '',
                    msn: '',
                    skype: '',
                    pic1Name: '',
                    pic1: '',
                    pic2Name: '',
                    pic2: '',
                    pic3Name: '',
                    pic3: '',
                    pic4Name: '',
                    pic4: '',
                    custId: 0
                };
                const props = {
                    settings: {
                        languages: [],
                        sites: [],
                        countries: []
                    },
                    editCustomerInfoResult: { isSuccessful: true, message: '' },
                    customerInfo: {
                        id: 0,
                        provinceId: 0,
                        languages: [1, 2],
                        uplineInfo: [],
                        role: { name: 'test' }
                    },
                    setEditCustomerInfoPopup: jest.fn(),
                    editCustomerInfo: jest.fn(() => promise),
                    getSettings: jest.fn()
                };
                const formikBag = {
                    setSubmitting: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleSubmit(values, formikBag);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formikBag.setSubmitting.mock.calls.length).toBe(2);
                expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(true);
                expect(props.editCustomerInfo).toHaveBeenCalledWith(params);
                expect(props.setEditCustomerInfoPopup).toHaveBeenCalled();
            });

            it('handleSubmit run correctly when submit unsuccess', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const secondParam = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    editCustomerInfoResult: { isSuccessful: false, message: '' },
                    customerInfo: {
                        provinceId: 0,
                        id: 0,
                        languages: []
                    },
                    setEditCustomerInfoPopup: jest.fn(),
                    editCustomerInfo: jest.fn(() => promise),
                    getSettings: jest.fn()
                };
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
                expect(secondParam.setSubmitting).toHaveBeenCalledTimes(2);
                expect(props.editCustomerInfo).toHaveBeenCalledTimes(1);
                expect(secondParam.setSubmitting.mock.calls[0][0]).toBe(true);
                expect(secondParam.setSubmitting.mock.calls[1][0]).toBe(false);
            });
        });
        describe('handleSearchUplineInfo', () => {
            it('handleSearchUplineInfo run correctly', () => {
                //Arrange
                const props = {
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(),
                    getSettings: jest.fn(),
                    gridParams: {
                        username: 'test',
                        isGuest: false
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
                expect(props.getCustomerInfo).toHaveBeenCalledWith(expected);
            });
        });
    });
});