TaskForm = React.createClass({
	handleSubmit(event) {
		event.preventDefault();

		var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Meteor.call("addTask", text);

		ReactDOM.findDOMNode(this.refs.textInput).value = "";
	},

	render() {
		return(
			<form className="new-task" onSubmit={this.handleSubmit} >
				<input type="text" ref="textInput" placeholder="Type to add new tasks" />
			</form>
		);
	}
});