import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';

export default class InsertHorizontalRule extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  handleReturnSoftNewline = () => {
    const { editorState, onChange } = this.props;
        let selection = editorState.getSelection();
    //   if (selection.isCollapsed()) {
    //     onChange(RichUtils.insertSoftNewline(editorState));
    //   } else {
        let content = editorState.getCurrentContent();
        let newContent = Modifier.removeRange(content, selection, 'forward');
        let newSelection = newContent.getSelectionAfter();
        let block = newContent.getBlockForKey(newSelection.getStartKey());
        newContent = Modifier.insertText(
          newContent,
          newSelection,
          '\n',
          block.getInlineStyleAt(newSelection.getStartOffset()),
          null,
        );
        onChange(
          EditorState.push(editorState, newContent, 'insert-fragment')
        );
    //   }
    //   return true;
  }

  render() {
    return (
      <div onClick={this.handleReturnSoftNewline}>Horizontal Rule</div>
    );
  }
}