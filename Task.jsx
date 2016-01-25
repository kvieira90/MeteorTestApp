Task = React.createClass({
	propTypes: {
		task: React.PropTypes.object.required
	},

	toggleChecked() {
		Meteor.call("setChecked", this.props.task._id, !this.props.task.checked);
	},

	deleteThisTask() {
		Meteor.call("removeTask", this.props.task._id);
	},

	render() {
		const taskClassName = this.props.task.checked ? "checked" : '';
		return( 
			<li className={taskClassName}> 
				{this.props.task.username === this.props.cuser.username ? 
					<button className="delete" onClick={this.deleteThisTask}>
						&times;
					</button> : '' }

				<input
					type="checkbox"
					readOnly={true}
					checked={this.props.task.checked}
					onClick={this.toggleChecked} />

				<span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
			</li>
		);
	}
});