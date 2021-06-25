import React from "react";
import "./Todo.css";

class signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
        };
    }
    handleEmail = (e) => {
        this.setState({ signInEmail: e.target.value });
    };
    handlePassword = (e) => {
        this.setState({ signInPassword: e.target.value });
    };
    onSubmitSignIn = (e) => {
        e.preventDefault();
        fetch("https://todoapp1000.herokuapp.com/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.signInEmail,
                password: this.state.signInPassword,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if(res.id)
                {
                this.props.loadUser(res.id);
                this.props.onRouteChange("home");
                }
                else
                {
                 alert("Wrong username or password");
                }
            })
            .catch((err) => console.log(err));
    };
    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="Todo">
                <h1>Agenda</h1>
                <form
                    id="to-do-list"
                    className="center"
                    onSubmit={this.onSubmitSignIn}
                >
                    <input
                        type="email"
                        placeholder="Enter your Email Id"
                        required
                        name="email"
                        value={this.state.signInEmail}
                        onChange={this.handleEmail}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        required
                        name="password"
                        value={this.state.signInPassword}
                        onChange={this.handlePassword}
                    />
                    <br />
                    <button style={{ margin: "20px" }} type="submit">
                        Sign In
                    </button>
                </form>
                <p className="center">
                    Do not have an account?Click here
                    <span
                        className="link pointer underline dim"
                        onClick={() => onRouteChange("signup")}
                    >
                        Sign Up
                    </span>
                </p>
                <p className="center link pointer underline dim" style={{color:"blue"}} onClick={() => onRouteChange("resetPassword")}>
                    Forgot Password?
                </p>

            </div>
        );
    }
}

export default signin;
