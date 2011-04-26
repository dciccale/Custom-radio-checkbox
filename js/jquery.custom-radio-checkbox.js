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
			// you may pass an object with your own radioCheckedClass or checkboxCheckedClass
			options = options || {},
			// radio checked class
			radioCheckedClass = options.radioCheckedClass || 'radio-checked', 
			// checkbox checked class
			checkboxCheckedClass = options.checkboxCheckedClass || 'checkbox-checked',
			// function to force the input change when clicking on the fake input
			forceChange = function() {
				// only trigger if the input is not inside a label
				if (this.parentNode.nodeName.toLowerCase() != 'label') $(this.nextSibling).trigger('change.crc', [true]); 
			},
			// fake input tag
			fakeInputTag = $(document.createElement('i')).click(forceChange),
			// object with each fake input and checked class
			fakeInput = {
				radio: {
					tag: fakeInputTag.clone(true).addClass('radio'),
					checkedClass: radioCheckedClass
				},
				checkbox: {
					tag: fakeInputTag.clone(true).addClass('checkbox'),
					checkedClass: checkboxCheckedClass
				}
			},
			// function that inserts the fake input
			insertFakeInput = function(input, type) {
				// fake input
				var fakeInputClone = fakeInput[type].tag.clone(true);
				
				// if is already checked
				if (input.checked) {
					// add checked class
					fakeInputClone.addClass(fakeInput[type].checkedClass);
				}
				
				// insert fake input
				input.parentNode.insertBefore(fakeInputClone[0], input);
			};
			
		// the main function
		function customRadioCheckbox(context) {
			// if context is defined means is the first init, if not use 'this'
			context = context || this;
			
			// if context element is not present return nothing, can't chain anyway
			if(!context.length) return;
			
			var rds = context.find('input:radio').addClass('hideInput'), // radios
				chs = context.find('input:checkbox').addClass('hideInput'); // checkboxes
			
			// only if there are radios
			if(rds.length) {
				// insert each fake radio
				$.each(rds, function (i) {
					insertFakeInput(rds[i], 'radio');
				});
				
				// bind radio change event
				rds.bind('change.crc', function (e, force) {
					// uncheck previous and remove checked class
					if (!force || !this.checked) {
						// filter by name and remove class from the last radio checked
						rds.filter('[name=' + this.name + ']').prev().removeClass(radioCheckedClass);
						// add checked class to this input
						$(this).prev().addClass(radioCheckedClass);
					}
					// if force set to true and is not already checked, check the input
					if (force && !this.checked) this.checked = true;
				});
			}
			
			// only if there are checkboxes
			if(chs.length) {
				// insert each fake checkbox
				$.each(chs, function (i) {
					insertFakeInput(chs[i], 'checkbox');
				});
				
				// bind checkbox change event
				chs.bind('change.crc', function (e, force) {
					// if force set to true, change state
					if (force) this.checked = !this.checked;
					
					// toggle checked class
					$(this).prev().toggleClass(checkboxCheckedClass);
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