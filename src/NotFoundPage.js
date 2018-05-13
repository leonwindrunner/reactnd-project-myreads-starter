import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFoundPage extends Component {
	render() {
		return (
			<div>
				Page not found.
				<Link to='/'>Go back</Link>
			</div>
		)
	}
}

export default NotFoundPage