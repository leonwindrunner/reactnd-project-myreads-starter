import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBoosk extends Component {
	state= {
		query: '',
		books: [],
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
    BooksAPI.search(query).then((books) => {
      this.setState({ books })

    }).catch(() => {

    })
  }

	render() {

		return (
			<div className="search-books">
			  <div className="search-books-bar">
			  	<Link className="close-search" to='/'>Close</Link>			    
			    <div className="search-books-input-wrapper">
			      <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
			    </div>
			  </div>

				{
					(this.state.books && this.state.books.length>0)  ? (
				    <div className="search-books-results">
					    <ol className="books-grid">
			        	{this.state.books.map(( book ) => (
			        		<li key={book.id}>
				            <div className="book">
				              <div className="book-top">
				                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
				                <div className="book-shelf-changer">
				                  <select defaultValue={book.shelf} onChange={(event) => this.props.onMoveBook(book, event.target.value)}>
				                    <option value="none" disabled>Move to...</option>
				                    <option value="currentlyReading" >Currently Reading</option>
				                    <option value="wantToRead">Want to Read</option>
				                    <option value="read">Read</option>
				                    <option value="none">None</option>
				                  </select>
				                </div>
				              </div>
				              <div className="book-title">{book.title}</div>
				              <div className="book-authors">{book.authors}</div>
				            </div>
				          </li>
			        	))}
			        </ol>
					  </div>
				  ) : (
			      <div className="no-result">	
			      	No Results
			      </div>
				  )
				}
				
			</div>
		)
	}
}

export default SearchBoosk