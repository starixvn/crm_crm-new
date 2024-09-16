import LangHelper from '@jsroot/common/langHelper';
import * as commonFunction from '../common.functions';

describe('commonFunctions', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('statusOptionOST', () => {
        it('return expected value', () => {
            // Arrange
            var expected = [
                {id: 'New', name: 'New', checked: true},
                {id: 'Sent', name: 'Sent', checked: true},
                {id: 'Failed', name: 'Failed', checked: true},
                {id: 'Cancelled', name: 'Cancelled', checked: true},
                {id: 'Draft', name: 'Draft', checked: true},
                {id: 'Sending', name: 'Sending', checked: true},
            ];

            // Act
            const result = commonFunction.statusOptionOST;

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('statusOptionCSD', () => {
        it('return expected value', () => {
            // Arrange
            var expected = [
                {id: 'New', name: 'New', checked: true},
                {id: 'Active', name: 'Active', checked: true},
                {id: 'Inactive', name: 'Inactive', checked: true}
            ];

            // Act
            const result = commonFunction.statusOptionCSD;

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('languageOptions', () => {
        it('return expected value when isOstUser true', () => {
            // Arrange
            var expected = [
                {
                    name: "English",
                    mapLabel: "content_en"
                },
                {
                    name: "Simplified Chinese",
                    mapLabel: "content_cs"
                },
                {
                    name: "Traditional Chinese",
                    mapLabel: "content_ch"
                },
                {
                    name: "New Simplified Chinese",
                    mapLabel: "content_zhcn"
                }
            ];

            // Act
            const result = commonFunction.languageOptions(true);

            // Assert
            expect(result).toEqual(expected);
        });

        it('return expected value when isOstUser false', () => {
            // Arrange
            var expected = [
                {
                    name: "English",
                    mapLabel: "content_en"
                },
                {
                    name: "Simplified Chinese",
                    mapLabel: "content_cs"
                }
            ];

            // Act
            const result = commonFunction.languageOptions(false);

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('isEitherExitsFromToId', () => {
        it('return expected value', () => {
            // Arrange
            var filter = {
                fromNotificationId: true,
                toNotificationId: false
            };

            // Act
            const result = commonFunction.isEitherExitsFromToId(filter);

            // Assert
            expect(result).toEqual(true);
        });

        it('return expected value', () => {
            // Arrange
            var filter = {
                fromNotificationId: false,
                toNotificationId: true
            };

            // Act
            const result = commonFunction.isEitherExitsFromToId(filter);

            // Assert
            expect(result).toEqual(true);
        });
    });

    describe('isFromIdOverToId', () => {
        it('return expected value', () => {
            // Arrange
            var filter = {
                fromNotificationId: 20,
                toNotificationId: 10
            };

            // Act
            const result = commonFunction.isFromIdOverToId(filter);

            // Assert
            expect(result).toEqual(true);
        });
    });

    describe('filterAndSortSites', () => {
        it('return expected value', () => {
            // Arrange
            var sites = [
                { siteType: 'MNC', siteGroupOrd: 2 },
                { siteType: 'ABC', siteGroupOrd: 1 },
                { siteType: 'MNC', siteGroupOrd: 1 },
            ];
            var expected = [
                { siteType: 'MNC', siteGroupOrd: 1 },
                { siteType: 'MNC', siteGroupOrd: 2 }
            ];

            // Act
            const result = commonFunction.filterAndSortSites(sites, 'MNC');

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('isExceedMaxInt', () => {
        it('should return false when not exceed max int', () => {
            // Arrange
            var filter = {
                fromNotificationId: 12,
                toNotificationId: 15,
                notificationId: 15,
                matchId: 100,
                messageId: 200
            };

            // Act
            const result = commonFunction.isExceedMaxInt(filter);

            // Assert
            expect(result).toEqual(false);
        });

        it('should return true when exceed max int', () => {
            // Arrange
            var filter = {
                fromNotificationId: 2147483648,
                toNotificationId: 15,
                notificationId: 15,
                matchId: 100,
                messageId: 200
            };

            // Act
            const result = commonFunction.isExceedMaxInt(filter);

            // Assert
            expect(result).toEqual(true);
        });
    });

    describe('checkExceedMaxInt', () => {
        it('should set message when exceed max int', () => {
            // Arrange
            var field = {
                value: 2147483649,
                name: 'MNC'
            };
            var errMsg = [];
            var isValid = { value: true };

            // Act
            commonFunction.checkExceedMaxInt(field, errMsg, isValid);

            // Assert
            expect(errMsg).toEqual(["MNC ExceedsTheIntegerDatatypeRange"]);
            expect(isValid.value).toEqual(false);
        });
    });

    describe('isValidGetDataAutoRefresh', () => {
        it('should set message when exceed max int', () => {
            // Arrange
            var filter = {
                fromDate: '08/07/2024',
                toDate: '08/10/2024',
                fromNotificationId: 312,
                toNotificationId: 15,
                notificationId: 15,
                matchId: 100,
                messageId: 200,
                isCompareIdEqual: false
            };

            // Act
            var result = commonFunction.isValidGetDataAutoRefresh(filter);

            // Assert
            expect(result).toEqual(false);
        });
    });
});