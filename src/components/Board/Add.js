import React, { PureComponent } from 'react';
import "./Add.scss";
import axios from 'axios'

import { FormControl, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'

class Add extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            subject : "",
            content : ""
        }
    }
    onSubjectChange = e => {
        this.setState({subject : e.target.value})
    }

    onContentChange = e => {
        this.setState({content : e.target.value})
    }

    onWrite = e => {
        let {subject, content} = this.state;
        let writer = localStorage.getItem("id");
        if(!subject || !content) {
            alert("전부입력");
            return;
        }
        axios.post("http://localhost:3001/board/add", {writer : writer, subject : subject, content : content})
        .then(data => {
            if(data.data.result) {
                this.props.history.push("/");
            }
        })
        .catch(err => {

        })
    }

    render() {
        return (
            <div className="boardAdd">
                <section className="container">
                    <p>게시물 작성</p>
                    <table className="addForm">
                        <tr>
                            <th>작성자</th>
                            <td><FormControl type="text" readOnly value={localStorage.getItem("id")}/></td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td><FormControl type="text" onChange={this.onSubjectChange}/></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><FormControl componentClass="textarea" onChange={this.onContentChange}/></td>
                        </tr>
                    </table>
                    <div className="buttonGroup">
                        <Link to="/"><Button>목록</Button></Link>
                        <Button onClick={this.onWrite}>완료</Button>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Add);