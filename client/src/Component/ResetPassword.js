import React from "react";
import "./Todo.css";
class resetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            passwordReset: "",
        };
    }
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    };
    handlePassword = (e) => {
        this.setState({ passwordReset: e.target.value });
    };
    onSubmitReset = (e) => {
        e.preventDefault();
        fetch("https://todoapp1000.herokuapp.com/resetPassword", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.passwordReset,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                alert(res.message);
                this.props.onRouteChange("signin");
            })
            .catch((err) => console.log(err));
    };
    render() {
        return (
            <div className="Todo">
                <h1>Reset Password</h1>
                <form
                    id="to-do-list"
                    className="center"
                    onSubmit={this.onSubmitReset}
                >
                    <input
                        type="email"
                        placeholder="Enter your Email Id"
                        required
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        required
                        name="password"
                        value={this.state.passwordReset}
                        onChange={this.handlePassword}
                    />
                    <br />
                    <button style={{ margin: "20px" }} type="submit">
                        Reset
                    </button>
                </form>
            </div>
        );
    }
}

export default resetPassword;
