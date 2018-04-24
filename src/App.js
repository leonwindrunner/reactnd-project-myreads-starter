import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'

class BooksApp extends Component {
  state = {
    showSearchPage: false,
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ListBooks listBooks={this.state.currentlyReadingBooks}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>     
                  <ListBooks listBooks={this.state.wantToReadBooks}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks listBooks={this.state.readBooks}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
