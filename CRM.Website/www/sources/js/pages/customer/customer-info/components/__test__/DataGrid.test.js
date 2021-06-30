import React from 'react';
import { DataGrid } from '../DataGrid';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Modal } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { Formik } from 'formik';

describe('EditFeedbackSubject', () => {
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
        expect(container).toMatchSnapshot();
    });

    it('render Formik component', () => {
        //Arrange 
        const props = {
            settings: {
                languages: [{ settingId: 1, settingName: 'language'}],
                sites: [],
                countries: []
            },
            gridData: {
                data: {
                    languages: [1, 2],
                    uplineInfo: [],
                    role: {name: 'test'}
                }
            },
            getSettings: jest.fn(() => Promise.resolve({}))
        };

        //Act
        const container = shallow(<DataGrid {...props} />);

        //Assert
        expect(container.find(Formik).length).toBe(1);
    });

    describe('methods', () => {
        describe('ComponentDidMount', () =>{
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

        describe('ComponentDidUpdate', () =>{
            it('ComponentDidUpdate run correctly', () => {
                //Arrange 
                const props = {
                    settings: {
                        languages: [],
                        sites: [],
                        countries: []
                    },
                    gridData: {
                        data: {
                            languages: [1, 2],
                            uplineInfo: [],
                            role: { name: 'test' }
                        }
                    },
                    getSettings: jest.fn(() => Promise.resolve({}))
                };

                const expected = {
                    langagues: []
                }

                // Action
                const container = mount(<DataGrid {...props} />).instance();

                // Assert
                expect(container.state.languages).toEqual(expected.langagues);
            });
        });

        describe('renderForm', () => {
            it('should show response message', () => {
                // Arrange
                const props = {
                    createFeedbackSubjectResult: {
                        isSuccessful: false,
                        message: 'unsuccessful'
                    },
                    getSettings: jest.fn(),
                    
                };
                const formikProps = {
                    values: {
                        languages: [1, 2],
                        uplineInfo: [],
                        role: { name: 'test' }
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
        })

        describe('handleSubmit', () => {
            it('should call exactly functions when edit successful', async () => {
                //Arrange
                const promise = Promise.resolve({});
                const values = {
                    id: 1,
                    userName: '',
                    siteId: 0,
                    countryId: 0,
                    firstName: '',
                    lastName: '',
                    nickName: '', 
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
                    provinceID: 0,
                    site: 0,
                    skype: '',
                    custId: 0,
                    email: '',
                    languageId: ''
                };
                const params = {
                    site: 0,
                    countryId: 0,
                    provinceID: 0,
                    firstName: '',
                    lastName: '',
                    language: '',
                    phone: '',
                    phoneCountryCode:'',
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
                    custId: 0,
                };
                const props = {
                    settings: {
                        languages: [],
                        sites: [],
                        countries: []
                    },
                    editCustomerInfoResult: { isSuccessful: true, message: ''},
                    gridData: {
                        data: {
                            id: 0,
                            provinceID: 0,
                            languages: [1, 2],
                            uplineInfo: [],
                            role: { name: 'test' }
                        }
                    },
                    onSuccess: jest.fn(),
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
                expect(props.onSuccess).toHaveBeenCalled();
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
                        UserName: 'test',
                        IsGuest: false
                    }
                };
                const userName = "test1";
                const expected = {
                    UserName: 'test1',
                    IsGuest: false
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleSearchUplineInfo(userName);
                 
                //Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expected);
                expect(props.getCustomerInfo).toHaveBeenCalledWith(expected);
            });
        });
    });
});