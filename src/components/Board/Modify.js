import React, { PureComponent } from 'react';
import "./Board.scss"
import axios from 'axios';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { Well } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap';
class Modify extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            board : {
                subject : '',
                writer : '',
                date : '',
                content : ''
            },
        }
    }

    componentWillMount() {
        this.getDatas()
        .then(data => {
            this.setState({
                board : data.data
            })
        })
    }

    getDatas = async () => {
        let boardData = await axios.get(`http://localhost:3001/board/${this.props.match.params.idx}`);

        return boardData; 
    }

    subjectChange = e => {
        let {writer , date, content} = this.state.board
        this.setState({
            board : {
                subject : e.target.value,
                writer : writer,
                date : date,
                content : content
            }
        })
    }

    contentChange = e => {
        let {subject, writer, date} = this.state.board;
        this.setState({
            board : {
                subject : subject,
                writer : writer,
                date : date,
                content : e.target.value
            }
        })
    }

    modifyBoard = () => {
        if(!this.state.board.subject || !this.state.board.content) {
            alert("전부입력");
            return;
        } else {
            axios.post(`http://localhost:3001/board/modify/${this.props.match.params.idx}`, {subject : this.state.board.subject, content : this.state.board.content})
            .then(data => {
                console.log(data);
                if(data.data.result) {
                    this.props.history.push(`/board/${this.props.match.params.idx}`)
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        console.log(this.state.board)
        return (
            <section className="content cl">
                <Well className="board-content">
                    <h3>게시물 수정</h3>
                    <div>제목 : <FormControl type="text" value={this.state.board.subject} onChange={this.subjectChange}></FormControl></div>
                    <span>작성자 : <FormControl type="text" readOnly value={this.state.board.writer}></FormControl></span>
                    <span>작성일 : <FormControl type="text" readOnly value={moment(this.state.board.date).format("YYYY-MM-DD kk:mm:ss")}></FormControl></span>
                    <p>본문 내용 : <FormControl type="text" value={this.state.board.content} onChange={this.contentChange}></FormControl></p>
                </Well>
                <ButtonGroup style={{float:"right"}}>
                    <Link to="/"><Button>목록</Button></Link>
                    <Button onClick={this.modifyBoard}>수정</Button>
                </ButtonGroup>
            </section>
        )
    }
}

export default withRouter(Modify);