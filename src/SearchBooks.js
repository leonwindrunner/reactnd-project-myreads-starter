import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'

class SearchBoosk extends Component {
	state= {
		query: ''
	}

	updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }


	render() {
		let showingBooks

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = this.props.listBooks.filter((book) => match.test(book.title))
    } else {
      showingBooks = this.props.listBooks
    }

    showingBooks.sort(sortBy('title'))

		return (
			<div className="search-books">
			  <div className="search-books-bar">
			  	<Link className="close-search" to='/'>Close</Link>			    
			    <div className="search-books-input-wrapper">
			      <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
			    </div>
			  </div>

			  {showingBooks.length !== this.props.listBooks.length && (
          <div className='showing-books'>
            <span>Now showing {showingBooks.length} of {this.props.listBooks.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

			  <div className="search-books-results">
			    <ol className="books-grid">
	        	{showingBooks.map(( book ) => (
	        		<li key={book.id}>
		            <div className="book">
		              <div className="book-top">
		                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
		                <div className="book-shelf-changer">
		                  <select>
		                    <option value="none" disabled>Move to...</option>
		                    <option value="currentlyReading">Currently Reading</option>
		                    <option value="wantToRead">Want to Read</option>
		                    <option value="read" selected>Read</option>
		                    <option value="none">None</option>
		                  </select>
		                </div>
		              </div>
		              <div className="book-title">{book.title}</div>
		              <div className="book-authors">{book.authors[0]}</div>
		            </div>
		          </li>
	        	))}
	        </ol>
			  </div>
			</div>
		)
	}
}

export default SearchBoosk