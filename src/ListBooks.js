import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.booksCurrentlyReading.map((book) => (
                                        <li key={book.id} className='contact-list-item'>
                                            <Book
                                                id={book.id}
                                                moveBookToShelf={this.props.moveBookToShelf}
                                                title={book.title}
                                                authors={book.authors}
                                                shelf={book.shelf}
                                                imageUrl={book.imageLinks.thumbnail} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.booksWantToRead.map((book) => (
                                        <li key={book.id} className='contact-list-item'>
                                            <Book
                                                id={book.id}
                                                moveBookToShelf={this.props.moveBookToShelf}
                                                title={book.title}
                                                authors={book.authors}
                                                shelf={book.shelf}
                                                imageUrl={book.imageLinks.thumbnail} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.booksRead.map((book) => (
                                        <li key={book.id} className='contact-list-item'>
                                            <Book
                                                id={book.id}
                                                moveBookToShelf={this.props.moveBookToShelf}
                                                title={book.title}
                                                authors={book.authors}
                                                shelf={book.shelf}
                                                imageUrl={book.imageLinks.thumbnail} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
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