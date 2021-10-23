import React from 'react';
import Editor from 'wangeditor'
import { Card, Col, } from "antd"
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown';
class RichText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorContent: '',
        }
    }

    refs = React.createRef()

    componentDidMount() {
        this.Initializae(this.props)
    }

    Initializae(props) {
        const elemTitle = this.refs.editorElemTitle;
        const elemMenu = this.refs.editorElemMenu;
        const elemContent = this.refs.editorElemContent;
        const editor = new Editor(elemTitle, elemMenu, elemContent)
        editor.config.onchange = () => {
            console.log("text", editor.txt.html())
            this.setState({
                editorContent: editor.txt.html()
            })
        }
        editor.config.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.config.uploadImgShowBase64 = true
        editor.create()
        editor.txt.html(props?.value)
    }
    render() {
        return (
            <div className="richText-container">
                <div className="richText-body">
                    <div className="richText-title" ref="editorElemTitle"></div>
                    <div className="richText-menu" ref="editorElemMen"></div>
                    <div className="richText-content" ref="editorElemContent"></div>
                </div>
                {/* <Col className="gutter-row" md={8}>
                    <Card title="同步转换HTML" bordered={false}>
                        <pre>{draftToHtml(this.state.editorContent)}</pre>
                    </Card>
                </Col>
                <Col className="gutter-row" md={8}>
                    <Card title="同步转换MarkDown" bordered={false}>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>
                            {draftToMarkdown(this.state.editorContent)}
                        </pre>
                    </Card>
                </Col>
                <Col className="gutter-row" md={8}>
                    <Card title="同步转换JSON" bordered={false}>
                        <pre style={{ whiteSpace: 'normal' }}>
                            {JSON.stringify(this.state.editorContent)}
                        </pre>
                    </Card>
                </Col> */}
            </div>
        )
    }
}
export default RichText;