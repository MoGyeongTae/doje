import React, { PureComponent } from 'react';
import "./Main.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { runInThisContext } from 'vm';

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            board : []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/board")
        .then(data => {
            this.setState({board : data.data})
        })
        .catch(err => {
            console.log(err);
        })
    }

    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        this.forceUpdate();
    }
    render() {
        const boardlist = this.state.board.map((item, idx) =>
            <tr key="idx">
                <td>{item.idx}</td>
                <td>{item.writer}</td>
                <td><Link to={`/board/${item.idx}`}>{item.subject}</Link></td>
                <td>{item.content}</td>
                <td>{moment(item.date).format("YYYY-MM-DD kk:mm:ss")}</td>
            </tr>
        ) 
        return (
            <div className="main">
                <section className="container cl">
                    <span>총 {this.state.board.length}개의 게시물이 있습니다.</span>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>작성자</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {boardlist}
                        </tbody>
                    </Table>
                    {
                        localStorage.getItem("token") &&
                        <div>
                            <Link to="/add"><Button style={{float : "right"}}>작성</Button></Link>
                            <Button style={{float : "right"}} onClick={this.logout}>로그아웃</Button>
                        </div>
                    }
                    {
                        !localStorage.getItem("token") &&
                        <div>
                            <Link to="/login"><Button style={{float : "right"}}>로그인</Button></Link>
                            <Link to="/register"><Button style={{float : "right"}}>회원가입</Button></Link>
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Main;