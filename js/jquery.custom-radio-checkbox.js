/* jQuery Custom Radio Checkbox Plugin
* ----------------------------------------------------------
* Author: Denis Ciccale (dciccale@gmail.com)
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/ 
(function($) {
	$.fn.customRadioCheckbox = (function () {
		var // radio
			rds = $("input:radio").addClass("hideInput"),
			// checkbox
			chs = $("input:checkbox").addClass("hideInput"), 
			// radio checked class
			radioCheckedClass = "radio-checked", 
			// checkbox checked class
			checkboxCheckedClass = "checkbox-checked", 
			// fake input tag
			fakeInputTag = $("<span>"),
			// fake radio
			fakeRadio = fakeInputTag.clone().addClass("radio"),
			// fake checkbox
			fakeCheckbox = fakeInputTag.clone().addClass("checkbox"),
			// if ie
			ie = $.browser.msie,
			// if opera
			opera = $.browser.opera,
			// other vars
			fakeInputClone;
		
		// only do this if there are radios
		if(rds.length) {
			// radio
			rds.each(function () {			
				// fake input
				fakeInputClone = fakeRadio.clone();
				
				// if is checked
				if (this.checked) {
					// add checked class
					fakeInputClone.addClass(radioCheckedClass);
				}
				
				// insert fake input
				this.parentNode.insertBefore( fakeInputClone[0], this );
				
				// radio change event
				$(this).bind("change.styledRadio",function () {
					// filter by name and remove class from the last radio checked
					rds.filter("[name=" + this.name + "]").prev().removeClass(radioCheckedClass);
					$(this).prev().addClass(radioCheckedClass);
				});
			});
		}
		
		// only do this if there are checkboxes
		if(chs.length) {
			// checkbox
			chs.each(function () {
				// fake input
				fakeInputClone = fakeCheckbox.clone();
				
				// if is checked
				if (this.checked) {
					// add checked class
					fakeInputClone.addClass(checkboxCheckedClass);
				}
				
				// insert fake input
				this.parentNode.insertBefore( fakeInputClone[0], this );

				// checkbox change event
				$(this).bind("change.styledCheckbox",function () {
					$(this).prev().toggleClass(checkboxCheckedClass);
				});
			});
		}
		
	})();
})(jQuery);