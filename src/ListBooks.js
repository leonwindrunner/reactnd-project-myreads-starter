import React , { Component } from 'react'

class ListBooks extends Component {
	render() {
		let showingList = this.props.listBooks

		return (
			<div className="bookshelf-books">
        <ol className="books-grid">
        	{showingList.map(( book ) => (
        		<li key={book.id}>
	            <div className="book">
	              <div className="book-top">
	                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
	                <div className="book-shelf-changer">
	                  <select defaultValue={book.shelf} onChange={(event) => this.props.onMoveBook(book, event.target.value)}>
	                    <option value="none" disabled>Move to...</option>
	                    <option value="currentlyReading">Currently Reading</option>
	                    <option value="wantToRead">Want to Read</option>
	                    <option value="read">Read</option>
	                    <option value="none">None</option>
	                  </select>
	                </div>
	              </div>
	              <div className="book-title">{book.title}</div>
	              <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
	            </div>
	          </li>
        	))}
        </ol>
      </div>
		)
	}
}

export default ListBooks