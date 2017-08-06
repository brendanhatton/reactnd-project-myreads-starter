import React, { Component } from 'react'

class Book extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        value: this.props.shelf,
    }

    handleChange(event) {
        this.props.moveBookToShelf(this.props.id, event.target.value, this.props.fromShelf)
        this.setState({ value: event.target.value });
    }

    render() {
        return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128, height: 193,
                    backgroundImage: `url(${this.props.imageUrl})`
                }}>
                </div>
                <div className="book-shelf-changer">
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors ? this.props.authors.join(", ") : ''}</div>
        </div>
    }
}

export default Book
