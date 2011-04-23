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
	
		var	context = $('body'),
			// radio checked class
			radioCheckedClass = 'radio-checked', 
			// checkbox checked class
			checkboxCheckedClass = 'checkbox-checked',
			// function to force the input change when clicking on the fake input
			forceChange = function() { 
				// only trigger if the input is not inside
				if (this.parentNode.nodeName.toLowerCase() != 'label') $(this.nextSibling).trigger('change.crc', [true]); 
			},
			// fake input tag
			fakeInputTag = $('<i>').click(forceChange),
			// fake radio
			fakeRadio = fakeInputTag.clone(true).addClass('radio'),
			// fake checkbox
			fakeCheckbox = fakeInputTag.clone(true).addClass('checkbox'),
			// other var
			fakeInputClone;
			
			
				
		function customRadioCheckbox(context) {
			// if context is defined means is the first init, if not use 'this'
			context = context || this;
			
			// if context element is not present return nothing, can't chain anyway
			if(!context.length) return;
			
			var rds = context.find('input:radio').addClass('hideInput'), // radio
				chs = context.find('input:checkbox').addClass('hideInput'); // checkbox
			
			// only if there are radios
			if(rds.length) {
				// radio
				rds.each(function () {			
					// fake input
					fakeInputClone = fakeRadio.clone(true);
					
					// if is checked
					if (this.checked) {
						// add checked class
						fakeInputClone.addClass(radioCheckedClass);
					}
					
					// insert fake input
					this.parentNode.insertBefore( fakeInputClone[0], this );
					
					// radio change event
					$(this).bind('change.crc', function (e, force) {
						// uncheck previous and remove checked class
						if (!force || !this.checked) {
							// filter by name and remove class from the last radio checked
							rds.filter('[name=' + this.name + ']').prev().removeClass(radioCheckedClass);
							$(this).prev().addClass(radioCheckedClass);
						}
						// if force set to true and is not already checked, check the input
						if (force && !this.checked) this.checked = true;
					});
				});
			}
			
			// only if there are checkboxes
			if(chs.length) {
				// checkbox
				chs.each(function () {
					// fake input
					fakeInputClone = fakeCheckbox.clone(true);
					
					// if is checked
					if (this.checked) {
						// add checked class
						fakeInputClone.addClass(checkboxCheckedClass);
					}
					
					// insert fake input
					this.parentNode.insertBefore( fakeInputClone[0], this );

					// checkbox change event
					$(this).bind('change.crc', function (e, force) {
						// if force set to true, change the input
						if (force) {
							this.checked = !this.checked;
						}
						
						// toggle the checkbox-checked class
						$(this).prev().toggleClass(checkboxCheckedClass);
					});
				});
			}
			// make it chainable
			return context;
		}
		
		// first init
		customRadioCheckbox(context);
		
		// return the function for future calls
		// for example on ajax callback for the loaded content if needed
		return customRadioCheckbox;
			
	})();
})(jQuery);