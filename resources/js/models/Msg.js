define(['backbone'], function(Backbone) {
	var Msg = Backbone.Model.extend({
		defaults: {
			msg: null
		}
	});
	
	return Msg;
});