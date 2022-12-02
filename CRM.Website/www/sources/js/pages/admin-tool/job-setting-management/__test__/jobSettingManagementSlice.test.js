import jobSettingManagement, {
    setServiceNameSetting,
    setSettingNames,
    setGridParams,
    setConfigSettings,
    setEditPopup,
    setEditJobSetting
} from '../jobSettingManagementSlice';

describe('jobSettingManagementSlice reducer', () => {
    it('should handle initial state', () => {
        expect(jobSettingManagement(undefined, {})).toEqual({
            serviceNames: null,
            settingNames: null,
            configSettings: null,
            gridParams: {
                envr: 'UAT'
            },
            editPopup: {
                show: false,
                data: null,
                isEditMultiple: false
            },
            editJobSettingResult: null
        });
    });

    it('should handle setSettingNames', () => {
        expect(
            jobSettingManagement({}, {
                type: setSettingNames.type,
                payload: [{0 : "ConfigUAT"}]
            })
        ).toEqual({
            settingNames: [{0 : "ConfigUAT"}]
        });
    });

    it('should handle setServiceNameSetting', () => {
        expect(
            jobSettingManagement({}, {
                type: setServiceNameSetting.type,
                payload: [{0 : "AmendmentNotiFB"}]
            })
        ).toEqual({
            serviceNames: [{0 : "AmendmentNotiFB"}]
        });
    });

    it('should handle setGridParams', () => {
        expect(
            jobSettingManagement({}, {
                type: setGridParams.type,
                payload: { serviceName: '' }
            })
        ).toEqual({
            gridParams: { serviceName: '' }
        });
    });


    it('should handle setConfigSettings', () => {
        expect(
            jobSettingManagement({}, {
                type: setConfigSettings.type,
                payload: [{
                        dataType:"Boolean", id: 436,
                        serviceName: "AmendmentNotiFB",
                        settingName: "ConfigUAT",
                        value : "1"
                }]
            })
        ).toEqual(
            {
                configSettings:[{
                    dataType:"Boolean", id: 436,
                    serviceName: "AmendmentNotiFB",
                    settingName: "ConfigUAT",
                    value : "1"
                }]
            }
        );
    });

    it('should handle setEditPopup', () => {
        expect(
            jobSettingManagement({}, {
                type: setEditPopup.type,
                payload: { show: true }
            })
        ).toEqual({
            editPopup: { show: true }
        });
    });

    it('should handle setEditJobSetting', () => {
        expect(
            jobSettingManagement({}, {
                type: setEditJobSetting.type,
                payload: { isSuccessful: true }
            })
        ).toEqual({
            editJobSettingResult: { isSuccessful: true }
        });
    });
});