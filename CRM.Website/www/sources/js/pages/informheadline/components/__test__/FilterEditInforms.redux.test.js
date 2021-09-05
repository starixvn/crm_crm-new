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
        require('../FilterEditInforms').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            allSettings: {
                currencies: [{id: 1, name: 'test'},{id: 2, name: 'test'},{id: 3, name: 'test'},{id: 4, name: 'test'}],
                sites: [{childSites: [{id: 1, name: '123'},{id: 2, name: '123'},{id: 3, name: '123'},{id: 4, name: '123'}]}]
            },
            filterData: {values: {currencies: '1,2'}, errors: {}}
        };
        const state = {
            allSettings: {
                currencies: [{id: 1, name: 'test'},{id: 2, name: 'test'},{id: 3, name: 'test'},{id: 4, name: 'test'}],
                sites: [{childSites: [{id: 1, name: '123'},{id: 2, name: '123'},{id: 3, name: '123'},{id: 4, name: '123'}]}]
            },
            filterData: {values: {currencies: '1,2'}, errors: {}}
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