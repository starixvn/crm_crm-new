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
        require('../FilterContactInforms').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            titleDetail: { title: 'test', currencies: '1,2,3' },
            contactInformSettings: {filterStatuses: [{ settingId: 1, settingValue: 'test'}]},
            contactInforms: {headlineId: 720, groupId: 12, username: 'test'}
        };
        const state = {
            titleDetail: { title: 'test', currencies: '1,2,3' },
            contactInformSettings: {filterStatuses: [{ settingId: 1, settingValue: 'test'}]},
            contactInforms: {headlineId: 720, groupId: 12, username: 'test'}
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