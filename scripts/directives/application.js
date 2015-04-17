angular
  .module('khe')
  .directive('application', ['$compile', function ($compile) {

    return {

      restrict: 'E',
      templateUrl: '/application.html',

      link: function (scope, element, attrs) {
        $compile(element.contents())(scope);

        jQuery(document).ready(function ($) {

          $.fn.extend({
            slideUpIn: function (callback) {
              this.fadeIn(50).animate({
                'top': '30vh'
              }, 200, callback);
              return this;
            },
            slideUpOut: function (callback) {
              this.animate({
                'top': '-100vh'
              }, 200).fadeOut(50, callback);
              return this;
            },
            slideDownIn: function (callback) {
              this.fadeIn(50).animate({
                'top': '30vh'
              }, 200, callback);
              return this;
            },
            slideDownOut: function (callback) {
              this.animate({
                'top': '200vh'
              }, 200).fadeOut(50, callback);
              return this;
            }
          });

          var steps = {
            steps: [],
            current: 0,

            addStep: function (elem) {
              this.steps.push(elem);
            },

            setForm: function (elem) {
              this.form = elem;
            },

            start: function () {
              var self = this;

              // prevent tab
              $(document).keydown(function(e) {
                if (e.keyCode == 9) {
                  e.preventDefault();
                }
              });

              // listen for enter and shift+enter
              this.steps.forEach(function (step) {
                step.hide();
                step.keypress(function (event) {
                  if (event.keyCode == 13 && !event.shiftKey) {
                    if (self.current < self.steps.length - 1) {
                      event.preventDefault();
                      self.next();
                    }
                  } else if (event.keyCode == 13 && event.shiftKey) {
                    event.preventDefault();
                    self.prev();
                  }
                });
              });

              // show the first item
              this.steps[0].slideUpIn(function () {
                $(this).children('input, label, select, button').focus();
              });
            },

            next: function () {
              if (this.current < this.steps.length - 1) {
                this.steps[this.current].slideUpOut();
                this.current++;
                this.steps[this.current].slideUpIn(function () {
                  $(this).children('input, label, select, button').focus();
                });
              }
            },

            prev: function () {
              if (this.current != 0) {
                this.steps[this.current].slideDownOut();
                this.current--;
                this.steps[this.current].slideDownIn(function () {
                  $(this).children('input, label, select, button').focus();
                });
              }
            }
          };

          steps.addStep($('#application #name'));
          steps.addStep($('#application #phone'));
          steps.addStep($('#application #school'));
          steps.addStep($('#application #shirt'));
          steps.addStep($('#application #dietary'));
          steps.addStep($('#application #age'));
          steps.addStep($('#application #gender'));
          steps.addStep($('#application #class'));
          steps.addStep($('#application #first'));
          steps.addStep($('#application #major'));
          steps.addStep($('#application #travel'));
          steps.addStep($('#application #agreements'));
          steps.addStep($('#application #submit'));

          steps.start();

        });
      }

    };

  }]);