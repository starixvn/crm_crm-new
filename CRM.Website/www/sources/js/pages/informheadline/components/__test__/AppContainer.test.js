import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import DataGrid from '../DataGrid';
import EditContactInforms from '../EditContactInforms';
import EditSearchInforms from '../EditSearchInforms';
import RemovedAccountLogs from '../RemovedAccountLogs';
import RemovedAccountLogDetails from '../RemovedAccountLogDetails';
import NewInforms from '../NewInforms';
import OptionsEdit from '../OptionsEdit';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    var initProps = {};

    beforeEach(() => {
        const searchPolicy = document.createElement('input');
        const contactPolicy = document.createElement('input');
        searchPolicy.setAttribute('id', 'SearchPolicy');
        contactPolicy.setAttribute('id', 'ContactPolicy');
        document.body.appendChild(searchPolicy);
        document.body.appendChild(contactPolicy);

        initProps = {
            searchPolicy: document.getElementById('SearchPolicy'),
            contactPolicy: document.getElementById('ContactPolicy'),
            getInforms: jest.fn()
        };
    });

    afterEach(() => {
        const searchPolicy = document.getElementById('SearchPolicy');
        const contactPolicy = document.getElementById('ContactPolicy');
        if (searchPolicy) {
            document.body.removeChild(searchPolicy);
        }
        if (contactPolicy) {
            document.body.removeChild(contactPolicy);
        }
    });

    describe('componentDidMount', () => {
        it('should call getInforms', () => {
            // Arrange
            const props = {...initProps};

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseShowEditContactInforms', () => {
        it('should call exactly functions when close edit contact', () => {
            // Arrange
            const props = {
                ...initProps,
                showEditContactInform: { show: true },
                setShowEditContactInform: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseShowEditContactInforms();
           
            // Assert
            expect(props.setShowEditContactInform).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseShowEditSearchInforms', () => {
        it('should call exactly functions when close edit search', () => {
            // Arrange
            const props = {
                ...initProps,
                showEditSearchInform: { show: true },
                setShowEditSearchInform: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseShowEditSearchInforms();
           
            // Assert
            expect(props.setShowEditSearchInform).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseShowRemovedLogs', () => {
        it('should call exactly functions when close remove logs', () => {
            // Arrange
            const props = {
                ...initProps,
                showRemovedLogs: { show: true },
                setShowRemovedLogs: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseShowRemovedLogs();
           
            // Assert
            expect(props.setShowRemovedLogs).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseShowRemovedLogDetails', () => {
        it('should call exactly functions when close remove log details', () => {
            // Arrange
            const props = {
                ...initProps,
                showRemovedLogDetails: { show: true },
                setShowRemovedLogDetails: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseShowRemovedLogDetails();
           
            // Assert
            expect(props.setShowRemovedLogDetails).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseShowNewInforms', () => {
        it('should call exactly functions when close new informs', () => {
            // Arrange
            const props = {
                ...initProps,
                showNewInforms: { show: true },
                setShowNewInforms: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseShowNewInforms();
           
            // Assert
            expect(props.setShowNewInforms).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render correctly with have permission', () => {
            // Arrange
            const props = {
                ...initProps,
                showEditContactInform: { show: true },
                showEditSearchInform: { show: true },
                showRemovedLogs: { show: true },
                showRemovedLogDetails: { show: true },
                showNewInforms: { show: true },
                showOptions: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGrid).length).toBe(1);
            expect(container.find(EditContactInforms).length).toBe(1);
            expect(container.find(EditSearchInforms).length).toBe(1);
            expect(container.find(RemovedAccountLogs).length).toBe(1);
            expect(container.find(RemovedAccountLogDetails).length).toBe(1);
            expect(container.find(NewInforms).length).toBe(1);
            expect(container.find(OptionsEdit).length).toBe(1);
        });
    });

    describe('render', () => {
        it('should render correctly with not permission', () => {
            const searchPolicy = document.getElementById('SearchPolicy');
            const contactPolicy = document.getElementById('ContactPolicy');
            searchPolicy.setAttribute("none","");
            contactPolicy.setAttribute("none","");

            // Arrange
            const props = {
                ...initProps,
                searchPolicy: searchPolicy,
                contactPolicy: contactPolicy,
                showEditContactInform: { show: true },
                showEditSearchInform: { show: true },
                showRemovedLogs: { show: true },
                showRemovedLogDetails: { show: true },
                showNewInforms: { show: true },
                showOptions: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGrid).length).toBe(0);
            expect(container.find(EditContactInforms).length).toBe(1);
            expect(container.find(EditSearchInforms).length).toBe(1);
            expect(container.find(RemovedAccountLogs).length).toBe(1);
            expect(container.find(RemovedAccountLogDetails).length).toBe(1);
            expect(container.find(NewInforms).length).toBe(1);
            expect(container.find(OptionsEdit).length).toBe(0);
        });
    });
});