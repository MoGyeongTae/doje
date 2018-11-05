import React, { PureComponent } from 'react';
import "./Board.scss"
import axios from 'axios';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { Well } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
class Board extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            board : {},
            comment : [],
            commentInput : ""
        }
    }

    componentDidMount() {
        this.getDatas();
    }

    getDatas = async () => {
        let boardData = await axios.get(`http://localhost:3001/board/${this.props.match.params.idx}`);
        let commentData = await axios.get(`http://localhost:3001/comment/${this.props.match.params.idx}`);

        Promise.all([boardData, commentData])
        .then(datas => {
            this.setState({
                board : datas[0].data,
                comment  : datas[1].data
            })
        })
    }

    deleteBoard = () => {
        if(localStorage.getItem("id") && localStorage.getItem("id") == this.state.board.writer) {
            axios.post(`http://localhost:3001/board/delete/${this.props.match.params.idx}`)
            .then(data => {
                if(data.data.result) {
                    this.props.history.push("/");
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            alert("자기거만 삭제가능");
        }
    } 

    modifyCheck = () => {
        if(localStorage.getItem("id") && localStorage.getItem("id") == this.state.board.writer ) {
            this.props.history.push(`/modify/${this.props.match.params.idx}`);
        } else {
            alert("자기거만 수정가능");
        }
    }

    commentChange = e => {
        this.setState({
            commentInput : e.target.value
        })
    }

    writeComment = () => {
        if(this.state.commentInput) {
            axios.post(`http://localhost:3001/comment/add/${this.props.match.params.idx}`, {writer : localStorage.getItem("id"), content : this.state.commentInput})
            .then(data => {
                console.log(data)
                if(data.data.result) {
                    this.setState({
                        commentInput : ""
                    })
                    this.getDatas();
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            alert("댓글을 입력");
            return;
        }
    }

    deleteComment = idx => {
        axios.post(`http://localhost:3001/comment/delete/${idx}`)
        .then(data => {
            if(data.data.result) {
                this.getDatas();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const commentlist = this.state.comment.map((item, idx) =>
            <ListGroupItem className="comment" key={idx}>
                <span>{item.writer}</span>
                <span> / </span>
                <span>{item.content}</span>
                <span> / </span>
                <span>{moment(item.date).format("YYYY-MM-DD kk:mm:ss")}</span>
                <span> / </span>
                <Button style={{color : "blue"}} onClick={
                    () => {
                        if(localStorage.getItem("id") && localStorage.getItem("id") != item.writer) {
                            alert("자기거만 삭제가능");
                            return;
                        }
                        this.deleteComment(item.idx)}
                    }>삭제</Button>
            </ListGroupItem>
        );
        return (
            <section className="content cl">
                <Well className="board-content">
                    <h3>게시물 조회</h3>
                    <p>제목 : {this.state.board.subject}</p>
                    <span style={{marginRight : "50px"}}>작성자 : {this.state.board.writer}</span>
                    <span>작성일 : {moment(this.state.board.date).format("YYYY-MM-DD kk:mm")}</span>
                    <p>{this.state.board.content}</p>
                </Well>
                <Well className="comment-content">
                    <p>댓글 조회</p>
                    <ListGroup>
                    {commentlist}
                    </ListGroup>
                </Well>
                <Well className="comment-write">
                    <p>댓글 작성</p>
                    <Form inline onSubmit={e => e.preventDefault()}>
                        <FormGroup>
                            <FormControl type="text" onChange={this.commentChange}/>
                        </FormGroup>
                        <Button onClick={this.writeComment}>작성완료</Button>
                    </Form>
                </Well>
                <ButtonGroup style={{float:"right"}}>
                    <Link to="/"><Button>목록</Button></Link>
                    <Button onClick={this.modifyCheck}>수정</Button>
                    <Button onClick={this.deleteBoard}>삭제</Button>
                </ButtonGroup>
            </section>
        )
    }
}

export default withRouter(Board);