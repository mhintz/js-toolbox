(function($) {

	// turns a text node into rainbow text
	$.fn.rainbow = function() {
		var colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", " #0000FF", "#4B0082", "#8B00FF"];
		this.each(function() {
			var txt = this.textContent,
				cntr = 0,
				spn;

			this.textContent = "";
			for (var i = 0, l = txt.length; i < l; ++i) {
				spn = $("<span>"+txt[i]+"</span>").css("color", colors[cntr % colors.length]).appendTo(this);
				if (txt[i] !== " ") cntr++;
			}
		});
		return this;
	};

})(jQuery);