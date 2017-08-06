import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class ListBooks extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf shelfTitle='Currently Reading' books={this.props.currentlyReading} moveBookToShelf={this.props.moveBookToShelf} fromShelf='currentlyReading' />
                        <Shelf shelfTitle='Want to Read' books={this.props.wantToRead} moveBookToShelf={this.props.moveBookToShelf} fromShelf='wantToRead' />
                        <Shelf shelfTitle='Read' books={this.props.read} moveBookToShelf={this.props.moveBookToShelf} fromShelf='read' />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks