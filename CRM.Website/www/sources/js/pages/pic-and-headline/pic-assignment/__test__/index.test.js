import ReactDOM from 'react-dom';

describe('index', () => {
    beforeEach(() => {
        const appContainer = document.createElement('div');
        const isHost = document.createElement('div');
        const isReadPicManagement = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        isHost.setAttribute('id', 'is-host');
        isReadPicManagement.setAttribute('id', 'is-read-picmanagement');
        document.body.appendChild(appContainer);
        document.body.appendChild(isHost);
        document.body.appendChild(isReadPicManagement);
        ReactDOM.render = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('right-row-container');
        const isHost = document.getElementById('is-host');
        const isReadPicManagement = document.getElementById('is-read-picmanagement');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }

        if (isHost) {
            document.body.removeChild(isHost);
        }
        if (isReadPicManagement) {
            document.body.removeChild(isReadPicManagement);
        }
    });

    it('renders dom correctly', () => {
        // Action
        require('../index');

        // Assert
        expect(ReactDOM.render).toHaveBeenCalled();
    });
});