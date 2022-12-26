import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';

export const handleNewRemoveOptions = (data, done) => {
    const removeList = data.filter(item => item.picList && item.picList.length > 0);
    const dataList = data.map(item => {
        return {
            picList: item.picList,
            headlineID: item.headlineID,
            headlineName: item.headlineName,
            custId: item.directAccountID,
            custName: item.directAccount,
            isRemoved: false
        };
    });

    done({
        isCheckedAll: false,
        isDisabledRemove: true,
        isHadAll: removeList.length > 0,
        shouldResetScrollPosition: true,
        dataList
    });
};

export const assignPic = async (params, done) => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicAssignment/AssignPIC');
    await DataService.postDataAsync(url, params).then(response => {
        done(response.data);
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const removePicAssignment = async (params, message, done) => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicAssignment/RemoveAssignment');
    await DataService.postDataAsync(url, params).then(response => {
        if (response.data.isSuccessful) {
            done();
            toast.success(LangHelper.formatString(LangHelper.getResource('RemoveAssignmentSuccessfully'), message));
        }
        else {
            toast.error(response.data.message);
        }
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const removeDefaultPic = async (params, done) => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicAssignment/RemoveDefaultPIC');
    await DataService.postDataAsync(url, params).then(response => {
        done(response.data);
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const setDefaultPic = async (params, done) => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicAssignment/SetDefaultPIC');
    await DataService.postDataAsync(url, params).then(response => {
        done(response.data);
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportExcel = async params => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicAssignment/ExportExcelReport');
    await DataService.getFileAsync(url, params).then(response => {
        let fileName = response.headers['content-disposition'].split('filename=')[1];
        fileName = fileName.split("\"")[1];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

const functions = {
    handleNewRemoveOptions,
    assignPic,
    removePicAssignment,
    removeDefaultPic,
    setDefaultPic,
    exportExcel
};

export default functions;