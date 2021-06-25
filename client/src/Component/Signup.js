import React from "react";
import "./Todo.css";
class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: "",
            signUpPassword: "",
        };
    }
    handleEmail = (e) => {
        this.setState({ signUpEmail: e.target.value });
    };
    handlePassword = (e) => {
        this.setState({ signUpPassword: e.target.value });
    };
    onSubmitSignUp = (e) => {
        e.preventDefault();
        fetch("https://todoapp1000.herokuapp.com/signup", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.signUpEmail,
                password: this.state.signUpPassword,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.props.loadUser(res.id);
                this.props.onRouteChange("home");
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
                    onSubmit={this.onSubmitSignUp}
                >
                    <input
                        type="email"
                        placeholder="Enter your Email Id"
                        required
                        name="email"
                        value={this.state.signUpEmail}
                        onChange={this.handleEmail}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        required
                        name="password"
                        value={this.state.signUpPassword}
                        onChange={this.handlePassword}
                    />
                    <br />
                    <button style={{ margin: "20px" }} type="submit">
                        Sign Up
                    </button>
                </form>
                <p className="center">
                    Already have an account?Click here
                    <span
                        className="link pointer underline dim"
                        onClick={() => onRouteChange("signin")}
                    >
                        Sign In
                    </span>
                </p>
            </div>
        );
    }
}

export default signup;
