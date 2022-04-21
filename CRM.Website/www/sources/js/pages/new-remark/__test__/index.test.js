import ReactDOM from 'react-dom';

describe('index', () => {
    beforeEach(() => {
        const appContainer = document.createElement('div');
        const isHost = document.createElement('div');
        const customerName = document.createElement('div');
        appContainer.setAttribute('id', 'app-container');
        isHost.setAttribute('id', 'isHost');
        customerName.setAttribute('id', 'customerName');
        document.body.appendChild(appContainer);
        document.body.appendChild(isHost);
        document.body.appendChild(customerName);
        ReactDOM.render = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('app-container');
        const isHost = document.getElementById('isHost');
        const customerName = document.getElementById('customerName');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }

        if (isHost) {
            document.body.removeChild(isHost);
        }

        if (customerName) {
            document.body.removeChild(customerName);
        }
    });

    it('renders dom correctly', () => {
        // Action
        require('../index');

        // Assert
        expect(ReactDOM.render).toHaveBeenCalled();
    });
});