import React from 'react';
import  DataGrid  from '../DataGrid';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import MultipleSelect from '@jsroot/components/multiple-select';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

describe('DataGrid', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.resolveClientUrl = jest.fn((url) => url);
        LangHelper.getResource = jest.fn((key) => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;
        const appContainer1 = document.createElement('div');
        appContainer1.setAttribute('id', 'hasReadFeedbackPermission');
        appContainer1.checked = true;
        const appContainer2 = document.createElement('div');
        appContainer2.setAttribute('id', 'hasReadSitePermission');
        appContainer2.checked = false;
        const appContainer3 = document.createElement('div');
        appContainer3.setAttribute('id', 'hasHostPicManagementPermission');
        appContainer3.checked = false;
        const appContainer4 = document.createElement('div');
        appContainer4.setAttribute('id', 'hasReadLicenseePermission');
        appContainer4.checked = false;
        const appContainer5 = document.createElement('div');
        appContainer5.setAttribute('id', 'hasReadCreditPermission');
        appContainer5.checked = false;
        const appContainer6 = document.createElement('div');
        appContainer6.setAttribute('id', 'hasHeadlineInfoPermission');
        appContainer6.checked = true;
        const leftRowContainer = document.createElement('div');
        leftRowContainer.setAttribute('id', 'left-row-container');
        document.body.appendChild(appContainer);
        document.body.appendChild(appContainer1);
        document.body.appendChild(appContainer2);
        document.body.appendChild(appContainer3);
        document.body.appendChild(appContainer4);
        document.body.appendChild(appContainer5);
        document.body.appendChild(leftRowContainer);
        document.body.appendChild(appContainer6);
    });

    afterEach(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        const appContainer1 = document.getElementById('hasReadFeedbackPermission');
        const appContainer2 = document.getElementById('hasReadSitePermission');
        const appContainer3 = document.getElementById('hasHostPicManagementPermission');
        const appContainer4 = document.getElementById('hasReadLicenseePermission');
        const appContainer5 = document.getElementById('hasReadCreditPermission');
        const appContainer6 = document.getElementById('hasHeadlineInfoPermission');
        const leftRowContainer = document.getElementById('left-row-container');

        document.body.removeChild(appContainer);
        document.body.removeChild(appContainer1);
        document.body.removeChild(appContainer2);
        document.body.removeChild(appContainer3);
        document.body.removeChild(appContainer4);
        document.body.removeChild(appContainer5);
        document.body.removeChild(appContainer6);
        document.body.removeChild(leftRowContainer);
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
                container.instance().handleCheckLanguage = jest.fn();
                // Assert
                expect(container.state().languages).toEqual(expected.langagues);
            });
        });

        describe('componentWillUnmount', () => {
            it('should remove event listener on unmount', () => {
                //Arrange
                const props = {
                    settings: {
                        languages:[]
                    },
                    getSettings: jest.fn(() => Promise.resolve({}))
                };
                document.getElementById('left-row-container').removeEventListener = jest.fn();
                const container = shallow(<DataGrid {...props}/>);
                container.instance().handleKeyDownFunc = jest.fn();
                //Act
                container.instance().componentWillUnmount();
                //Assert
                expect(document.getElementById('left-row-container').removeEventListener).toHaveBeenCalled();
            });
        });

        describe('handleKeyDownFunc', () => {
            it('should call exact function when press u', () => {
                //Arrange
                const props = {
                    settings: {
                        languages:[]
                    },
                    getSettings: jest.fn(() => Promise.resolve({}))
                };
                const event = { key: 'u', ctrlKey: true, preventDefault: jest.fn() };
                document.removeEventListener = jest.fn();
                const container = shallow(<DataGrid {...props}/>).instance();
                container.formik = {
                    values: {},
                    setSubmitting: jest.fn()
                };
                container.handleSubmit = jest.fn();
                //Act
                container.handleKeyDownFunc(event);
                //Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(container.handleSubmit).toHaveBeenCalled();
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
                        roleName:'test',
                        otherAccountCommunicationInfos: [],
                        headlineStaffInfoCommunications: []
                    },
                    getSettings: jest.fn(),
                    settings: {
                        languages: [],
                        sitesLicenseeInactive: [],
                        countries:[],
                        sites: []
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
                const container = shallow(<DataGrid {...props} />);
                container.renderCommunicationTool = jest.fn(() => '<div />');

                // Act
                const form = shallow(container.instance().renderForm(formikProps));

                // Assert
                expect(form).toMatchSnapshot();
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
                    countries:[],
                    sites: []
                }, customerInfo: {
                    languages: [1, 2],
                    uplineInfo: [],
                    roleName:'test',
                    otherAccountCommunicationInfos: [],
                    headlineStaffInfoCommunications: []
                },

            };
            const leftRowContainer = document.createElement('div');
            leftRowContainer.setAttribute('id', 'left-row-container');

            const hasCreateFeedbackPermission = document.createElement('div');
            hasCreateFeedbackPermission.setAttribute('id', 'hasCreateFeedbackPermission');
            hasCreateFeedbackPermission.checked = true;

            const hasReadFeedbackPermission = document.createElement('div');
            hasReadFeedbackPermission.setAttribute('id', 'hasReadFeedbackPermission');
            hasReadFeedbackPermission.checked = true;

            const hasReadSitePermission = document.createElement('div');
            hasReadSitePermission.setAttribute('id', 'hasReadSitePermission');
            hasReadSitePermission.checked = true;

            const hasHostPicManagementPermission = document.createElement('div');
            hasHostPicManagementPermission.setAttribute('id', 'hasHostPicManagementPermission');
            hasHostPicManagementPermission.checked = true;

            const hasReadLicenseePermission = document.createElement('div');
            hasReadLicenseePermission.setAttribute('id', 'hasReadLicenseePermission');
            hasReadLicenseePermission.checked = true;

            const hasReadCreditPermission = document.createElement('div');
            hasReadCreditPermission.setAttribute('id', 'hasReadCreditPermission');
            hasReadCreditPermission.checked = true;

            const hasHeadlineInfoPermission = document.createElement('div');
            hasHeadlineInfoPermission.setAttribute('id', 'hasHeadlineInfoPermission');
            hasHeadlineInfoPermission.checked = true;

            document.body.appendChild(leftRowContainer);
            document.body.appendChild(hasCreateFeedbackPermission);
            document.body.appendChild(hasReadFeedbackPermission);
            document.body.appendChild(hasReadSitePermission);
            document.body.appendChild(hasHostPicManagementPermission);
            document.body.appendChild(hasReadLicenseePermission);
            document.body.appendChild(hasReadCreditPermission);
            document.body.appendChild(hasHeadlineInfoPermission);

            const container = shallow(<DataGrid {...props} />);
            const form = shallow(container.instance().renderForm(param));

            it('should call correct function  when change languageId', () => {
                //Act
                form.find(MultipleSelect).at(0).props().onChange();

                //Assert
                expect(param.setFieldValue).toHaveBeenCalled();
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
                        countries:[],
                        sites: []
                    },
                    customerInfo: {
                        languages: [1, 2],
                        uplineInfo: [],
                        roleName:'test',
                        otherAccountCommunicationInfos: [],
                        headlineStaffInfoCommunications: []
                    },
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
                    countryId: null,
                    headlineInfoPolicy: null,
                    isHostOnCurrentCustomer: false,
                    isShowAccInfo: true,
                    isShowCommInfo: true,
                    isShowDetail: true,
                    languages: [],
                    remarksPolicy: null,
                    siteId: 1,
                    picAssignmentPolicy: null
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
            const cases = [['AddFeedback', 0], ['ManageFeedback', 1], ['LatestFeedback', 2], ['Dashboard', 3]];
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
    });
});