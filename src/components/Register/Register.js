import React, { PureComponent } from 'react';
import "./Register.scss";

import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

class Register extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id : "",
            pw : "",
            isLoading : false,
            errorMsg : ""
        }
    }

    onIdChange = e => {
        this.setState({id : e.target.value});
    }

    onPwChange = e => {
        this.setState({pw : e.target.value});
    }

    onRegister = e => {
        let {id, pw} = this.state;
        if(!id || !pw) {
            alert("전부 입력해주세요");
            return;
        }
        this.setState({isLoading : true});
        axios.post("http://localhost:3001/register", {id : id, pw : pw})
        .then(data => {
            console.log(data)
            if(data.data.result) {
                this.setState({isLoading : false});
                this.props.history.push("/login");
            } else {
                this.setState({isLoading : false});
                alert(`${data.data.msg}`);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="register">
                <section className="container cl">
                    <h3>회원가입</h3>
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
                    onClick={!this.state.isLoading ? this.onRegister : null} 
                    disabled={this.state.isLoading}>
                    {this.state.isLoading ? "잠시만 기다려주세요.." : "회원가입"}
                    </Button>
                </section>
            </div>
        )
    }
}

export default withRouter(Register);