import React from 'react';
import { shallow } from 'enzyme';
import { FileUpload } from '../FileUpload';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';

describe('FileUpload', () => {
    beforeAll(() => {
        Site.resolveClientUrl = jest.fn();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        const props = {
            uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
            imageInputRef: jest.fn(),
            setStatecontainer: jest.fn()
        };
        it('renders the file upload label', () => {
            // Arrange
            const container = shallow(<FileUpload {...props} />);
            //Act
            const label = container.find('label.file-upload-label');
            // Assert 
            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Choose Files');
        });

        it('renders the correct number of files', () => {
            // Arrange
            const container = shallow(<FileUpload {...props} />);
            //Act
            const count = container.find('.count-file');
            // Assert 
            expect(count).toHaveLength(1);
            expect(count.text()).toEqual('2 files');
        });

        it('displays "No files chosen" when no files are uploaded', () => {
            // Arrange
            const propsWithNoFiles = { ...props, uploadedFiles: [] };
            const wrapper = shallow(<FileUpload {...propsWithNoFiles} />);
            //Act
            const count = wrapper.find('.count-file');
            // Assert 
            expect(count).toHaveLength(1);
            expect(count.text()).toEqual('No files chosen');
        });

        it('calls handleFileEvent when files are chosen', () => {
            // Arrange
            const wrapper = shallow(<FileUpload {...props} />);
            wrapper.instance().handleFileEvent = jest.fn();
            const fileInput = wrapper.find('#file-btn');
            const files = [{ name: 'file3.jpg', size: 3072 }];
            //Act
            fileInput.simulate('change', { target: { files }, preventDefault: jest.fn() });
            // Assert 
            expect(wrapper.instance().handleFileEvent).toHaveBeenCalled();
        });
    });

    describe('handlePreviewImage', () => {
        it('should open new window', () => {
            // Arrange
            const event = {
                stopPropagation: jest.fn()
            };
            const props = {
                uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }]
            };
            const fileName = { name: 'file.png', type: 'string' };
            window.open = jest.fn();
            const container = shallow(<FileUpload {...props} />).instance();
            //Act
            container.handlePreviewImage(event, fileName);
            // Assert 
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(window.open).toHaveBeenCalled();
        });
    });

    describe('renderListPortalFile', () => {
        const props = {
            uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }]
        };
        const container = shallow(<FileUpload {...props} />).instance();

        test('should call exact function when click preview image', () => {
            // Arrange
            const provider = {
                draggableProps: {},
                dragHandleProps: {},
                innerRef: {}
            };
            const snapshot = {isDragging: false};
            const item = {name: 'name'};
            container.handlePreviewImage = jest.fn();
            //Act
            const result = shallow(container.renderListPortalFile(provider, snapshot, item));
            result.find('.text-color').simulate('click');
            //Assert 
            expect(container.handlePreviewImage).toHaveBeenCalled();
        });

        test('should call exact function when click remove image', () => {
            // Arrange
            const provider = {
                draggableProps: {},
                dragHandleProps: {},
                innerRef: {}
            };
            const snapshot = {isDragging: false};
            const item = {name: 'name'};
            container.handleRemoveFile = jest.fn();
            //Act
            const result = shallow(container.renderListPortalFile(provider, snapshot, item));
            result.find('.icon-delete').simulate('click');
            //Assert 
            expect(container.handleRemoveFile).toHaveBeenCalled();
        });
    });

    describe('reorder', () => {
        const props = {
            uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }]
        };
        const container = shallow(<FileUpload {...props} />).instance();
        test('reorders list correctly', () => {
            // Arrange
            const list = ['a', 'b', 'c', 'd', 'e'];
            const startIndex = 1;
            const endIndex = 3;
            //Act
            const result = container.reorder(list, startIndex, endIndex);
            //Assert 
            expect(result).toEqual(['a', 'c', 'd', 'b', 'e']);
          });
          
        test('returns a new array', () => {
            // Arrange
            const list = ['a', 'b', 'c', 'd', 'e'];
            const startIndex = 1;
            const endIndex = 3;
            //Act
            const result = container.reorder(list, startIndex, endIndex);
            //Assert 
            expect(result).not.toBe(list);
        });
    });

    describe('onDragEnd', () => {
        test('should call exact function when destination has value', () => {
             // Arrange
            const result = {
                destination: {index: 1},
                source: {index: 1}
            };
            const props = {
                uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
                setStateUploadFile: jest.fn()
            };
            const container = shallow(<FileUpload {...props} />).instance();
            container.reorder = jest.fn();
            //Act
            container.onDragEnd(result);
            //Assert 
            expect(props.setStateUploadFile).toHaveBeenCalled();
            expect(container.reorder).toHaveBeenCalled();
        });

        test('should not call exact function when destination is null', () => {
            // Arrange
            const props = {
                uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
                setStateUploadFile: jest.fn()
            };
            const container = shallow(<FileUpload {...props} />).instance();
            container.reorder = jest.fn();
            //Act
            container.onDragEnd({destination: null});
            //Assert 
            expect(props.setStateUploadFile).not.toHaveBeenCalled();
            expect(container.reorder).not.toHaveBeenCalled();
       });
    });

    describe('handleFileEvent', () => {
        test('should call exact function', () => {
             // Arrange
            const props = {
                uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
            };
            const event = {
                target: {
                    files: ['test']
                }
            }
            const container = shallow(<FileUpload {...props} />).instance();
            container.handleUploadFiles = jest.fn();
            //Act
            container.handleFileEvent(event);
            //Assert 
            expect(container.handleUploadFiles).toHaveBeenCalled();
        });
    });

    describe('handleRemoveFile', () => {
        test('should call exact function', () => {
             // Arrange
            const props = {
                uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
                setStateUploadFile: jest.fn()
            };
            const event = {
                stopPropagation: jest.fn()
            };
            const container = shallow(<FileUpload {...props} />).instance();

            //Act
            container.handleRemoveFile(event, 'file1.jpg');

            //Assert 
            expect(props.setStateUploadFile).toHaveBeenCalled();
        });
    });
});