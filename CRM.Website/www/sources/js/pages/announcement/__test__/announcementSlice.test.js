import announcement, {
    resetState,
    setGridParams,
    setGridData,
    setCreateAnnouncement,
    setEditAnnouncement,
    setAnnouncementTemplate,
    setSelectedTemplate,
    setLanguages,
    setSettings,
    setOpenNewAnnouncementPopup,
    setOpenActionAnnouncementPopup,
    setOpenCancelAnnouncementPopup,
    setContentPopup,
    setViewDetailPopup,
    setAutoRefresh,
    setIsRefresh
} from '../announcementSlice';

import { AUTO_REFRESH_TIMES } from '@jsroot/common/constants';
import DateTimeService from '@jsroot/common/dateTimeService';
import {Statuses} from '@jsroot/common/constants';
const currentDate = new Date();
const fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 7);


describe('announcementSlice reducer', () => {
    const initialState = {
        gridParams: {
            announcementId: '',
            fromDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(fromDate)),
            toDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(currentDate)),
            title: '',
            status: Statuses.map(x=> x.name).join(','),
            pageIndex: 1,
            pageSize: 100
        },
        gridData: null,
        createAnnouncementResult: null,
        editAnnouncementResult: null,
        announcementTemplate: null,
        settings: null,
        newAnnouncementPopup: { show: false },
        actionAnnouncementPopup: { show: false, announcementId: '', isEdit: false },
        cancelAnnouncementPopup: { show: false, announcementId: ''},
        contentPopup: { show: false },
        autoRefresh: {
            value: AUTO_REFRESH_TIMES[0],
            countDown: AUTO_REFRESH_TIMES[0],
            isSubmit: false
        },
        isRefresh: true,
        validateAnnouncementResult: null,
        redirectActionParams: null
    };

    it('should handle reset state', () => {
        expect(
            announcement({}, {
                type: resetState.type
            })
        ).toEqual(initialState);
    });
    
    it('should handle setGridParams', () => {
        expect(
            announcement({}, {
                type: setGridParams.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParams: { pageIndex: 1, pageSize: 100 }
        });
    });

    it('should handle initial state', () => {
        expect(announcement(undefined, {})).toEqual(initialState);
    });

    it('should handle setGridData', () => {
        expect(
            announcement({}, {
                type: setGridData.type,
                payload: { data: [{announcementId: 65014, notificationTemplateName: "Special Announcement s" }], totalItems : 300}
            })
        ).toEqual({
            gridData: { data: [{announcementId: 65014, notificationTemplateName: "Special Announcement s" }], totalItems : 300}
        });
    });

    it('should handle setCreateAnnouncement', () => {
        expect(
            announcement({}, {
                type: setCreateAnnouncement.type,
                payload: {
                    data: {isSuccessful: true}
                }
            })
        ).toEqual({
            createAnnouncementResult: {
                data: {isSuccessful: true}
            }
        });
    });

    it('should handle setEditAnnouncement', () => {
        expect(
            announcement({}, {
                type: setEditAnnouncement.type,
                payload: {
                    data: {isSuccessful: true}
                }
            })
        ).toEqual({
            editAnnouncementResult: {
                data: {isSuccessful: true}
            }
        });
    });

    it('should handle setAnnouncementTemplate', () => {
        expect(
            announcement({}, {
                type: setAnnouncementTemplate.type,
                payload: {
                    data: {isSuccessful: true}
                }
            })
        ).toEqual({
            announcementTemplate: {
                data: {isSuccessful: true}
            }
        });
    });

    it('should handle setSettings', () => {
        expect(
            announcement({}, {
                type: setSettings.type,
                payload: {
                    currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                    headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                    siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
                }
            })
        ).toEqual({
                settings: {
                    currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                    headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                    siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
                }
            });
    });

    it('should handle setOpenNewAnnouncementPopup', () => {
        expect(
            announcement({}, {
                type: setOpenNewAnnouncementPopup.type,
                payload: {
                    isShown: true
                }
            })
        ).toEqual({
            newAnnouncementPopup : {
                isShown: true
            }
        });
    });

    it('should handle setOpenActionAnnouncementPopup', () => {
        expect(
            announcement({}, {
                type: setOpenActionAnnouncementPopup.type,
                payload: {
                    isShown: true
                }
            })
        ).toEqual({
            actionAnnouncementPopup  : {
                isShown: true
            }
        });
    });

    it('should handle setOpenCancelAnnouncementPopup', () => {
        expect(
            announcement({}, {
                type: setOpenCancelAnnouncementPopup.type,
                payload: {
                    isShown: true
                }
            })
        ).toEqual({
            cancelAnnouncementPopup: {
                isShown: true
            }
        });
    });

    it('should handle setContentPopup', () => {
        expect(
            announcement({}, {
                type: setContentPopup.type,
                payload: {
                    isShown: true
                }
            })
        ).toEqual({
            contentPopup: {
                isShown: true
            }
        });
    });

    it('should handle setIsRefresh', () => {
        expect(
            announcement({}, {
                type: setAutoRefresh.type,
                payload : true
            })
        ).toEqual({
            autoRefresh :  true
        });
    });

    
    it('should handle setAutoRefresh', () => {
        expect(
            announcement({}, {
                type: setAutoRefresh.type,
                payload : 90
            })
        ).toEqual({
            autoRefresh : 90
        });
    });
});