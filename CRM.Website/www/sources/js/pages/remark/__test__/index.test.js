import ReactDOM from 'react-dom';

describe('index', () => {
    beforeEach(() => {
        const appContainer = document.createElement('div');
        const id = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        id.setAttribute('id', 'id');
        document.body.appendChild(appContainer);
        document.body.appendChild(id);
        ReactDOM.render = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    it('renders dom correctly', () => {
        // Action
        require('../index');

        // Assert
        expect(ReactDOM.render).toHaveBeenCalled();
    });
});