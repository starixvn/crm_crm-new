import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import AutoComplete from '@jsroot/components/AutoComplete';
import toJson from 'enzyme-to-json';

describe('filter', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('methods', () => {
        describe('handleChange', () => {
            it('should call setState when change feedback search keyword', () => {
                // Arrange
                const expected = {
                    feedbackSubjectSearch: 'feedback'
                };
                const container = shallow(<Filter />);

                // Act
                container.instance().handleChange('feedback');

                // Assert
                expect(container.state().feedbackSubjectSearch).toEqual(expected.feedbackSubjectSearch);
            });
        });

        describe('handleInputChange', () => {
            it('should set state when length of param greater than 0', () => {
                // Arrange
                const props = {
                    allActiveFeedbackSubject: [ { subject: 'test1' }, { subject: 'test2' } ]
                };
                const container = shallow(<Filter {...props}/>);

                // Act
                container.instance().handleInputChange('test');

                // Assert
                expect(container.state().feedbackSubjectSuggestions).toEqual(['test1', 'test2']);
            });

            it('should set state when length of param equal 0', () => {
                // Arrange
                const props = {
                    allActiveFeedbackSubject: [ { subject: 'test1' }, { subject: 'test2' } ]
                };
                const container = shallow(<Filter {...props}/>);

                // Act
                container.instance().handleInputChange('');

                // Assert
                expect(container.state().feedbackSubjectSuggestions).toEqual([]);
            });
        });

        describe('getParams', () => {
            it('should return expected params', () => {
                // Arrange
                const expected = {
                    Subject: '',
                    pageIndex: 1,
                    pageSize: 100
                };
                const props = {
                    setGridParams: jest.fn(),
                    gridParams: {
                        Subject: null,
                        pageIndex: 1,
                        pageSize: 100
                     },
                    getFeedBackSubject: jest.fn()
                };
                const container = shallow(<Filter {...props}/>).instance();

                // Act
                const actual = container.getParams();

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly functions', () => {
                // Arrange
                const expectedParams = {
                    Subject: '',
                    pageIndex: 1,
                    pageSize: 50
                };
                const props = {
                    setGridParams: jest.fn(),
                    gridParams: {
                        Subject: null,
                        pageIndex: 1,
                        pageSize: 100
                     },
                    getFeedBackSubject: jest.fn()
                };
                const container = shallow(<Filter {...props} />).instance();
                container.getParams = jest.fn(() => expectedParams);

                // Act
                container.handleSubmit({ preventDefault: jest.fn() });

                // Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
                expect(props.getFeedBackSubject).toHaveBeenCalledWith(expectedParams);
            });

            describe('handleOpenCreatePopup', () => {
                it('should call exactly functions', () => {
                    // Arrange
                    const props = {
                        isHost: true,
                        setCreateFeedbackSubjectPopup: jest.fn()
                    };
                    const container = shallow(<Filter {...props} />).instance();

                    // Act
                    container.handleOpenCreatePopup();

                    // Assert
                    expect(props.setCreateFeedbackSubjectPopup).toHaveBeenCalledWith({ show: true });
                });
            });
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Act
            const container = shallow(<Filter />);
    
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    
        it('should render not correctly', () => {
            //Act
            const props = {
                allActiveFeedbackSubject: null
            };
            const container = shallow(<Filter {...props} />);
    
            //Assert
            expect(container.type()).toEqual(null);
        });

        it('should call exactly function', () => {
            //Arrange
            const props = {
                allActiveFeedbackSubject: [ { subject: 'test1' }, { subject: 'test2' } ]
            };
            const container = shallow(<Filter {...props}/>);
            container.instance().handleChange = jest.fn();
            container.instance().handleInputChange = jest.fn();

            //Act
            container.find(AutoComplete).first().props().onChange();
            container.find(AutoComplete).first().props().onInputChange();

            //Assert
            expect(container.instance().handleChange).toHaveBeenCalled();
            expect(container.instance().handleInputChange).toHaveBeenCalled();
        });
    })
});