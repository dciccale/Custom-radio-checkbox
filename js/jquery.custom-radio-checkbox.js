 /*!
  * jQuery Custom Radio Checkbox Plugin
  * Copyright (c) 2012 Denis Ciccale (@tdecs)
  * Released under MIT license (https://raw.github.com/dciccale/Custom-radio-checkbox/master/LICENSE.txt)
  */
(function ($) {
  $.fn.customRadioCheckbox = (function (options) {
    // initial context
    var context = $('body'),
      // checked suffix
      checkedSuffix = '-checked',
      // function to force the input change when clicking on the fake input
      forceChange = function () {
        // only trigger if the input is not inside a label
        if (this.parentNode.nodeName.toLowerCase() !== 'label') {
          $(this.previousSibling).trigger('change.crc', [true]);
        }
      },
      // fake input tag
      fakeInputTag = $(document.createElement('i')).bind('click.crc', forceChange),
      // object with each fake input and checked class
      fakeInput = {
        radio: fakeInputTag.clone(true).addClass('radio'),
        checkbox: fakeInputTag.clone(true).addClass('checkbox')
      },
      // function that inserts the fake input
      insertFakeInput = function (inputs) {
        var input, type = inputs.type, l = inputs.length, fakeInputClone;

        while (l--) {
          input = inputs[l];

          // fake input
          fakeInputClone = fakeInput[type].clone(true);

          // if is already checked add checked class
          if (input.checked) {
            fakeInputClone.addClass(type + checkedSuffix);
          }

          // insert the fake input after the input
          input.parentNode.insertBefore(fakeInputClone[0], input.nextSibling);
        }
      };

    // the main function
    function customRadioCheckbox(_context) {
      // if context is defined means is the first init, if not use 'this'
      var context = _context || this, rds, chs, rdsCache = {};

      // if context element is not present return undefined, can't chain anyway
      if (!context.length) {
        return;
      }

      // find & hide radios
      rds = context.find('input[type=radio]:not(.hideInput)').addClass('hideInput');
      // find & hide checkboxes
      chs = context.find('input[type=checkbox]:not(.hideInput)').addClass('hideInput');

      // only apply if there are radios
      if (rds.length) {
        rds.type = 'radio';
        // insert each fake radio
        insertFakeInput(rds);

        // bind radio change event
        rds.bind('change.crc', function (e, force) {
          // uncheck previous and remove checked class
          if (!force || !this.checked) {
            // filter by name and remove class from the last radio checked
            // save this collection in cache obj for faster use
            if (!rdsCache[this.name]) {
              rdsCache[this.name] = rds.filter('[name="' + this.name + '"]').next();
            }
            rdsCache[this.name].removeClass(rds.type + checkedSuffix);

            // add checked class to this input
            $(this.nextSibling).addClass(rds.type + checkedSuffix);
          }
          // if force set to true and is not already checked, check the input
          if (force && !this.checked) {
            this.checked = true;
          }
        });
      }

      // only apply if there are checkboxes
      if (chs.length) {
        chs.type = 'checkbox';
        // insert each fake checkbox
        insertFakeInput(chs);

        // bind checkbox change event
        chs.bind('change.crc', function (e, force) {
          // if force set to true, change state
          if (force) {
            this.checked = !this.checked;
          }

          // toggle checked class
          $(this.nextSibling).toggleClass(chs.type + checkedSuffix);
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
  }());
}(jQuery));