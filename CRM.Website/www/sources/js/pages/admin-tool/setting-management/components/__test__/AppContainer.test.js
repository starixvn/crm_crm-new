import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import NewSettingValue from '../NewSettingValue';
import Edit from '../Edit';
import LicenseeMapping from '../LicenseeMapping';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';

describe('AppContainer', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        isHost: true,
        mainSettings: [{
            childSettings: [{id: 0, name: null, settingId: 68005, settingName: "111111111", settingValue: "TestRuby1"}],
                displayOrder: 0,
                id: 0,
                isActive: true,
                isChild: false,
                mainCategoryID: 0,
                name: null,
                parentID: 0,
                settingId: 0,
                settingName: "111111111",
                settingSource: null,
                settingValue: null,
                subCategoryId: 0
        }],
        gridParams: {
            settingName: '',
            pageIndex: 1,
            pageSize: 100
        },
        editStatusPopup: {
            show: true,
            isActive: true,
            settingValue: 'test'
        },
        insertNewSettingPopup: {
            show: true
        },
        licenseeMappingPopup: {
            show: true
        },
        editPopup: {
            show: true
        },
        getMainSettings: jest.fn(),
        setOpenInsertNewSettingPopup: jest.fn(),
        setInsertNewSettingResult: jest.fn(),
        getSettingTypes: jest.fn(),
        setOpenEdiPopup: jest.fn(),
        setEditNewSettingResult: jest.fn(),
        setOpenLicenseeMappingPopup: jest.fn(),
        setEditLicenseeMappingResult: jest.fn(),
        setConfirmCancelPopup: jest.fn(),
        setEditStatusPopup: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call getMainSettings', () => {
            // Arrange

            //Act
            shallow(<AppContainer {...initProps} />);

            // Assert
            expect(initProps.getMainSettings).toHaveBeenCalled();
        });
    });


    describe('handleCloseInsertNewSetting ', () => {
        it('should call exactly functions when close', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>);
            // Act
            container.instance().handleCloseInsertNewSetting();
           
            // Assert
            expect(initProps.setOpenInsertNewSettingPopup).toHaveBeenCalledWith({ show: false, settingName: '' });
        });
    });

    describe('handleSuccessInsertNewSetting', () => {
        it('should call exactly functions when insert successful', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>);
            container.instance().handleCloseInsertNewSetting = jest.fn();
            container.instance().handleGetSettingType = jest.fn();

            // Act
            container.instance().handleSuccessInsertNewSetting();
            
            // Assert
            expect(initProps.setInsertNewSettingResult).toHaveBeenCalledWith(null);
            expect(container.instance().handleCloseInsertNewSetting).toHaveBeenCalled();
            expect(container.instance().handleGetSettingType).toHaveBeenCalled();
        });
    });

    describe('handleGetSettingType ', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>);

            // Act
            container.instance().handleGetSettingType();
            
            // Assert
            expect(initProps.getSettingTypes).toHaveBeenCalledWith(initProps.gridParams);
        });
    });

    describe('handleCloseEdit', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>);

            // Act
            container.instance().handleCloseEdit();
            
            // Assert
            expect(initProps.setOpenEdiPopup).toHaveBeenCalledWith({ show: false, data: null });
        });
    });

    describe('handleSuccessEdit', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>).instance();
            container.handleCloseEdit = jest.fn();
            container.handleGetSettingType = jest.fn();

            // Act
            container.handleSuccessEdit();
            
            // Assert
            expect(initProps.setEditNewSettingResult).toHaveBeenCalledWith(null);
            expect(container.handleCloseEdit).toHaveBeenCalled();
            expect(container.handleGetSettingType).toHaveBeenCalled();
        });
    });

    describe('handleCloseLicenseeMapping', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>).instance();

            // Act
            container.handleCloseLicenseeMapping();
            
            // Assert
            expect(initProps.setOpenLicenseeMappingPopup).toHaveBeenCalledWith({ show: false});
        });
    });

    describe('handleCloseConfirmLicenseeMapping', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>).instance();

            // Act
            container.handleCloseConfirmLicenseeMapping();
            
            // Assert
            expect(initProps.setConfirmCancelPopup).toHaveBeenCalledWith({ show: false, setting: '', settingId: 0});
        });
    });

    describe('handleEditStatus', () => {
        it('should call exactly functions when edit status is successfully', async () => {
            // Arrange
            const response = {isSuccessful: true};
            const promise = Promise.resolve(response);
            const editStatusSetting = jest.fn(() => promise);
            const props = {...initProps, editStatusSetting};
            toast.success = jest.fn();
            const container = shallow(<AppContainer {...props}/>).instance();
            container.handleCloseEditStatusPopup = jest.fn();
            container.handleGetSettingType = jest.fn();

            // Act
            container.handleEditStatus();
            await promise;
            
            // Assert
            expect(toast.success).toHaveBeenCalledWith(LangHelper.getResource('ActiveStatusSettingSuccess'));
        });

        it('should call exactly functions when edit status is unsuccessfully', async () => {
            // Arrange
            const response = {isSuccessful: false};
            const promise = Promise.resolve(response);
            const editStatusSetting = jest.fn(() => promise);
            const props = {...initProps, editStatusSetting};
            toast.error = jest.fn();
            const container = shallow(<AppContainer {...props}/>).instance();
            container.handleCloseEditStatusPopup = jest.fn();
            container.handleGetSettingType = jest.fn();

            // Act
            container.handleEditStatus();
            await promise;
            
            // Assert
            expect(toast.error).toHaveBeenCalled();
        });
    });

    describe('handleSuccessUpdateLicenseeMapping', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>).instance();

            // Act
            container.handleSuccessUpdateLicenseeMapping();
            
            // Assert
            expect(initProps.setEditLicenseeMappingResult).toHaveBeenCalledWith(null);
        });
    });

    describe('handleCloseEditStatusPopup', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps}/>).instance();

            // Act
            container.handleCloseEditStatusPopup();
            
            // Assert
            expect(initProps.setEditStatusPopup).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer {...initProps} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
            expect(container.find(NewSettingValue).length).toBe(1);
            expect(container.find(Edit).length).toBe(1);
            expect(container.find(LicenseeMapping).length).toBe(1);
            expect(container.find(SweetModalDialog ).length).toBe(1);
        });

        it('should render null', () => {
            // Arrange
            const props = {
                ...initProps,
                mainSettings: null
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });
    });
});