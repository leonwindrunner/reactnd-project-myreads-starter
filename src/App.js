import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
    currentlyReadingBooks:[],
    wantToReadBooks:[],
    readBooks:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

    BooksAPI.getAll().then((books) => {
      let currentlyReadingBooks = books.filter( book => book.shelf === "currentlyReading")
      this.setState({ currentlyReadingBooks })
    })

    BooksAPI.getAll().then((books) => {
      let wantToReadBooks = books.filter( book => book.shelf === "wantToRead")
      this.setState({ wantToReadBooks })
    })

    BooksAPI.getAll().then((books) => {
      let readBooks = books.filter( book => book.shelf === "read")
      this.setState({ readBooks })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ListBooks listBooks={this.state.currentlyReadingBooks} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>     
                  <ListBooks listBooks={this.state.wantToReadBooks} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks listBooks={this.state.readBooks} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Search a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks listBooks={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
