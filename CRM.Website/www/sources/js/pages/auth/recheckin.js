import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
const _rootUrl = document.getElementById('RootUrl') ? document.getElementById('RootUrl').value : '/';

const recheckin = async function () {
    const url = Site.resolveClientUrl('Auth/CheckUserOnlineStatus');
    await DataService.postDataAsync(url).then(response => {
        if (response.data.errCode === 1) {
            window.location = _rootUrl + 'auth/SignOut';
        } else {
            setTimeout(recheckin, 60000);
        }
    }).catch(Site.handleAxiosError);
};

const isHost = document.getElementById('isEnableReCheckIn').checked;
if (isHost) {
    setTimeout(recheckin, 60000);
}