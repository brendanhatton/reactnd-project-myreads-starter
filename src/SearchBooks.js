import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
    state = {
        query: '',
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if (query.trim() !== '') {
            this.props.searchBooks(query.trim())
        }
    }

    getShelf = (bookId) => {
        let book = this.props.booksCurrentlyReading.filter((c) => c.id === bookId)
        if (book.length > 0) {
            return book[0].shelf
        }
        book = this.props.booksWantToRead.filter((c) => c.id === bookId)
        if (book.length > 0) {
            return book[0].shelf
        }
        book = this.props.booksRead.filter((c) => c.id === bookId)
        if (book.length > 0) {
            return book[0].shelf
        }
        return "none"
    }


    render() {
        const { query } = this.state.query
        const books = this.props.searchResults || []
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id} className='contact-list-item'>
                                <Book
                                    id={book.id}
                                    moveBookToShelf={this.props.moveBookToShelf}
                                    title={book.title}
                                    authors={book.authors}
                                    shelf={this.getShelf(book.id)}
                                    imageUrl={book.imageLinks.thumbnail} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
