/* jQuery Custom Radio Checkbox Plugin
* ----------------------------------------------------------
* Author: Denis Ciccale (dciccale@gmail.com)
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/ 
(function($) {
	$.fn.customRadioCheckbox = (function (options) {
		var	// initial context
			context = $('body'),
			// checked prefix
			checkedPrefix = '-checked',
			// function to force the input change when clicking on the fake input
			forceChange = function() {
				// only trigger if the input is not inside a label
				if (this.parentNode.nodeName.toLowerCase() !== 'label') $(this.previousSibling).trigger('change.crc', [true]); 
			},
			// fake input tag
			fakeInputTag = $(document.createElement('i')).bind('click.crc', forceChange),
			// object with each fake input and checked class
			fakeInput = {
				radio: fakeInputTag.clone(true).addClass('radio'),
				checkbox: fakeInputTag.clone(true).addClass('checkbox')
			},
			// function that inserts the fake input
			insertFakeInput = function(input, type) {
				// fake input
				var fakeInputClone = fakeInput[type].clone(true);
				
				// if is already checked add checked class
				if (input.checked) fakeInputClone.addClass(type + checkedPrefix);
				
				// insert the fake input after the input
				input.parentNode.insertBefore(fakeInputClone[0], input.nextSibling);
			};
			
		// the main function
		function customRadioCheckbox(_context) {
			// if context is defined means is the first init, if not use 'this'
			var context = _context || this;
			
			// if context element is not present return nothing, can't chain anyway
			if(!context.length) return;
			
			var rds = context.find('input[type=radio]').addClass('hideInput'), // find & hide radios
				chs = context.find('input[type=checkbox]').addClass('hideInput'); // find & hide checkboxes
			
			// only if there are radios
			if(rds.length) {
				rds.type = 'radio';
				// insert each fake radio
				$.each(rds, function (i) {
					insertFakeInput(rds[i], rds.type);
				});
				
				// bind radio change event
				context.delegate('input[type=' + rds.type + ']', 'change.crc', function (e, force) {
					// uncheck previous and remove checked class
					if (!force || !this.checked) {
						// filter by name and remove class from the last radio checked
						rds.filter('[name=' + this.name + ']').next().removeClass(rds.type + checkedPrefix);
						// add checked class to this input
						$(this).next().addClass(rds.type + checkedPrefix);
					}
					// if force set to true and is not already checked, check the input
					if (force && !this.checked) this.checked = true;
				});
			}
			
			// only if there are checkboxes
			if(chs.length) {
				chs.type = 'checkbox';
				// insert each fake checkbox
				$.each(chs, function (i) {
					insertFakeInput(chs[i], chs.type);
				});
				
				// bind checkbox change event
				context.delegate('input[type=' + chs.type + ']', 'change.crc', function (e, force) {
					// if force set to true, change state
					if (force) this.checked = !this.checked;
					
					// toggle checked class
					$(this).next().toggleClass(chs.type + checkedPrefix);
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