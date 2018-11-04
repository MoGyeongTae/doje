import React, { PureComponent } from 'react';
import axios from 'axios';
import "./Login.scss";

import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id : "",
            pw : "",
            isLoading : false,
        }
    }

    onIdChange = e => {
        this.setState({id : e.target.value});
    }

    onPwChange = e => {
        this.setState({pw : e.target.value});
    }

    onLogin = e => {
        this.setState({isLoading : true});
        let {id, pw} = this.state;
        if(!id || !pw) {
            this.setState({isLoading : false});
            alert("모두 입력해주세요");
            return;
        }

        axios.post("http://localhost:3001/login",{id : id, pw : pw})
        .then(data => {
            console.log(data);
            if(data.data.result) {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("id", data.data.info.id);
                localStorage.setItem("name", data.data.info.name);
                this.props.history.push("/");
            } else {
                alert(data.data.msg);
                this.setState({isLoading : false});
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="login">
                <section className="container cl">
                    <h3>로그인</h3>
                    <Form horizontal onSubmit={e => e.preventDefault()}>
                        <FormGroup controlId="formId">
                            아이디
                            <FormControl type="text" placeholder="ID" onChange={this.onIdChange}/>
                        </FormGroup>
                        <FormGroup controlId="formPw">
                            비밀번호
                            <FormControl type="password" placeholder="Pw" onChange={this.onPwChange}/>
                        </FormGroup>
                    </Form>
                    <Button bsStyle="info" block
                    disabled={this.state.isLoading}
                    onClick={this.onLogin}>
                    {this.state.isLoading ? "잠시만 기다려주세요.." : "로그인"}
                    </Button>
                </section>
            </div>
        )
    }
}

export default withRouter(Login);