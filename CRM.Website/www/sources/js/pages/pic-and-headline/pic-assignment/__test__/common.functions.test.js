import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import functions from '../common.functions';

describe('common.functions', () => {
    beforeAll(() => {
        Site.resolveClientUrl = jest.fn(url => url);
        LangHelper.formatString(value => value);
        LangHelper.getResource(value => value);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('handleNewRemoveOptions', () => {
        it('callback param runs correctly', () => {
            // Arrange
            const data = [
                {
                    picList: [ 'value' ]
                }
            ];

            const expectedData = data.map(item => {
                return {
                    picList: item.picList,
                    headlineID: item.headlineID,
                    headlineName: item.headlineName,
                    custId: item.directAccountID,
                    custName: item.directAccount,
                    isRemoved: false
                };
            });

            const callback = jest.fn();

            // Action
            functions.handleNewRemoveOptions(data, callback);

            // Assert
            expect(callback).toHaveBeenCalledWith({
                isCheckedAll: false,
                isDisabledRemove: true,
                isHadAll: true,
                shouldResetScrollPosition: true,
                dataList: expectedData
            });
        });
    });

    describe('assignPic', () => {
        it('should callback run correctly when fetching assign pic have been done', async () => {
            // Arrange
            const params = { value: '' };
            const callback = jest.fn();
            const response = { data: [{ id: 1, name: 'void abnormal bet' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();

            // Action
            await functions.assignPic(params, callback);

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/AssignPIC', params);
            expect(callback).toHaveBeenCalledWith(response.data);
            expect(Site.unblockUI).toHaveBeenCalled();
        });
    });

    describe('removePicAssignment', () => {
        it('should callback run correctly when fetching assign pic have been done with not successful', async () => {
            // Arrange
            const params = { value: '' };
            const callback = jest.fn();
            const response = { data: { isSuccessful: false, message: 'void abnormal bet' } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            toast.error = jest.fn();

            // Action
            await functions.removePicAssignment(params, null, callback);

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/RemoveAssignment', params);
            expect(toast.error).toHaveBeenCalledWith(response.data.message);
            expect(callback).toHaveBeenCalledTimes(0);
            expect(Site.unblockUI).toHaveBeenCalled();
        });
        
        it('should callback run correctly when fetching assign pic have been done with successful', async () => {
            // Arrange
            const params = { value: '' };
            const callback = jest.fn();
            const response = { data: { isSuccessful: true, message: 'void abnormal bet' } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            toast.success = jest.fn();

            // Action
            await functions.removePicAssignment(params, null, callback);

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/RemoveAssignment', params);
            expect(toast.success).toHaveBeenCalledWith('RemoveAssignmentSuccessfully');
            expect(callback).toHaveBeenCalled();
            expect(Site.unblockUI).toHaveBeenCalled();
        });
    });

    describe('removeDefaultPic', () => {
        it('should callback run correctly when fetching remove default pic have been done', async () => {
            // Arrange
            const params = { value: '' };
            const callback = jest.fn();
            const response = { data: [{ id: 1, name: 'void abnormal bet' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();

            // Action
            await functions.removeDefaultPic(params, callback);

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/RemoveDefaultPIC', params);
            expect(callback).toHaveBeenCalledWith(response.data);
            expect(Site.unblockUI).toHaveBeenCalled();
        });
    });

    describe('setDefaultPic', () => {
        it('should callback run correctly when fetching set default pic have been done', async () => {
            // Arrange
            const params = { value: '' };
            const callback = jest.fn();
            const response = { data: [{ id: 1, name: 'void abnormal bet' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();

            // Action
            await functions.setDefaultPic(params, callback);

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/SetDefaultPIC', params);
            expect(callback).toHaveBeenCalledWith(response.data);
            expect(Site.unblockUI).toHaveBeenCalled();
        });
    });

    describe('exportExcel', () => {
        it('should download file when fetching export excel have been done', async () => {
            // Arrange
            const params = { value: '' };
            const expectedName = 'picAssignment';
            const response = {
                headers: {
                    'content-disposition': `filename="${expectedName}"`
                },
                data: { value: '' }
            };

            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            Site.downloadFile = jest.fn();

            // Action
            await functions.exportExcel(params);

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('PicAssignment/ExportExcelReport', params);
            expect(Site.downloadFile(response.data, expectedName));
        });
    });
});