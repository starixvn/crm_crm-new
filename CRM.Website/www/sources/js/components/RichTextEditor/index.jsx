import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import ColorPic from "./ColorPic";
import AddOptionToolBar from "./AddOptionToolBar";
import InsertHorizontalRule from "./InsertHorizontalRule";

class index extends Component {
  state = {
    editorState: EditorState.createWithContent(
      ContentState.createFromText("Hello")
    )
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };
  

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            // editorState={editorState}
            toolbar={{
            options: ['inline','colorPicker','list', 'textAlign','blockType','link','remove','embedded', 'image'],
            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript']
            },
            blockType: {
              inDropdown: false,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
            }
            
            // colorPicker: {component: ColorPic},
            // image: {
            //   urlEnabled: true,
            //   uploadEnabled: true,
            //   alignmentEnabled: true,
            //   uploadCallback: undefined,
            //   previewImage: false,
            //   alt: { present: false, mandatory: false },
            //   defaultSize: {
            //     height: 'auto',
            //     width: 'auto'
            //   }
            // }
          }}
          toolbarCustomButtons={[<InsertHorizontalRule />]}
        />
        <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}
export default index;
