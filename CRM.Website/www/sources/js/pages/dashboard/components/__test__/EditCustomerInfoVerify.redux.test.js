jest.mock('react-redux');
jest.mock('redux');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

describe('connect', () => {
    let mapStateToProps, mapDispatchToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementation((mapStateToPropsFunc, mapDispatchToPropsFunc) => {
            mapStateToProps = mapStateToPropsFunc;
            mapDispatchToProps = mapDispatchToPropsFunc;
            return connectMock;
        });
        require('../EditCustomerInfoVerify').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            customerInfoVerify : {
                email: '___', isVerifyEmail: true,
                passport: '---', isVerifyPassport: false,
                birthDay: new Date('09/09/2021'), isVerifyBirthday: false,
                secretCode: '---', isVerifySecretCode: false,
                betCredit: 0, isVerifyBetCredit: false,
                givenCredit: 0, isVerifyGivenCredit: false
            }
        };
        const state = {
            customerInfoVerify : {
                email: '___', isVerifyEmail: true,
                passport: '---', isVerifyPassport: false,
                birthDay: new Date('09/09/2021'), isVerifyBirthday: false,
                secretCode: '---', isVerifySecretCode: false,
                betCredit: 0, isVerifyBetCredit: false,
                givenCredit: 0, isVerifyGivenCredit: false
            }
        };

        // Act
        const actual = mapStateToProps(state);

        // Assert
        expect(actual).toEqual(expected);
    });

    it('bindActionCreators should be called with correct parameter', () => {
        // Arrange
        const mockBindAction = jest.fn();
        bindActionCreators.mockImplementation(mockBindAction);
        const dispatch = {};

        // Act
        mapDispatchToProps(dispatch);

        //Assert
        expect(mockBindAction).toHaveBeenCalledWith(ActionCreators, dispatch);
    });
});