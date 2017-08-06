import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    searchResults: [],
    currentlyReading: [],
    wantToRead: [],
    booksRead: []
  }
  componentDidMount = () => {
    this.updateBooksFromServer()
  }

  updateBooksFromServer = () => {
    BooksAPI.getAll().then(allBooks => {
      this.setState({
        currentlyReading: allBooks.filter((b) => b.shelf === 'currentlyReading'),
        wantToRead: allBooks.filter((b) => b.shelf === 'wantToRead'),
        read: allBooks.filter((b) => b.shelf === 'read'),
      })
    })
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((searchResults) => {
      //respond to code review
      if (this.state.searchResults != searchResults) {
        this.setState({ searchResults: Array.from(new Set(searchResults)) })
      }
    })
  }

  moveBookToShelf = (bookId, toShelf, fromShelf) => {
    console.log('move to shelf' + bookId + ', ' + toShelf)
    let newBook
    if (fromShelf && fromShelf !== 'none') {
      let fromShelfUpdated = this.state[fromShelf].filter((b) => b.id !== bookId)
      newBook = Promise.resolve(this.state[fromShelf].filter((b) => b.id === bookId)[0])
      this.setState({ [fromShelf]: fromShelfUpdated })
    } else {
      newBook = BooksAPI.get(bookId)
    }

    newBook.then((newBook) => {
      let toShelfUpdated = this.state[toShelf].concat(newBook)
      this.setState({ [toShelf]: toShelfUpdated })

      BooksAPI.update(newBook, toShelf)
    })



  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <ListBooks
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            moveBookToShelf={this.moveBookToShelf}
          />
        )} />

        <Route path="/search" render={({ history }) => (
          <SearchBooks searchBooks={this.searchBooks}
            searchResults={this.state.searchResults}
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            moveBookToShelf={this.moveBookToShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
