App = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			hideCompleted: false
		}
	},

	getMeteorData() {
		let query = {};

		if (this.state.hideCompleted) {
			query = {checked: {$ne: true}};
		}

		return{
			tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
			incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
			currentUser: Meteor.user()
		}
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
				return <Task key={task._id} task={task} cuser={this.data.currentUser || {username: ''}}/>;
		});
	},

	toggleHideCompleted() {
		this.setState({hideCompleted: !this.state.hideCompleted});
	},

	render() {
		return (
			<div className="container">
				<header>
					<h1> Todo Listasdfasd ({this.data.incompleteCount})</h1>
					<label className="hide-completed">
						<input
							type="checkbox"
							readOnly={true}
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted} />
							Hide Completed Tasks
					</label>

					<AccountsUIWrapper />

					{ this.data.currentUser ? <TaskForm /> : '' }
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
});