 /*!
  * jQuery Custom Radio Checkbox Plugin
  * Copyright (c) 2012 Denis Ciccale (@tdecs)
  * Released under MIT license (https://raw.github.com/dciccale/Custom-radio-checkbox/master/LICENSE.txt)
  */
(function ($) {
  $.fn.customRadioCheckbox = function (options) {
      // checked suffix
    var checkedSuffix = '-checked',

      // css class used to hide inputs
      hiddenInputClass = 'rc-hidden',

      // function to force the input change when clicking
      // on a fake input that is not wrapped by a label tag
      forceChange = function () {
        var $this = $(this);
        // only trigger if the input is not inside a label
        if (!$this.closest('label')[0]) {
          $this.prev().trigger('change.crc', [true]);
        }
      },

      // fake input tag
      fakeInputTag = $('<i>').bind('click.crc', forceChange),

      // function that inserts the fake input
      insertFakeInput = function (inputs) {
        var input, type = inputs.type, l = inputs.length, fakeInputClone;

        while (l--) {
          input = inputs[l];

          // fake input
          fakeInputClone = fakeInputTag.clone(true).addClass(type);

          // if is already checked add checked class
          if (input.checked) {
            fakeInputClone.addClass(type + checkedSuffix);
          }

          // insert the fake input after the input
          input.parentNode.insertBefore(fakeInputClone[0], input.nextSibling);
        }
      };

    return this.each(function () {
      // if context element is not present return undefined, can't chain anyway
      if (!this) {
        return;
      }

      var $context = $(this), rds, chs, rdsCache = {};

      // find & hide radios
      rds = $context.find('input[type=radio]:not(.' + hiddenInputClass + ')').addClass(hiddenInputClass);
      // find & hide checkboxes
      chs = $context.find('input[type=checkbox]:not(.' + hiddenInputClass + ')').addClass(hiddenInputClass);

      // only apply if there are radios
      if (rds.length) {
        rds.type = 'radio';

        // insert each fake radio
        insertFakeInput(rds);

        // bind radio change event
        rds.on('change.crc', function (e, force) {
          // uncheck previous and remove checked class
          if (!force || !this.checked) {
            // filter by name and remove class from the last radio checked
            // save this collection in cache obj for faster use
            if (!rdsCache[this.name]) {
              rdsCache[this.name] = rds.filter('[name="' + this.name + '"]').next();
            }

            // uncheck last checked from this group
            if (rdsCache[this.name].checked) {
              rdsCache[this.name].checked.removeClass(rds.type + checkedSuffix);
            }

            // add checked class to this input and save it as checked for this group
            rdsCache[this.name].checked = $(this.nextSibling).addClass(rds.type + checkedSuffix);
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
        chs.on('change.crc', function (e, force) {
          // force change state
          if (force) {
            this.checked = !this.checked;
          }

          // toggle checked class
          $(this.nextSibling).toggleClass(chs.type + checkedSuffix);
        });
      }
    });
  };

  // auto-init the plugin
  $(function () {
    $('body').customRadioCheckbox();
  });
}(jQuery));