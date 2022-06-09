jest.mock('react-redux');
jest.mock('redux');
import { connect } from 'react-redux';

describe('filter', () => {
    let mapStateToProps, mapDispatchToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementation((mapStateToPropsFunc, mapDispatchToPropsFunc) => {
            mapStateToProps = mapStateToPropsFunc;
            mapDispatchToProps = mapDispatchToPropsFunc;
            return connectMock;
        });
        require('../Filter').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});