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
        require('../EditContactInforms').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            titleDetail: "test",
            contactInformSettings: {filterStatuses: [{ settingId: 1, settingValue: 'test'}]},
            contactInforms: {headlineId: 720, groupId: 12, username: 'test'},
            gridParams: { pageIndex: 1, pageSize: 100 },
            resultEditContactInforms: 'Successfully!'
        };
        const state = {
            titleDetail: "test",
            contactInformSettings: {filterStatuses: [{ settingId: 1, settingValue: 'test'}]},
            contactInforms: {headlineId: 720, groupId: 12, username: 'test'},
            gridParams: { pageIndex: 1, pageSize: 100 },
            resultEditContactInforms: 'Successfully!'
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