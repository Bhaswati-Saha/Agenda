import React from "react";
import "./Todo.css";
import ListItems from "./ListItems.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox.js";
library.add(faTrash);

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: {
                text: "",
                key: "",
            },
            searchfield: "",
        };
    }
    handleInput = (e) => {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now(),
            },
        });
    };
    addItem = (e) => {
        e.preventDefault();
        let newItem = this.state.currentItem;

        if (newItem.text !== "") {
            fetch("https://todoapp1000.herokuapp.com/todo/", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: this.props.id,
                    todo: newItem.text,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    newItem.key = res.todoId;
                    const newItems = [...this.state.items, newItem];
                    this.setState({
                        items: newItems,
                        currentItem: {
                            text: "",
                            key: "",
                        },
                    });
                })
                .catch((err) => console.log(err));
        }
    };

    deleteItem = (key) => {
        const filteredItems = this.state.items.filter(
            (item) => item.key !== key
        );
        this.setState({
            items: filteredItems,
        });

        fetch("https://todoapp1000.herokuapp.com/todo/", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: this.props.id,
                todoId: key,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    };
    setUpdate = (text, key) => {
        const { items } = this.state;
        items.map((item) => {
            if (item.key === key) item.text = text;
            return item;
        });
        this.setState({ items: items });

        fetch("https://todoapp1000.herokuapp.com/todo/", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: this.props.id,
                todoId: key,
                todo: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    };
    onSearchChange = (e) => {
        this.setState({ searchfield: e.target.value });
    };

    componentDidMount() {
        fetch(`https://todoapp1000.herokuapp.com/todo/${this.props.id}`)
            .then((res) => res.json())
            .then((todolist) => this.setState({ items: todolist }));
    }
    render() {
        const { items, searchfield } = this.state;
        const filteredItems = items.filter((item) => {
            return item.text.toLowerCase().includes(searchfield.toLowerCase());
        });

        return (
            <div className="Todo">
                <header>
                    <h1>Your Agenda</h1>
                    <form id="to-do-list" onSubmit={this.addItem}>
                        <input
                            type="text"
                            placeholder="Enter text"
                            required
                            value={this.state.currentItem.text}
                            onChange={this.handleInput}
                        />
                        <button type="submit">Add</button>
                        <SearchBox searchChange={this.onSearchChange} />
                    </form>
                </header>
                <ListItems
                    items1={filteredItems}
                    deleteItem={this.deleteItem}
                    setUpdate={this.setUpdate}
                ></ListItems>
            </div>
        );
    }
}

export default Todo;
