import React, { Component, Fragment } from 'react';
import { shallow } from 'enzyme';
import EditMultipleLogs from '../EditMultipleLogs';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import * as shareScripts from '@jsroot/common/shareScripts';
import { Button, Form } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import CkEditor from '@jsroot/components/ckeditor/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import DatePicker from '@jsroot/components/date-picker/index';


describe('EditMultipleLogs', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);
    const initData = {
        communicationLog:{
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            relatedCustomers: [],
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 1,
            siteId: 1,
            statusId: 1,
            settings:[{
                    feedbackId: 239466,
                    settingId: 1001,
                    settingType: 'Communication',
                    subSettingId: 0,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 2022,
                    settingType: 'Station',
                    subSettingId: 0,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 3020,
                    settingType: 'Category',
                    subSettingId: 4029,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 46000,
                    settingType: 'Product',
                    subSettingId: 8063,
                    subSettingIdLevel3: 9144
                }
            ]
        },
        settings:{
            bettypeNA: {id: 0, name: 'N/A'},
            bettypes: [{id: 3, value: 'N/A', parentId: 2}],
            communicationToolNA: 'null',
            communicationTools:[{id: 0, name: 'N/A'}],
            countries:[{id: 0, name: 'N/A'}],
            extensionNA: {id: 0, value: 'N/A'},
            extensions:[{id: 0, value: 'N/A'}],
            languages: [{languageId: 0, name: 'N/A'}],
            licenseeTypes:[{id: 0, name: 'N/A'}],
            mainCategories: [{mainCategoryID: 0, name: 'N/A'}],
            productNA:{id: 0, value: 'N/A'},
            products: [{id: 0, value: 'N/A'}],
            responses: [{id: 0, value: 'N/A'}],
            roles: [{id: 0, value: 'N/A'}],
            sites: [{id: 0, name: 'N/A', childSites:[{id: 1, value: 'child'}]}],
            statusId: [{id: 0, name: 'N/A'}],
            subCategories: [{subCategoryId: 2, mainCategoryID: 1, name: 'N/A'}],
            subProductNA: {id: 0, value: 'N/A'},
            subProducts: [{id: 2, value: 'N/A', parentId: 1}]
        },
        hasReviewFeedbackPermission: true
    };
    describe('componentDidMount', () => {
        it('should calls setState', async () => {
             // Arrange
            const response = {data: initData};
            const promise = Promise.resolve(response);
            const props = {
                feedbackArr: [{feedbackId: 1}]
            };
            const commSetting = {
                extensionIds: [],
                communicationToolIds: [],
                mainCategoryIds: [1],
                subCategoryIds: [2],
                productIds: [1],
                subProductIds: [2],
                betTypeIds: [3],
                siteInfos: []
            };
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            // Act
            const container = shallow(<EditMultipleLogs {...props} />).instance();
            container.getCommunicationSettings = jest.fn(() => commSetting);
            await promise;
            jest.runAllTimers();

            //Arrange
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('MultipleLogs/GetLogSettingByFeedbackId/1');
            expect(container.state.extensionOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.communicationToolOptions).toEqual([{id: 0, name: 'N/A', checked: false}]);
            expect(container.state.productOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.subProductOptions).toEqual([{id: 2, value: 'N/A', checked: false}]);
            expect(container.state.subCategoryOptions).toEqual([{subCategoryId: 2, name: 'N/A', checked: true}]);
            expect(container.state.mainCategoryOptions).toEqual([{mainCategoryID: 0, name: 'N/A', checked: false}]);
            expect(container.state.betTypeOptions).toEqual([{id: 3, value: 'N/A', checked: true}]);
        });
    }); 

    describe('getCommunicationSettings', () => {
        it('should return expect data', async () => {
             // Arrange
             const container = shallow(<EditMultipleLogs />).instance();
             const expected = {
                extensionIds: [2022],
                communicationToolIds: [1001],
                mainCategoryIds: [3020],
                subCategoryIds: [4029],
                productIds: [46000],
                subProductIds: [8063],
                betTypeIds: [9144],
                siteInfos: [{
                    id: 1,value: 'child'
                }]
             };
            // Act
            const actual = container.getCommunicationSettings(initData.communicationLog, initData.settings);

            //Arrange
            expect(actual).toEqual(expected);
           
        });
    }); 

    describe('onChangeMainCategory', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    mainCategories: [1]
                }
            };
            const values = {subject: 'subject', subCategory: '1,2'};
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');
            shareScripts.getSubCategories = jest.fn(()=> [1]);

            // Act
            container.onChangeMainCategory(setFieldValue, '1,2', 'currentItem', values);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('mainCategoryIds', '1,2');
            expect(setFieldValue).toHaveBeenCalledWith('subject', 'tempSubject');
            expect(container.state.subCategoryOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    mainCategories: [1]
                }
            };
            const setFieldValue = jest.fn();
            const values = {subject: 'subject', subCategory: '1,2'};
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');

            // Act
            container.onChangeMainCategory(setFieldValue, '', 'currentItem', values);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subCategoryIds', '');
            expect(container.state.subCategoryOptions).toEqual([]);
        });
    });

    describe('productHandleChang', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    subProducts: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            container.onChangeProduct(setFieldValue, '1,2', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '1,2');
            expect(container.state.subProductOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    subProducts: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            container.onChangeProduct(setFieldValue, '', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');

            expect(container.state.subProductOptions).toEqual([]);
            expect(container.state.betTypeOptions).toEqual([]);
        });
    });

    describe('onChangeSubProduct', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    bettypes: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            container.onChangeSubProduct (setFieldValue, '1,2', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '1,2');
            expect(container.state.betTypeOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    bettypes: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            container.onChangeSubProduct(setFieldValue, '', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');
            expect(container.state.betTypeOptions).toEqual([]);
        });
    });

    describe('onGetFeedbackSubjectTemplates', () => {
        it('should setState when search text length >= 2', async () => {
            // Arrange
            const searchText = 'search text';
            const response = {data: 'test'};
            const promise = Promise.resolve(response);
            const url = 'Common/GetFeedbackSubjectTemplate';
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            container.onGetFeedbackSubjectTemplates(searchText);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('Common/GetFeedbackSubjectTemplate');
            expect(container.state.feedbackSubjectTemplates).toEqual([]);

        });

        it('should setState when search text length < 2', async () => {
            // Arrange
            const searchText = 't';
            const response = {data: 'test'};
            const promise = Promise.resolve(response);
            const url = 'Common/GetFeedbackSubjectTemplate';
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            container.onGetFeedbackSubjectTemplates(searchText);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.feedbackSubjectTemplates).toEqual([]);

        });
    });

    describe('handleCheckAll', () => {
        it('should call exact functions', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const event = { 
                target: {checked: true}
            };
             
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            container.handleCheckAll({test: false}, setFieldValue, event);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('isCheck.test', true);
        });
    });

    describe('getExtensionParams', () => {
        it('should return expected data when selected has data', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            const actual = container.getExtensionParams('1,2');

            // Assert
            expect(actual).toEqual('1,2');
        });

        it('should return expected data when selected no data', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            const actual = container.getExtensionParams('', {id:1});

            // Assert
            expect(actual).toEqual('1');
        });
    });

    describe('handleSubmit', () => {
        it('should call exact function', () => {
            // Arrange
            const setSubmitting = jest.fn();
            const values = {
                siteInfo: {id: 1},
                productIds: [],
                subProductIds: [],
                betTypeIds: [],
                mainCategoryIds: '1',
                subCategoryIds: '1',
                isCheck: {
                    checkAll: false,
                    startTime: false,
                    endTime: false,
                    ext: false,
                    response: false,
                    communication: false,
                    language: false,
                    mainCategory: false,
                    subCategory: false,
                    product: false,
                    subProduct: false,
                    status: false,
                    betType: false,
                    role: false,
                    site: false,
                    country: false,
                    licensee: false,
                    inquiry: false,
                    subject: false,
                    autoGenerated: false,
                    remark: false,
                    description: false,
                    solution: false,
                    reviewed: false
                }
            };
            const state = {
                feedbackArr: [1,2],
                settings: initData.settings
            };
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            container.getExtensionParams = jest.fn(() => 'test');
            container.confirmEditMultipleLogs = jest.fn();
            // Act
            container.handleSubmit (values, {setSubmitting});

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(container.confirmEditMultipleLogs).toHaveBeenCalled();
        });
    });

    describe('reviewMode', () => {
        it('should return expected if do not have permission', () => {
            // Arrange
            const state = {
                hasReviewFeedbackPermission: false
            };
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);

            // Act
            const actual = container.reviewMode();

            // Assert
            expect(actual).toEqual(0);
        });

        it('should return expected if do have permission and  isReviewed is false', () => {
            // Arrange
            const state = {
                hasReviewFeedbackPermission: true
            };
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);

            // Act
            const actual = container.reviewMode({isReviewed: false});

            // Assert
            expect(actual).toEqual(2);
        });

        it('should return expected if do have permission and  isReviewed is false and not equal review', () => {
            // Arrange
            const state = {
                hasReviewFeedbackPermission: true
            };
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            container.formikValues = jest.fn().mockReturnValue({review: 'test'});

            // Act
            const actual = container.reviewMode({isReviewed: true, review: ''});

            // Assert
            expect(actual).toEqual(1);
        });
    });

    describe('confirmEditMultipleLogs', () => {
        it('should call setState', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            container.confirmEditMultipleLogs('1,2');

            // Assert
            expect(container.state.confirmEditMultipleLogsDialog).toEqual({show: true, params:'1,2'});
        });
    });

    describe('handleCloseConfirmEditMultipleLogsDialog', () => {
        it('should call setState and setSubmitting', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />).instance();
            container.formik = { setSubmitting: jest.fn() };

            // Act
            container.handleCloseConfirmEditMultipleLogsDialog();

            // Assert
            expect(container.state.confirmEditMultipleLogsDialog).toEqual({show: false});
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleEditMultipleLogs', () => {
        it('should call exact function if data is successful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const response = {data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs {...props}/>).instance();
            
            // Act
            container.handleEditMultipleLogs();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.editResult).toEqual({isSuccessful: true});
            expect(props.onClose).toHaveBeenCalledWith(true);
        });
    });

    describe('handleConfirmEditMultipleLogs', () => {
        it('should call exact function', () => {
            // Arrange
            const state = {
                confirmEditMultipleLogsDialog: { show: false, params:'test'}
            };
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            container.handleEditMultipleLogs = jest.fn();
            // Act
            container.handleConfirmEditMultipleLogs();

            // Assert
            expect(container.state.confirmEditMultipleLogsDialog).toEqual({show: false});
            expect(container.handleEditMultipleLogs).toHaveBeenCalledWith('test');
        });

        it('should call exact function if data is unsuccessful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const response = {data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            
            // Act
            container.handleEditMultipleLogs();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('render', () => {
        describe('renderAutoGenerated ', () => {
            it('handleChange should call exact function', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />).instance();
                const event = { 
                    target: {checked: true}
                }; 
                const params = {
                    values: {
                        isCheck:{
                            autoGenerated: false,
                            description: false
                        }
                    },
                    handleChange: jest.fn(),
                    setFieldValue: jest.fn()
                };
                // Act
                const renderEdit = shallow(container.renderAutoGenerated(params.values, params.handleChange, params.setFieldValue));
                renderEdit.find('input').simulate('change', event);

                // Assert
                expect(params.setFieldValue).toHaveBeenCalled();
            });
        });

        describe('renderDescription', () => {
            it('handleChange should call exact function', () => {
                // Arrange
                const values = {
                    autoGenerated: '',
                    description: '',
                    isCheck:{
                        autoGenerated : true,
                        description: false
                    }
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderDescription(values, touched, errors, setFieldValue));
                renderEdit.find(CkEditor).simulate('change', 'value');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('description' , 'value');
            });

            it('invalid description correctly', () => {
                // Arrange
    
                const values = {
                    autoGenerated: '',
                    description: '',
                    isCheck:{
                        autoGenerated : true,
                        description: false
                    }
                };
                const setFieldValue = jest.fn();
                const errors = {
                    description: 'description'
                };
    
                const touched = {
                    description: 'description'
                };
    
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderDescription(values, touched, errors, setFieldValue));

                // Assert
                expect(renderEdit.find(CkEditor).props().isInvalid).toEqual(errors.description);
            });
        });

        describe('renderSolution', () => {
            it('handleChange checkbox should call exact function', () => {
                // Arrange
                const values = {
                    autoGenerated: '',
                    description: '',
                    isCheck:{
                        solution : false
                    }
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderSolution(values, touched, errors, setFieldValue));
                renderEdit.find('input').simulate('change', {target:{checked: true}});

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('isCheck.solution' , true);
            });

            it('handleChange solution should call exact function', () => {
                // Arrange
                const values = {
                    autoGenerated: '',
                    description: '',
                    isCheck:{
                        solution : true
                    }
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderSolution(values, touched, errors, setFieldValue));
                renderEdit.find(CkEditor).simulate('change', 'value');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('solution' , 'value');
            });


            it('invalid solution correctly', () => {
                // Arrange
    
                const values = {
                    autoGenerated: '',
                    description: '',
                    isCheck:{
                        solution : true
                    }
                };
                const setFieldValue = jest.fn();
                const errors = {
                    solution: 'solution'
                };
    
                const touched = {
                    solution: 'solution'
                };
    
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderSolution(values, touched, errors, setFieldValue));

                // Assert
                expect(renderEdit.find(CkEditor).props().isInvalid).toEqual(errors.solution);
            });
        });

        describe('renderReview ', () => {
            it('handleChange checkbox should call exact function', () => {
                // Arrange
                const values = {
                    reviewed: true,
                    isCheck:{
                        reviewed : true
                    },
                    reviewerName: 'review'
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderReview(values, touched, errors, setFieldValue));
                renderEdit.find('input').simulate('change', {target: {checked: true}});

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('isCheck.reviewed' , true);
            });

            it('handleChange value should call exact function', () => {
                // Arrange
                const values = {
                    reviewed: true,
                    isCheck:{
                        reviewed : true
                    },
                    reviewerName: 'review'
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderReview(values, touched, errors, setFieldValue));
                renderEdit.find(CkEditor).simulate('change', 'review');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('review' , 'review');
            });

            it('invalid description correctly', () => {
                // Arrange
                const values = {
                    reviewed: true,
                    isCheck:{
                        reviewed : true
                    },
                    reviewerName: 'review'
                };
                const setFieldValue = jest.fn();
                const errors = {
                    review: 'review'
                };
    
                const touched = {
                    review: 'review'
                };
    
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                const renderEdit = shallow(container.renderReview(values, touched, errors, setFieldValue));

                // Assert
                expect(renderEdit.find(CkEditor).props().isInvalid).toEqual(errors.review);
            });
        });

        describe('renderDropdownDetail  ', () => {
            const state = {
                settings: {
                    statuses: [{ statusId: 1, name: 'status'}],
                    roles: [{ id: 1, value: 'role'}]
                },
                mainCategoryOptions: [],
                subCategoryOptions: [],
                productOptions: [],
                subProductOptions: [],
                betTypeOptions: [],
                sitesOptions: []
            };

            const params = {
                values: {
                    siteInfo: {id: 1, name:'test'},
                    isCheck: {
                    checkAll: false,
                    startTime: false,
                    endTime: false,
                    ext: false,
                    response: false,
                    communication: false,
                    language: false,
                    mainCategory: false,
                    subCategory: false,
                    product: false,
                    subProduct: false,
                    status: false,
                    betType: false,
                    role: false,
                    site: false,
                    country: false,
                    licensee: false,
                    inquiry: false,
                    subject: false,
                    autoGenerated: false,
                    remark: false,
                    description: false,
                    solution: false,
                    reviewed: false
                    }
                },
                errors: {
                },
                touched: {
                },
                handleChange: jest.fn(),
                setFieldValue: jest.fn()
            };

            it('should handle onChange mainCategory call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(container.onChangeMainCategory).toHaveBeenCalled();
            });

            it('should handle onChange checkbox mainCategory call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(0).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('invalid mainCategoryIds correctly', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                values.errors = {mainCategoryIds: 'mainCategoryIds'};
                values.touched = {mainCategoryIds: 'mainCategoryIds'}
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
               
                // Assert
                expect(renderEdit.find(MultipleSelect).at(0).props().isInvalid).toEqual(errors.mainCategoryIds);
            });

            it('should handle onChange subCategory call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('invalid subCategory correctly', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                values.errors = {subCategoryIds: 'subCategoryIds'};
                values.touched = {subCategoryIds: 'subCategoryIds'}
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
               
                // Assert
                expect(renderEdit.find(MultipleSelect).at(1).props().isInvalid).toEqual(errors.subCategoryIds);
            });

            it('should handle onChange product call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.onChangeProduct = jest.fn();

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(2).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(container.onChangeProduct ).toHaveBeenCalled();
            });

            it('should handle onChange checkbox product call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(2).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange subProduct call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.onChangeSubProduct = jest.fn();

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(container.onChangeSubProduct ).toHaveBeenCalled();
            });

            it('should handle onChange checkbox subProduct call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(3).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox status call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(4).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange betType call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox betType call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(5).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox role call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(6).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange site call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(SelectWithSearch).simulate('change', 'value');
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox site call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(7).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

        });

        describe('renderSelectOptions  ', () => {
            const state = {
                settings:{
                    countries: [{
                        id: 1, name: 'test'
                    }],
                    licenseeTypes:[{
                        id: 1, name: 'test'
                    }]
                }
            };
            const values = {
                countryId: 0,
                licenseeId: 0,
                isCheck: {
                    country: false,
                    licensee: false
                }
            };
            const handleChange = jest.fn();
            const setFieldValue = jest.fn();

            it('should handle onChange country call exact function', () => {
                // Arrange
                
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderSelectOptions(values, handleChange, setFieldValue));
                renderEdit.find(Form.Control).at(0).simulate('change', 'value');
                
                // Assert
                expect(handleChange).toHaveBeenCalled();
            });
    
            it('should handle onChange checkbox country call exact function', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderSelectOptions(values, handleChange, setFieldValue));
                renderEdit.find('input').at(0).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange licensee call exact function', () => {
                // Arrange
                
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderSelectOptions(values, handleChange, setFieldValue));
                renderEdit.find(Form.Control).at(1).simulate('change', 'value');
                
                // Assert
                expect(handleChange).toHaveBeenCalled();
            });
    
            it('should handle onChange licensee country call exact function', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderSelectOptions(values, handleChange, setFieldValue));
                renderEdit.find('input').at(1).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });
        });

        describe('isDisabledField', () => {
            it('should return expected data', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />).instance();

                // Act
                var actual = container.isDisabledField(true);

                //Arrange
                expect(actual).toEqual('');
            });
        });

        describe('renderMultipleLogs', () => {
            const state = {
                settings: {
                    languages: [{ languageId: 1, name: 'status'}],
                    responses: [{ id: 1, value: 'role'}]
                },
                extensionOptions: [],
                communicationToolOptions: [],
                 feedbackSubjectTemplates: []
            };

            const params = {
                values: {
                    siteInfo: {id: 1, name:'test'},
                    isCheck: {
                        checkAll: false,
                        startTime: false,
                        endTime: false,
                        ext: false,
                        response: false
                    }
                },
                errors: {
                },
                touched: {
                },
                handleChange: jest.fn(),
                setFieldValue: jest.fn()
            };

            it('should handle onChange checkbox all call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find('input').at(0).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleCheckAll).toHaveBeenCalled();
            });

            it('should handle onChange startTime call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find(DatePicker).at(0).simulate('change', 'value');
                
                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('startTime', 'value');
            });

            it('should handle onChange checkbox startTime call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find('input').at(1).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('isCheck.startTime', true);
            });

            it('should handle onChange extension call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
                
                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('extensionIds', 'selectedItemsKey');
            });

            it('should handle onChange checkbox extension call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find('input').at(2).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('isCheck.ext', true);
            });

            it('should handle onChange endTime call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find(DatePicker).at(1).simulate('change', 'value');
                
                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('endTime', 'value');
            });

            it('should handle onChange checkbox endTime call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find('input').at(3).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('isCheck.endTime', true);
            });

            it('should handle onChange response call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find(Form.Control).at(1).simulate('change', 'value');
                
                // Assert
                expect(handleChange).toHaveBeenCalled();
            });

            it('should handle onChange checkbox endTime call exact function', () => {
                // Arrange
                const {errors, values, handleChange, touched, setFieldValue} = params;
                const container = shallow(<EditMultipleLogs />).instance();
                container.setState(state);
                container.handleCheckAll = jest.fn();
                container.renderDropdownDetail = jest.fn(() => 'div');
                container.renderSelectOptions = jest.fn(() => 'div');
                container.renderAutoGenerated = jest.fn(() => 'div');
                container.renderDescription = jest.fn(() => 'div');
                container.renderSolution = jest.fn(() => 'div');
                container.renderReview = jest.fn(() => 'div');

                // Act
                var editRender = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                editRender.find('input').at(4).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('isCheck.response', true);
            });
        });
    });
}); 