import React, { PureComponent } from 'react';
import "./Add.scss";

import { FormControl, Button } from 'react-bootstrap';

class Add extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            writer : "",
            title : "",
            content : ""
        }
    }

    onWriterChange = e => {
        this.setState({writer : e.target.value})
    }

    onTitleChange = e => {
        this.setState({title : e.target.value})
    }

    onContentChange = e => {
        this.setState({content : e.target.value})
    }

    onWrite = e => {

    }

    render() {
        return (
            <div className="boardAdd">
                <section className="container">
                    <p>게시물 작성</p>
                    <table className="addForm">
                        <tr>
                            <th>작성자</th>
                            <td><FormControl type="text"/></td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td><FormControl type="text"/></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><FormControl componentClass="textarea"/></td>
                        </tr>
                    </table>
                    <div className="buttonGroup">
                        <Button>목록</Button>
                        <Button onClick={this.onWrite}>완료</Button>
                    </div>
                </section>
            </div>
        )
    }
}

export default Add;