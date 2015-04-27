// Run this function when main template is rendered
Template.allclues.rendered = function(){
	setTimeout(function(){
		masonize(function(){
			$('.search-query').focus();
		})
	}, 500); // run for half a second
}

// Uses masonry backend
function masonize(callback) {
	var container = $('#cluebox')
	container.masonry({
		itemSelector:'.item',
		gutter:20
	})
	if(callback){
		callback()
	};

}

Template.addclue.events({
	// tmpl is the template in html file
	'click .save':function(evt,tmpl){
		var title = tmpl.find('.title').value;
		var description = tmpl.find('.description').value;
		var url = tmpl.find('.src').value;
		var height = getRandomInt(200,300);
		// I could optionally add height and width into the database
		Clues.insert({title:title, description:description, src:url, height:height});
		Session.set('adding_clue', false);
	},
	'click .cancel':function(evt,tmpl){
		Session.set('adding_clue', false);
	},
	'click .close':function(evt,tmpl){
		Session.set('adding_clue', false);
	}
})

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Variables

Template.allclues.helpers({
	adding_clue: function(){
		return Session.get('adding_clue');
	},
	clues: function(){
		return Clues.find({mpprofileid: this._id});
	}
})