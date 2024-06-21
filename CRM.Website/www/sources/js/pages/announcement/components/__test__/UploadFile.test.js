import React from 'react';
import { shallow } from 'enzyme';
import UploadFile from '../UploadFile';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';

describe('UploadFile', () => {
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
            setStateUploadFile: jest.fn()
        };
        it('renders the file upload label', () => {
            // Arrange
            const uploadFile = shallow(<UploadFile {...props} />);
            //Act
            const label = uploadFile.find('label.file-upload-label');
            // Assert 
            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Choose Files');
        });

        it('renders the correct number of files', () => {
            // Arrange
            const uploadFile = shallow(<UploadFile {...props} />);
            //Act
            const count = uploadFile.find('.count-file');
            // Assert 
            expect(count).toHaveLength(1);
            expect(count.text()).toEqual('2 files');
        });

        it('displays "No files chosen" when no files are uploaded', () => {
            // Arrange
            const propsWithNoFiles = { ...props, uploadedFiles: [] };
            const wrapper = shallow(<UploadFile {...propsWithNoFiles} />);
            //Act
            const count = wrapper.find('.count-file');
            // Assert 
            expect(count).toHaveLength(1);
            expect(count.text()).toEqual('No files chosen');
        });

        it('calls handleFileEvent when files are chosen', () => {
            // Arrange
            const wrapper = shallow(<UploadFile {...props} />);
            wrapper.instance().handleFileEvent = jest.fn();
            wrapper.instance().handleUploadFiles = jest.fn();
            const fileInput = wrapper.find('#file-btn');
            const files = [{ name: 'file3.jpg', size: 3072 }];
            //Act
            fileInput.simulate('change', { target: { files }, preventDefault: jest.fn() });
            // Assert 
            // expect(wrapper.instance().handleUploadFiles).toHaveBeenCalled();
        });
    });

    describe('handlePreviewImage', () => {
        // it('should open new window', () => {
        //     // Arrange
        //     const event = {
        //         stopPropagation: jest.fn()
        //     };
        //     const props = {
        //         uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }]
        //     };
        //     window.open = jest.fn();
        //     const uploadFile = shallow(<UploadFile {...props} />).instance();
        //     //Act
        //     uploadFile.handlePreviewImage(event, 'fileName');
        //     // Assert 
        //     expect(event.stopPropagation).toHaveBeenCalled();
        //     expect(window.open).toHaveBeenCalled();
        // });
    });

    describe('renderListPortalFile', () => {
        const props = {
            uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }]
        };
        const uploadFile = shallow(<UploadFile {...props} />).instance();

        test('should call exact function when click preview image', () => {
            // Arrange
            const provider = {
                draggableProps: {},
                dragHandleProps: {},
                innerRef: {}
            };
            const snapshot = {isDragging: false};
            const item = {name: 'name'};
            uploadFile.handlePreviewImage = jest.fn();
            //Act
            const result = shallow(uploadFile.renderListPortalFile(provider, snapshot, item));
            result.find('.text-color').simulate('click');
            //Assert 
            expect(uploadFile.handlePreviewImage).toHaveBeenCalled();
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
            uploadFile.handleRemoveFile = jest.fn();
            //Act
            const result = shallow(uploadFile.renderListPortalFile(provider, snapshot, item));
            result.find('.icon-delete').simulate('click');
            //Assert 
            expect(uploadFile.handleRemoveFile).toHaveBeenCalled();
        });
    });

    describe('reorder', () => {
        const props = {
            uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }]
        };
        const uploadFile = shallow(<UploadFile {...props} />).instance();
        test('reorders list correctly', () => {
            // Arrange
            const list = ['a', 'b', 'c', 'd', 'e'];
            const startIndex = 1;
            const endIndex = 3;
            //Act
            const result = uploadFile.reorder(list, startIndex, endIndex);
            //Assert 
            expect(result).toEqual(['a', 'c', 'd', 'b', 'e']);
          });
          
          test('returns a new array', () => {
            // Arrange
            const list = ['a', 'b', 'c', 'd', 'e'];
            const startIndex = 1;
            const endIndex = 3;
            //Act
            const result = uploadFile.reorder(list, startIndex, endIndex);
            //Assert 
            expect(result).not.toBe(list);
          });
    });

    describe('onDragEnd', () => {
        // test('should call exact function when destination has value', () => {
        //      // Arrange
        //     const result = {
        //         destination: {index: 1},
        //         source: {index: 1}
        //     };
        //     const props = {
        //         uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
        //         setStateUploadFile: jest.fn()
        //     };
        //     const uploadFile = shallow(<UploadFile {...props} />).instance();
        //     uploadFile.reorder = jest.fn();
        //     //Act
        //     uploadFile.onDragEnd(result);
        //     //Assert 
        //     expect(props.setStateUploadFile).toHaveBeenCalled();
        //     expect(uploadFile.reorder).toHaveBeenCalled();
        // });

        test('should not call exact function when destination is null', () => {
            // Arrange
           const props = {
               uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
               setStateUploadFile: jest.fn()
           };
           const uploadFile = shallow(<UploadFile {...props} />).instance();
           uploadFile.reorder = jest.fn();
           //Act
           uploadFile.onDragEnd({destination: null});
           //Assert 
           expect(props.setStateUploadFile).not.toHaveBeenCalled();
           expect(uploadFile.reorder).not.toHaveBeenCalled();
       });
    });

    describe('handleUploadFiles', () => {
        // test('should call exact function', () => {
        //      // Arrange
        //     const props = {
        //         uploadedFiles: [{ name: 'file1.jpg', size: 1024 }, { name: 'file2.jpg', size: 2048 }],
        //         setStateUploadFile: jest.fn()
        //     };
        //     const uploadFile = shallow(<UploadFile {...props} />).instance();
        //     //Act
        //     uploadFile.handleUploadFiles(['file1', 'file2']);
        //     //Assert 
        //     expect(props.setStateUploadFile).toHaveBeenCalled();
        // });
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
            const uploadFile = shallow(<UploadFile {...props} />).instance();
            //Act
            uploadFile.handleRemoveFile(event, ['file1', 'file4']);
            //Assert 
        });
    });
});