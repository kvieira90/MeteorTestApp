Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
	// This code is executed on the client side only

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});

	Meteor.subscribe("tasks");

	Meteor.startup(function() {
		ReactDOM.render(<App />, document.getElementById("render-target"));
	})
}

if (Meteor.isServer) {
	Meteor.publish("tasks", function() {
		return Tasks.find();
	});
}


Meteor.methods({
	addTask(text) {
		if(! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.insert({
			text: text, 
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},

	removeTask(taskId) {
		Tasks.remove(taskId);
	},

	setChecked(taskId, setChecked) {
		Tasks.update(taskId, {$set: {checked: setChecked} });
	},

	setPrivate(taskId, setToPrivate) {
		const task = Tasks.findOne(taskId);

		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, { $set: { private: setToPrivate }});
	}
});