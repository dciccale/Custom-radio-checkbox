/* jQuery Custom Radio Checkbox Plugin
* ----------------------------------------------------------
* Author: Denis Ciccale (dciccale@gmail.com)
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/ 
var styledInputs = (function ($) {
    var $this, fakeInput, inputType, checkedClass, ie = $.browser.msie, checkedPrefix = "-checked", labelInput;

    $("input:checkbox, input:radio").each(function () {
        $this = $(this);
        
        // ie does not check inputs inside label when missing attribute for="id"
        if (ie) {
            $this.parents("label")
            .click(function (e) {
				e.preventDefault();
				labelInput = $(this).find("input:checkbox, input:radio");
                labelInput.attr("checked", !labelInput.is(":checked")).change();
            });
        }

        // hide input
        $this.hide();

        // input type
        inputType = $this.is(":checkbox") ? "checkbox" :
                    $this.is(":radio") ? "radio" : "";

        // checked class
        checkedClass = inputType + checkedPrefix;

        // fake input
        fakeInput = $("<span>").addClass(inputType).insertBefore($this);

        // if is checked
        if ($this.is(":checked")) fakeInput.addClass(checkedClass);

        // checkbox change event
        if (inputType == "checkbox") {
            $this.bind("change.styledCheckbox",function () {
                checkedClass = "checkbox" + checkedPrefix;
                $(this).prev().toggleClass(checkedClass)
            });
        }

        // radio change event
        else if (inputType == "radio") {
            $this.bind("change.styledRadio",function () {
                checkedClass = "radio" + checkedPrefix;
                $("input:radio[name=" + $(this).attr("name") + "]").prev().removeClass(checkedClass);
                $(this).prev().addClass(checkedClass)
            });
        }
    });
})(jQuery);