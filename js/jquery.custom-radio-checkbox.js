/* jQuery Custom Radio Checkbox Plugin
* ----------------------------------------------------------
* Author: Denis Ciccale (dciccale@gmail.com)
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/ 
var styledInputs = (function ($) {
    var // checkbox
		chs = $("input:checkbox").addClass("hideInput"), 
		// radio
		rds = $("input:radio").addClass("hideInput"),
		// checkbox checked class
		checkboxCheckedClass = "checkbox-checked" , 
		// radio checked class
		radioCheckedClass = "radio-checked", 
		// fake input tag
		fakeInputTag = $("<span>"),
		// if ie
		ie = $.browser.msie,
		// if opera
		opera = $.browser.opera,
		// fake checkbox
		fakeCheckbox = fakeInputTag.clone().addClass("checkbox"),
		// fake radio
		fakeRadio = fakeInputTag.clone().addClass("radio"), 
		// other vars
		$this, fakeInputClone;
	
	// ie and opera does not toggle an input inside label when missing attribute for="id" and/or when the input is hidden with css
	if (ie || opera) {
		var labelInput;
		$("label").click(function (e) {
			e.preventDefault();
			labelInput = $(this).find("input:checkbox, input:radio");
			labelInput.attr("checked", !labelInput.is(":checked")).change();
		});
	}
	
	
	chs.each(function () {
		$this = $(this);

		// fake input
		fakeInputClone = fakeCheckbox.clone();
		
		// if is checked
		if ($this[0].checked) fakeInputClone.addClass(checkboxCheckedClass);
		
		// insert fake input
		this.parentNode.insertBefore( fakeInputClone[0], this );

		// checkbox change event
		$this.bind("change.styledCheckbox",function () {
			$(this).prev().toggleClass(checkboxCheckedClass);
		});
	});
	
	rds.each(function () {
		$this = $(this);
		
		// fake input
		fakeInputClone = fakeRadio.clone();
		
		// if is checked
		if ($this[0].checked) {
			// add checked class
			fakeInputClone.addClass(radioCheckedClass);
		}
		
		// insert fake input
		this.parentNode.insertBefore( fakeInputClone[0], this );
		

		$this.bind("change.styledRadio",function () {
			$("input:radio[name=" + $(this).attr("name") + "]").prev().removeClass(radioCheckedClass);
			$(this).prev().addClass(radioCheckedClass);
		});
	});
})(jQuery);