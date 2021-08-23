jest.mock('react-redux');
jest.mock('redux');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

describe('connect ', () => {
    let mapStateToProps, mapDispatchToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementation((mapStateToPropsFunc, mapDispatchToPropsFunc) => {
            mapStateToProps = mapStateToPropsFunc;
            mapDispatchToProps = mapDispatchToPropsFunc;
            return connectMock;
        });
        require('../NewInforms').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            newInforms: { headlineId: 720, groupId: 12, username: 'test' },
            allSettings: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] },
            gridParams: { pageIndex: 1, pageSize: 100 },
            resultInsertInforms: 'Successfully!'
        };
        const state = {
            newInforms: { headlineId: 720, groupId: 12, username: 'test' },
            allSettings: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] },
            gridParams: { pageIndex: 1, pageSize: 100 },
            resultInsertInforms: 'Successfully!'
        };

        // Act
        const actual = mapStateToProps(state);

        // Assert
        expect(actual).toEqual(expected);
    });

    it('bindActionCreators should be called with correct parameter', () => {
        // Arrange
        const mockBindAction = jest.fn();
        bindActionCreators.mockImplementationOnce(mockBindAction);
        const dispatch = {};

        // Act
        mapDispatchToProps(dispatch);

        // Assert
        expect(mockBindAction).toHaveBeenCalledWith(ActionCreators, dispatch);
    });
});