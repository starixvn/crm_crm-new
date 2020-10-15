jest.mock('react-redux');
jest.mock('redux');
import { connect } from 'react-redux';

describe('connect ', () => {
    let mapStateToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementation((mapStateToPropsFunc) => {
            mapStateToProps = mapStateToPropsFunc;
            return connectMock;
        });
        require('../AppContainer').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            contentChartPopup: { show: false }
        };
        const state = {
            anotherState: 123,
            contentChartPopup: { show: false }
        };

        // Act
        const actual = mapStateToProps(state);

        // Assert
        expect(actual).toEqual(expected);
    });
});