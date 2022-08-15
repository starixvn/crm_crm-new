import React from 'react';
import { RenderContent } from '../RenderContent';
import { Form } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import { shallow } from 'enzyme';

describe('RenderContent', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('renderCollapse', () => {
        const props = {
            isEdit: true,
            values: {},
            errors: {},
            touched: {},
            collapse: {},
            handleChange: jest.fn(),
            setFieldValue: jest.fn(),
            handleCollapseExpand: jest.fn()
        };

        it('handleChange should call exact function when handleCollapse', () => {
            // Arrange

            // Act
            const container = shallow(<RenderContent {...props} />).instance();
            const renderEdit = shallow(container.render());
            renderEdit.find(Form.Group).at(0).simulate('click');
            renderEdit.find(Form.Group).at(1).simulate('click');
            renderEdit.find(Form.Group).at(2).simulate('click');
        });

        it('handleChange should call exact function when remark render', () => {
            // Arrange
            // Act
            const container = shallow(<RenderContent {...props} />).instance();
            const renderEdit = shallow(container.render());
            renderEdit.find(CkEditor).at(0).simulate('change', 'value');
            
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('remark','value');
        });

        it('handleChange should call exact function when solution render', () => {
            // Arrange

            // Act
            const container = shallow(<RenderContent {...props} />).instance();
            const renderEdit = shallow(container.render());
            renderEdit.find(CkEditor).at(1).simulate('change', 'value');
            
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('solution','value');
        });

        it('handleChange should call exact function when isReviewed render check', () => {
            // Arrange
            const event = { 
                target: {checked: true}
            }; 
            // Act
            const container = shallow(<RenderContent {...props} />);
            container.find('input').at(0).simulate('change', event);
            
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isReviewed', true);
        });

        it('handleChange should call exact function when review render', () => {
            // Act
            const renderEdit = shallow(<RenderContent {...props} />);
            renderEdit.find(CkEditor).at(2).simulate('change', 'value');
            
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('review', 'value');
        });
    });
});