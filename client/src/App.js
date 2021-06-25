import React from "react";
import Todo from "./Component/Todo.js";
import Signup from "./Component/Signup.js";
import Signin from "./Component/Signin.js";
import ResetPassword from "./Component/ResetPassword.js";
import Navigation from "./Component/Navigation.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: "signin",
            isSignedIn: false,
            user: {
                id: "",
                email: "",
                password: "",
            },
        };
    }

    loadUser = (user_id) => {
        this.setState({
            user: {
                id: user_id,
            },
        });
    };
    onRouteChange = (route) => {
        if (route === "signout") {
            fetch("https://todoapp1000.herokuapp.com/signout", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: this.state.user.id,
                }),
            })
                .then((res) => res.json())
                .catch((err) => console.log(err));

            this.setState({
                route: "signin",
                isSignedIn: false,
                user: {
                    id: "",
                    email: "",
                    password: "",
                },
            });

        } 
        else if (route === "home") {
            this.setState({ 
                route:route,
                isSignedIn: true 
            });
        }
        else if(route==="signup")
        {
            this.setState({ route: route });
        }
        else if(route==="signin")
        {
            this.setState({ route: route }); 
        }
        else if(route==="resetPassword")
        {
            this.setState({ route: route }); 
        }
    };
    render() {
        const { isSignedIn, route } = this.state;
        return (
            <div>
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                {route === "home" ? (
                    <div>
                        <Todo id={this.state.user.id} />
                    </div>
                ) : route === "signin" ? (
                    <Signin
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                    />
                ) : route==="signup" ? (
                    <Signup
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                    />
                ) : (
                    <ResetPassword
                        onRouteChange={this.onRouteChange}
                    /> 
                )}
            </div>
        );
    }
}

export default App;
