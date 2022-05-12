import ReactDOM from 'react-dom';

describe('index', () => {
    beforeEach(() => {
        const appContainer = document.createElement('div');
        const isHost = document.createElement('div');
        const customerName = document.createElement('div');
        const custId = document.createElement('div');
        const isGuest = document.createElement('div');
        appContainer.setAttribute('id', 'app-container');
        isHost.setAttribute('id', 'isHost');
        customerName.setAttribute('id', 'customerName');
        custId.setAttribute('id', 'custId');
        isGuest.setAttribute('id', 'isGuest');
        document.body.appendChild(appContainer);
        document.body.appendChild(isHost);
        document.body.appendChild(customerName);
        document.body.appendChild(custId);
        document.body.appendChild(isGuest);
        ReactDOM.render = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('app-container');
        const isHost = document.getElementById('isHost');
        const customerName = document.getElementById('customerName');
        const custId = document.getElementById('custId');
        const isGuest = document.getElementById('isGuest');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }

        if (isHost) {
            document.body.removeChild(isHost);
        }

        if (customerName) {
            document.body.removeChild(customerName);
        }

        if (custId) {
            document.body.removeChild(custId);
        }

        if (isGuest) {
            document.body.removeChild(isGuest);
        }
    });

    it('renders dom correctly', () => {
        // Action
        require('../index');

        // Assert
        expect(ReactDOM.render).toHaveBeenCalled();
    });
});