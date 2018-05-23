import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import NotFoundPage from './NotFoundPage.js'

class BooksApp extends Component {
  state = {
    books: [],
    currentlyReadingBooks:[],
    wantToReadBooks:[],
    readBooks:[]
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
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

  moveBook(book, newShelf) {
    if (newShelf !== book.shelf) {
        BooksAPI.update(book, newShelf).then(() => {
          this.getBooks();
        });
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <ListBooks 
                      listBooks={this.state.currentlyReadingBooks} 
                      onMoveBook={(book, newShelf) => {
                        this.moveBook(book, newShelf);
                      }}/>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>     
                    <ListBooks 
                      listBooks={this.state.wantToReadBooks} 
                      onMoveBook={(book, newShelf) => {
                        this.moveBook(book, newShelf);
                      }}/>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <ListBooks 
                      listBooks={this.state.readBooks} 
                      onMoveBook={(book, newShelf) => {
                        this.moveBook(book, newShelf);
                      }}/>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Search a book</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={() => (
            <SearchBooks 
              listBooks={this.state.books}
              onMoveBook={(book, newShelf) => {
                this.moveBook(book, newShelf);
              }}/>
          )}/>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
