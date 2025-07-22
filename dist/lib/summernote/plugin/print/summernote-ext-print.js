(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {
  // Extends lang for print plugin.
  $.extend(true, $.summernote.lang, {
    'en-US': {
      print: {
        print: 'Print'
      }
    },
    'sk-SK': {
      print: {
        print: 'Tlačiť'
      }
    },
    'cs-CZ': {
      print: {
        print: 'Tisknout'
      }
    },
    'ko-KR': {
      print: {
        print: '인쇄'
      }
    },
    'pt-BR': {
      print: {
        print: 'Imprimir'
      }
    }
  });

  // Extends plugins for print plugin.
  $.extend($.summernote.plugins, {
    /**
     * @param {Object} context - context object has status of editor.
     */
    'print': function (context) {
      var self = this;

      // ui has renders to build ui elements.
      //  - you can create a button with `ui.button`
      var ui = $.summernote.ui;
      var $editor = context.layoutInfo.editor;
      var options = context.options;
      var lang = options.langInfo;

      // add print button
      context.memo('button.print', function () {
        // create button
        var button = ui.button({
          contents: '<i class="fa fa-print" style="font-size:14px"/> ',
          tooltip: lang.print.print,
          click: function () {
            var $doc = self.$printframe.contents().find('body');
            $doc.empty();
            $doc.append('<div id="print-header"></div>');
            $doc.append('<div id="print-content"></div>');
            $doc.append('<div id="print-footer"></div>');
            var $head = $doc.find("#print-header");
            $head.append('<div class="col"><div><span>Meno:</span><strong>'+$('#patient_data-name').text()+'</strong></div><div><span>Poisťovňa:</span><strong>'+$('#patient_data-insurance').text()+'</strong></div></div>');
            $head.append('<div class="col"><div><span>Rodné číslo:</span><strong>'+$('#patient_data-ident').text()+'</strong></div><div><span>Dát.narodenia:</span><strong>'+$('#patient_data-born').text()+'</strong></div><div><span>Telefón:</span><strong>'+$('#patient_data-phone').text()+'</strong></div></div>');
            $head.append('<div class="col"><div><span>Bydlisko:</span><strong>'+$('#patient_data-address').html()+'</strong></div></div>');
            var $text = $doc.find("#print-content");
            $text.append('<p>----- '+'d.m.y H:i'+' '+'Meno lekára'+'</p>');
            $text.append(context.invoke('code'));
            var $foot = $doc.find("#print-footer");
            $foot.append('Poučenie.....');
            setTimeout(function () {
              window.frames.summernotePrintFrame.window.focus();
              window.frames.summernotePrintFrame.window.print();
            }, 250);
          }
        });
        // create jQuery object from button instance.
        var $print = button.render();
        return $print;
      });

      this.initialize = function () {
        var $container = options.dialogsInBody ? $(document.body) : $editor;

        this.$printframe = $(
          '<iframe name="summernotePrintFrame"' +
          'width="0" height="0" frameborder="0" src="about:blank" style="visibility:hidden">' +
          '</iframe>');
        this.$printframe.appendTo($container.parent());

        var $head = this.$printframe.contents().find('head');
        if (options.print && options.print.stylesheetUrl) {
          // Use dedicated styles
          var css = document.createElement('link');
          css.href = options.print.stylesheetUrl;
          css.rel = 'stylesheet';
          css.type = 'text/css';
          $head.append(css);
        } else {
          // Inherit styles from document
          $('style, link[rel=stylesheet]', document).each(function () {
            $head.append($(this).clone());
          });
        }
      };

      this.destroy = function () {
        this.$printframe.remove();
        this.$printframe = null;
      };
    }
  });
}));