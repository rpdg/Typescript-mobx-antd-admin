import React from 'react'
import { DraftEditor } from '../../../components'
import { convertToRaw } from 'draft-js'
import { Row, Col, Card } from 'antd'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
// https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/index.js

interface IState {
  editorContent: any
}

export class EditorPage extends React.Component<any, IState> {
  constructor (props) {
    super(props)
    this.state = {
      editorContent: '',
    }
  }
  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
    })
  }
  render () {
    const { editorContent } = this.state
    const colProps = {
      lg: 12,
      md: 24,
    }
    const textareaStyle = {
      minHeight: 496,
      width: '100%',
      background: '#f7f7f7',
      borderColor: '#F1F1F1',
      padding: '16px 8px',
    }
    return (<div className="content-inner">
      <Row gutter={32}>
        <Col {...colProps}>
          <Card title="Editor" style={{ overflow: 'visible' }}>
            <DraftEditor
              wrapperStyle={{
                minHeight: 500,
              }}
              editorStyle={{
                minHeight: 376,
              }}
              editorState={editorContent}
              onEditorStateChange={this.onEditorStateChange}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="HTML">
            <textarea
              style={textareaStyle}
              disabled
              value={editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : ''}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="Markdown">
            <textarea
              style={textareaStyle}
              disabled
              value={editorContent ? draftToMarkdown(convertToRaw(editorContent.getCurrentContent())) : ''}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="JSON">
            <textarea
              style={textareaStyle}
              disabled
              value={editorContent ? JSON.stringify(convertToRaw(editorContent.getCurrentContent())) : ''}
            />
          </Card>
        </Col>
      </Row>
    </div>)
  }
}