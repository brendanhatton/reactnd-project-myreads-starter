import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    searchResults: [],
    booksCurrentlyReading: [],
    booksWantToRead: [],
    booksRead: []
  }
  componentDidMount = () => {
    this.updateBooksFromServer()
  }

  updateBooksFromServer = () => {
    BooksAPI.getAll().then(allBooks => {
      console.log(allBooks)
      this.setState({
        booksCurrentlyReading: allBooks.filter((b) => b.shelf === 'currentlyReading'),
        booksWantToRead: allBooks.filter((b) => b.shelf === 'wantToRead'),
        booksRead: allBooks.filter((b) => b.shelf === 'read'),
      })
    })
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((searchResults) => {
      this.setState({ searchResults: searchResults })
    })
  }

  moveBookToShelf = (bookId, shelf) => {
    console.log('move to shelf' + bookId + ', ' + shelf)
    BooksAPI.get(bookId)
      .then(book => BooksAPI.update(book, shelf)
        .then(this.updateBooksFromServer()))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <ListBooks
            booksCurrentlyReading={this.state.booksCurrentlyReading}
            booksWantToRead={this.state.booksWantToRead}
            booksRead={this.state.booksRead}
            moveBookToShelf={this.moveBookToShelf}
          />
        )} />

        <Route path="/search" render={({ history }) => (
          <SearchBooks searchBooks={this.searchBooks} 
            searchResults={this.state.searchResults} 
            booksCurrentlyReading={this.state.booksCurrentlyReading}
            booksWantToRead={this.state.booksWantToRead}
            booksRead={this.state.booksRead}
            moveBookToShelf={this.moveBookToShelf} 
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
