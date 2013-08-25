define(['backbone'], function(Backbone) {
	var Msg = Backbone.Model.extend({
		defaults: {
			content: null
		}
	});
	
	return Msg;
});