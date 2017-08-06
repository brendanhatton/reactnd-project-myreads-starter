import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books && this.props.books.map((book) => (
                            <li key={book.id} className='contact-list-item'>
                                <Book
                                    id={book.id}
                                    moveBookToShelf={this.props.moveBookToShelf}
                                    fromShelf={this.props.fromShelf}
                                    title={book.title}
                                    authors={book.authors}
                                    shelf={book.shelf}
                                    imageUrl={book.imageLinks.thumbnail} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}
export default Shelf