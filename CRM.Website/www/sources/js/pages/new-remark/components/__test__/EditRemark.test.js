import React from 'react';
import { EditRemark } from '../EditRemark';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';

describe('EditRemark', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
        spy.mockRestore();
    });
    const response = [{picID: 1, username: 'malcokm1_ss'}];
    const promise = Promise.resolve(response);

    const initProps = {
        getAllSettings: jest.fn(),
        getRelatedPics: jest.fn(() => promise),
        gridParams: {pageIndex: 1, pageSize: 100, username: 'test', isGuest: false},
        allSettings: { 
            extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
            relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
            userId: 62585686
        },
        editNewRemarks: jest.fn(),
        customerName: '',
        popupEdit: {
        show: false,
        data: {
            acknowledger: "SUPERTESTPYNG0C00",
            acknowledgerID: 55218930,
            approver: "365onlineINH1130479",
            approverID: 55218469,
            createdDate: "Apr 18, 2022 10:35:19 PM",
            creator: "crmOliver",
            creatorID: 62585684,
            custID: 2084525,
            ext: 2032,
            extStation: "5921",
            handler: "AB88TB01214292",
            handlerID: 52514707,
            headlineID: 0,
            headlineName: null,
            isGroupHeadLine: false,
            lastUpdate: "Apr 18, 2022 11:23:30 PM",
            modifierID: 62585684,
            relatedPICs: "264,302",
            remark: "<p>123</p>\n",
            remarkID: 1504,
            remarkName: "Internal Accounting PIC Instruction",
            remarkTitle: "70005",
            requester: "dsadsa",
            updater: "crmOliver",
            updaterID: 0,
            userName: "ABC"
        },
        isViewHistory: false
        },
        onSuccess: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly functions',async () => {
            // Arrange
            const picOptions = [{
                picID: 1, username: "malcokm1_ss", checked: false
            }];
            // Act
            const container = shallow(<EditRemark {...initProps} />);
            await promise;
            jest.runAllTimers();
            // Assert
            expect(initProps.getAllSettings).toHaveBeenCalled();
            expect(initProps.getRelatedPics).toHaveBeenCalled();
            expect(container.instance().state.relatedPicsOption).toEqual(picOptions);
        });
    });

    describe('handleSubmit', () => {
        it('should setState if no change', async () => {
            // Arrange
            const setSubmitting = jest.fn();
            const response = {isSuccessful: true};
            const promise = Promise.resolve(response);
            const props = {...initProps, editResult: response, editNewRemarks: jest.fn(() => promise)};
            const values = {
                username: 'test',
                remarkContent: 'remarkContent',
                remarkTitle: 0,
                relatedPics: '1,2',
                extStation: '1',
                handledBy: '1',
                approvedBy: '1',
                acknowledgedBy: '1',
                requestedBy: 'requestedBy'
            };
            // Act
            const container = shallow(<EditRemark {...props} />);
            container.instance().isChangedValue = jest.fn(() => false);
            container.instance().handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.instance().isNoChange).tobeTrue;
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });

        it('should call exactly functions when successful', async () => {
            // Arrange
            const setSubmitting = jest.fn();
            const response = {isSuccessful: true};
            const promise = Promise.resolve(response);
            const props = {...initProps, editResult: response, editNewRemarks: jest.fn(() => promise)};
            const values = {
                username: 'test',
                remarkContent: 'remarkContent',
                remarkTitle: 0,
                relatedPics: '1,2',
                extStation: '1',
                handledBy: '1',
                approvedBy: '1',
                acknowledgedBy: '1',
                requestedBy: 'requestedBy'
            };
            // Act
            const container = shallow(<EditRemark {...props} />);
            container.instance().handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(initProps.onSuccess).toHaveBeenCalled();
            expect(setSubmitting).toHaveBeenCalledWith(true);
        });

        it('should call exactly functions when when unsuccessful',async () => {
            // Arrange
            const setSubmitting = jest.fn();
            const response = {isSuccessful: false};
            const promise = Promise.resolve(response);
            const props = {...initProps, editResult: response, editNewRemarks: jest.fn(() => promise)};
            const values = {
                username: 'test',
                remarkContent: 'remarkContent',
                remarkTitle: 0,
                relatedPics: '1,2',
                extStation: '1',
                handledBy: '1',
                approvedBy: '1',
                acknowledgedBy: '1',
                requestedBy: 'requestedBy'
            };
            // Act
            const container = shallow(<EditRemark {...props} />);
            container.instance().handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('validateFormik', () => {
        it('should return exact error when remarkId smaller than zero', () => {
            // Arrange
            const values = {
                remarkTitle: '',
                remarkContent: ''
            };
            const expected = {
                remarkTitle: LangHelper.getResource('RemarkTitleMigrateRequired'),
                remarkContent: LangHelper.getResource('RemarkContentMigrateRequired')
            };
            const props = {
                ...initProps,
                popupEdit:{
                    ...initProps.popupEdit,
                    data: {
                        ...initProps.popupEdit.data,
                        remarkTitle: 0
                    }
                }
            };
            const container = shallow(<EditRemark {...props} />);
            
            // Act
            const actual = container.instance().validateFormik(values);
            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return exact error when remarkId greater than zero', () => {
            // Arrange
            const values = {
                remarkTitle: '',
                remarkContent: ''
            };
            const expected = {
                remarkTitle: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkTitle')),
                remarkContent: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkContent'))
            };
            const container = shallow(<EditRemark {...initProps} />);
            
            // Act
            const actual = container.instance().validateFormik(values);
            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('renderForm', () => {
        it('should render FormikErrorMessage correctly', () => {
            // Arrange
            const formikProps = {
                values: {},
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const container = shallow(<EditRemark {...initProps} />);

            // Act
            const form = shallow(container.instance().renderForm(formikProps));
            
            // Assert
            expect(form.find(FormikErrorMessage).length).toBe(1);
        });

        it('component render correctly message', () => {
            // Arrange
            const formikProps = {
                values: {},
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const props = {...initProps, editResult: {isSuccessful: true}};
            const container = shallow(<EditRemark {...props} />);

            // Act
            const form = shallow(container.instance().renderForm(formikProps));
    
            // Action
            const responseMessage = form.find(ResponseMessage);
    
            // Assert
            expect(responseMessage.props().isSuccessful).toBe(props.editResult.isSuccessful);
            expect(responseMessage.props().message).toBe(LangHelper.getResource('EditNewRemarkSuccessfully'));
        });
    });

    describe('render', () => {
        it('return empty', () => {
            // Arrange
            const props = {
                ...initProps, allSettings : null
            };
            // Act
            const container = shallow(<EditRemark {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});