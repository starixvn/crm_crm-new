import React from 'react';
import { Remark } from '../Remark';
import { Button, Form } from 'react-bootstrap';
import Site from '@jsroot/common/site';
import CkEditor from '@jsroot/components/ckeditor/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Remark', () => {
    beforeAll(() => {
        window.customerInfoPolicy = 2;
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call setState', async () => {
            // Arrange
            const props = {
                gridData: { specialRemarks: ['test'], normalRemarks: ['testing'] },
                getRemarks: jest.fn(),
                id: 1754
            };

            // Act
            const container = shallow(<Remark {...props} />).instance();
            await container.componentDidMount();
            expect(await props.getRemarks).toHaveBeenCalledWith({ customerId: 1754 });
            expect(container.state.specialRemarks).toEqual(['test','']);
            expect(container.state.dataSpecialRemarks).toEqual(['test','']);
            expect(container.state.normalRemarks).toEqual(['testing','']);
            expect(container.state.dataNormalRemarks).toEqual(['testing','']);
        });
    });
    
    describe('componentWillUnmount', () => {
        const props = {
            resetState: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<Remark {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('handleChange', () => {
        it('should call setState when handle change', async () => {
            // Act
            const container = shallow(<Remark />).instance();
            container.handleChange('123',0,'specialRemarks',['test']);
            expect(container.state.specialRemarks).toEqual(['123']);
        });
    });

    describe('handleCollapseExpand', () => {
        it('should update state correct', () => {
            // Arrange
            const container = shallow(<Remark />).instance();

            // Act
            container.handleCollapseExpand('specialRemark');

            // Assert
            expect(container.state.collapse).toEqual({
                specialRemark: true,
                normalRemark: false
            });
        });
        it('should not update state correct', () => {
            // Arrange
            const container = shallow(<Remark />).instance();

            // Act
            container.handleCollapseExpand();

            // Assert
            expect(container.state.collapse).toEqual({
                "": true,
                specialRemark: false,
                normalRemark: false
            });
        });
    });

    describe('removeSpecialRemarkItem', () => {
        it('should call setState when remove specialRemarkItem', async () => {
            // Arrange
            const state = {
                specialRemarks: ['test','test1','test2'],
                dataSpecialRemarks: ['test','test1','test2']
            };

            // Act
            const container = shallow(<Remark />).instance();
            container.setState({ specialRemarks: state.specialRemarks, dataSpecialRemarks: state.dataSpecialRemarks });
            container.removeSpecialRemarkItem(1);
            expect(container.state.specialRemarks).toEqual(['test','test2']);
            expect(container.state.dataSpecialRemarks).toEqual(['test','test2']);
        });
    });

    describe('removeNormalRemarkItem', () => {
        it('should call setState when remove normalRemarkItem', async () => {
            // Arrange
            const state = {
                normalRemarks: ['testing','testing1','testing2'],
                dataNormalRemarks: ['testing','testing1','testing2']
            };

            // Act
            const container = shallow(<Remark />).instance();
            container.setState({ normalRemarks: state.normalRemarks, dataNormalRemarks: state.dataNormalRemarks });
            container.removeNormalRemarkItem(1);
            expect(container.state.normalRemarks).toEqual(['testing','testing2']);
            expect(container.state.dataNormalRemarks).toEqual(['testing','testing2']);
        });
    });

    describe('addSpecialRemarkItem', () => {
        it('should call setState when add specialRemarkItem', async () => {
            // Arrange
            const state = {
                specialRemarks: ['test','test1','test2'],
                dataSpecialRemarks: ['test','test1','test2']
            };

            // Act
            const container = shallow(<Remark />).instance();
            container.setState({ specialRemarks: state.specialRemarks, dataSpecialRemarks: state.dataSpecialRemarks });
            container.addSpecialRemarkItem('123');
            expect(container.state.specialRemarks).toEqual(['test','test1','test2','123']);
        });
    });

    describe('addNormalRemarkItem', () => {
        it('should call setState when add normalRemarkItem', async () => {
            // Arrange
            const state = {
                normalRemarks: ['testing','testing1','testing2'],
                dataNormalRemarks: ['testing','testing1','testing2']
            };

            // Act
            const container = shallow(<Remark />).instance();
            container.setState({ normalRemarks: state.normalRemarks, dataNormalRemarks: state.dataNormalRemarks });
            container.addNormalRemarkItem('123');
            expect(container.state.normalRemarks).toEqual(['testing','testing1','testing2','123']);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when create successful', async () => {
            // Arrange
            const promise = Promise.resolve({ data: { code: 0, isSuccessful: true }});
            const props = {
                gridData: { specialRemarks: ['test'], normalRemarks: ['testing'] },
                editRemarks: jest.fn(() => promise),
                getRemarks: jest.fn()
            };
            const container = shallow(<Remark {...props} />).instance();

            // Act
            container.handleSubmit();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.editRemarks).toHaveBeenCalledTimes(1);
            expect(container.state.isSubmitting).toEqual(true);
            expect(container.state.editRemarkResult).toEqual(null);
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(props.getRemarks).toHaveBeenCalled();
        });

        it('should call exactly functions when create unsuccessful', async () => {
            // Arrange
            const promise = Promise.resolve({ data: { code: 1 }});
            const props = {
                gridData: { specialRemarks: ['test'], normalRemarks: ['testing'] },
                editRemarks: jest.fn(() => promise)
            };
            const container = shallow(<Remark {...props} />).instance();

            // Act
            container.handleSubmit();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.editRemarks).toHaveBeenCalledTimes(1);
            expect(container.state.isSubmitting).toEqual(false);
            expect(container.state.editRemarkResult).toEqual({ code: 1 });
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            // Arrange
            const props = {
                gridData: null
            };
            const state = {
                policy : 2
            };
            const container = shallow(<Remark {...props}/>);
            container.instance().setState(state);
            // Assert
            expect(container.type()).toEqual(null);
        });

        it('should render correctly', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                policy : 2
            };
            const container = shallow(<Remark {...props}/>);
            container.instance().setState(state);

            //Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('handle message responses if unsuccessful', () => {
            // Arrange
            const props = {
                gridData: ''
            };
            const state = {
                editRemarkResult: {
                    isSuccessful: false,
                    message: 'unsuccessful'
                },
                policy : 2
            };
            const container = shallow(<Remark {...props}/>);
            container.instance().setState(state);
    
            // Assert 
            expect(container.find(ResponseMessage).props().isSuccessful).toBe(false);
            expect(container.find(ResponseMessage).props().message).toEqual('unsuccessful');
        });

        it('handle message responses if successful', () => {
            // Arrange
            const props = {
                gridData: ''
            };
            const state = {
                editRemarkResult: {
                    isSuccessful: true,
                    message: 'UpdateRemarkSuccessfully'
                },
                policy : 2
            };        
            const container = shallow(<Remark {...props}/>);
            container.setState(state);

            // Assert 
            expect(container.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(container.find(ResponseMessage).props().message).toEqual('UpdateRemarkSuccessfully');
        });

        it('handle default message responses if successful', () => {
            // Arrange
            const props = {
                gridData: ''
            };
            const state = {
                editRemarkResult: {
                    isSuccessful: true
                },
                policy : 2
            };  
            const container = shallow(<Remark {...props}/>);
            container.setState(state);

    
            // Assert 
            expect(container.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(container.find(ResponseMessage).props().message).toEqual('UpdateRemarkSuccessfully');
        });

        it('onClick should call exact function when handleCollapse specialRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                policy : 2
            };  
            const container = shallow(<Remark {...props}/>);
            container.setState(state);
            container.instance().handleCollapseExpand = jest.fn();

            // Act
            container.find(Form.Group).at(0).simulate('click');

            //Assert
            expect(container.instance().handleCollapseExpand).toHaveBeenCalledWith('specialRemark');
        });

        it('onClick should call exact function when handleCollapse normalRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                policy : 2
            };  
            const container = shallow(<Remark {...props}/>);
            container.instance().setState(state);
            container.instance().handleCollapseExpand = jest.fn();

            // Act
            container.find(Form.Group).at(1).simulate('click');

            //Assert
            expect(container.instance().handleCollapseExpand).toHaveBeenCalledWith('normalRemark');
        });

        it('onChange should call exact function when handleChange specialRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                specialRemarks: ['test'],
                normalRemarks: ['test'],
                policy : 2
            };
            const container = shallow(<Remark {...props}/>);
            container.instance().setState(state);
            container.instance().handleChange = jest.fn();
            container.instance().setState({ specialRemarks: state.specialRemarks, normalRemarks: state.normalRemarks });

            // Act
            container.find(CkEditor).at(0).simulate('change', 'value');

            //Assert
            expect(container.instance().handleChange).toHaveBeenCalledWith('value', 0, 'dataSpecialRemarks', []);    
        });

        it('onChange should call exact function when handleChange normalRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                specialRemarks: ['test'],
                normalRemarks: ['test'],
                policy : 2
            };
            const container = shallow(<Remark {...props} />);
            container.instance().setState(state);
            container.instance().handleChange = jest.fn();
            container.instance().setState({ specialRemarks: state.specialRemarks, normalRemarks: state.normalRemarks });

            // Act
            container.find(CkEditor).at(1).simulate('change', 'value');

            //Assert
            expect(container.instance().handleChange).toHaveBeenCalledWith('value', 0, 'dataNormalRemarks', []);    
        });

        it('should render plus-icon specialRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                specialRemarks: ['test'],
                normalRemarks: ['test'],
                policy : 2
            };
            const container = shallow(<Remark {...props} />);
            container.instance().setState(state);
            container.instance().addSpecialRemarkItem = jest.fn();
            container.instance().setState({ specialRemarks: state.specialRemarks, normalRemarks: state.normalRemarks });

            // Act
            container.find('span').at(1).simulate('click');

            //Assert
            expect(container.instance().addSpecialRemarkItem).toHaveBeenCalledWith('0test');    
        });

        it('should render cross-icon specialRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                specialRemarks: ['test','test1'],
                normalRemarks: ['test'],
                policy : 2
            };
            const container = shallow(<Remark {...props} />);
            container.instance().setState(state);
            container.instance().removeSpecialRemarkItem = jest.fn();
            container.instance().setState({ specialRemarks: state.specialRemarks, normalRemarks: state.normalRemarks });

            // Act
            container.find('span').at(1).simulate('click');

            //Assert
            expect(container.instance().removeSpecialRemarkItem).toHaveBeenCalledWith(0);    
        });

        it('should render plus-icon normalRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                specialRemarks: ['test'],
                normalRemarks: ['test'],
                policy : 2
            };
            const container = shallow(<Remark {...props} />);
            container.instance().setState(state);
            container.instance().addNormalRemarkItem = jest.fn();
            container.instance().setState({ specialRemarks: state.specialRemarks, normalRemarks: state.normalRemarks });

            // Act
            container.find('span').at(3).simulate('click');

            //Assert
            expect(container.instance().addNormalRemarkItem).toHaveBeenCalledWith('0test');    
        });

        it('should render cross-icon normalRemark', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                specialRemarks: ['test'],
                normalRemarks: ['test','test1'],
                policy : 2
            };
            const container = shallow(<Remark {...props} />);
            container.instance().setState(state);
            container.instance().removeNormalRemarkItem = jest.fn();
            container.instance().setState({ specialRemarks: state.specialRemarks, normalRemarks: state.normalRemarks });

            // Act
            container.find('span').at(3).simulate('click');

            //Assert
            expect(container.instance().removeNormalRemarkItem).toHaveBeenCalledWith(0);    
        });

        it('should render button correctly', () => {
            //Act
            const props = {
                gridData: ''
            };
            const state = {
                specialRemarks: ['test'],
                normalRemarks: ['test','test1'],
                policy : 2
            };
            const container = shallow(<Remark {...props} />);
            container.instance().setState(state);
            container.instance().handleSubmit = jest.fn();
            container.instance().setState({ specialRemarks: state.specialRemarks, normalRemarks: state.normalRemarks });

            // Act
            container.find(Button).at(0).simulate('click');

            //Assert
            expect(container.instance().handleSubmit).toHaveBeenCalled();    
        });
    });
});
