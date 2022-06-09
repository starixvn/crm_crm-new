jest.mock('react-redux');
jest.mock('redux');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

describe('connect ', () => {
    let mapStateToProps, mapDispatchToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementation((mapStateToPropsFunc, mapDispatchToPropsFunc) => {
            mapStateToProps = mapStateToPropsFunc;
            mapDispatchToProps = mapDispatchToPropsFunc;
            return connectMock;
        });
        require('../DataGrid').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            gridParams: {},
            customerInfo: {},
            settings: {},
            editCustomerInfoResult: null,
            editCustomerInfoPopup: null
        };
        const state = {
            gridParams: {},
            customerInfo: {},
            settings: {},
            editCustomerInfoResult: null,
            editCustomerInfoPopup: null
        };

        // Act
        const actual = connect(state);

        // Assert
        expect(actual).toEqual(expected);
    });
});