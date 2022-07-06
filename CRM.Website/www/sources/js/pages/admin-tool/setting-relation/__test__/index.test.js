import ReactDOM from 'react-dom';

describe('index', () => {
    beforeEach(() => {
        const appContainer = document.createElement('div');
        const isHost = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        isHost.setAttribute('id', 'isHost');
        document.body.appendChild(appContainer);
        document.body.appendChild(isHost);
        ReactDOM.render = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('right-row-container');
        const isHost = document.getElementById('isHost');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }

        if (isHost) {
            document.body.removeChild(isHost);
        }
    });

    it('renders dom correctly', () => {
        // Action
        require('../index');

        // Assert
        expect(ReactDOM.render).toHaveBeenCalled();
    });
});