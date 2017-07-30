;
(function($) {

  var defaults = {
    menuSpeedAnimate: 600,
    pageNavigationSpeedAnimate: 1500,
    btnClassMenu: 'btn-menu',
    stickyMenu: false,
    stickyMenuClassName: 'fixed',
    slidingLine: false,
    slidingLineClassName: 'sliding-line',
    slidingLineClassNameActive: 'active',
    slidingLineColor: '#ffffff',
    slidingLineHeight: '3px',
    slidingLineSpeedAnimate: 200,
    winMobWidth: 500,
    waypointTrackedClassName: 'tracked',
  };

  function SimpleMenu(element, options, Waypoint) {
    this.config = $.extend({}, defaults, options);
    this.element = element;
    this.Waypoint = Waypoint;
    this.init();
  }
  SimpleMenu.prototype.init = function() {
    var conf = this.config;
    this.getClasses();
    this.simpleMenu();
    this.simpleMenuStyles();

    conf.stickyMenu && this.stickyMenu();
    conf.slidingLine && this.slidingLine();
  };

  SimpleMenu.prototype.getClasses = function() {
    var conf = this.config;

    function getClass(name) {
      return "." + name;
    };

    this.btnClassMenu = getClass(conf.btnClassMenu);
    this.slidingLineClassName = getClass(conf.slidingLineClassName);
    this.slidingLineClassNameActive = getClass(conf.slidingLineClassNameActive);
    this.waypointTrackedClassName = getClass(conf.waypointTrackedClassName);
  };

  SimpleMenu.prototype.simpleMenuStyles = function() {
    var _this = this,
      el = this.element,
      _window = $(window);
    el.css({
      'display': 'block',
      'position': 'relative',
      'width': '100%',
    });

    el.find('ul a').css({
      'cursor': 'pointer',
      'display': 'block',
      'text-decoration': 'none',
    });

    function refreshsimpleMenuStyles() {
      if (_window.width() < _this.config.winMobWidth) {
        el.find('ul').css({
          'position': 'absolute',
          'width': '100%',
        });
        el.find('li').css({
          'display': 'block',
        });
        el.find(_this.btnClassMenu).css({
          'display': 'block',
          'text-decoration': 'none',
        });
      } else {
        el.find('ul').css({
          'width': '100%',
        });
        el.find('li').css({
          'display': 'inline-block',
        });
        el.find(_this.btnClassMenu).css({
          'display': 'none',
        });
      }
    }

    refreshsimpleMenuStyles();

    _window.resize(function() {
      refreshsimpleMenuStyles();
    });
  };

  SimpleMenu.prototype.simpleMenu = function() {
    var conf = this.config,
      el = this.element,
      _window = $(window),
      menuUl = el.find('ul'),
      menuLi = el.find('li'),
      btnMenu = el.find(this.btnClassMenu),
      winMobWidth = conf.winMobWidth,
      top = 0;

    if (_window.width() < winMobWidth) {
      menuUl.hide();
    }

    btnMenu.click(function() {
      menuUl.slideToggle('slow');
    });

    menuLi.on("click", "a", function(e) {
      e.preventDefault();

      var id = $(this).attr('href');
      top = $(id).offset().top - menuLi.outerHeight(true);


      $('body,html').animate({
        scrollTop: top
      }, conf.pageNavigationSpeedAnimate);

    });

    _window.resize(function() {
      if (_window.width() > winMobWidth) {
        menuUl.removeAttr('style');
      } else {
        menuUl.hide();
      }
    });

  };

  SimpleMenu.prototype.stickyMenu = function() {
    var conf = this.config,
      stickyMenuClassName = conf.stickyMenuClassName,
      el = this.element,
      _window = $(window),
      menuClone = $('<div/>').insertAfter(el),
      menuHeight, // height of menu
      menuPosition, // position of  menu
      windowPosition; // position of window

    function addStickyStyles() {
      el.addClass(stickyMenuClassName);
      el.css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
      });
    }

    function removeStickyStyles() {
      el.removeClass(stickyMenuClassName);
      el.css({
        'position': 'relative',
        'top': '',
        'left': '',
        'width': '100%',
      });
    }

    function refresh() {
      menuPosition = el.offset().top;
      menuHeight = el.outerHeight(true);
    }
    refresh();

    _window.resize(refresh);

    menuClone.css('height', menuHeight).hide();

    _window.scroll(function() {
      windowPosition = _window.scrollTop();
      if (windowPosition >= menuPosition) {
        addStickyStyles();
        menuClone.show();
      } else {
        removeStickyStyles();
        menuClone.hide();
      }
    });

  };

  SimpleMenu.prototype.slidingLine = function() {
    var _this = this,
      conf = this.config,
      el = this.element,
      _window = $(window),
      line,
      active = conf.slidingLineClassNameActive,
      activeLi,
      menuLi = el.find('li'),
      lineWidth,
      liPos;

    function insertLine() {
      if (el.find(_this.slidingLineClassName).length == 0) {
        line = $('<div class="' + conf.slidingLineClassName + '">').appendTo(el);
      }
    }

    function refreshPosition() {
      activeLi = el.find('li.' + active);
      if (activeLi.length !== 0) {
        lineWidth = activeLi.outerWidth();
        liPos = activeLi.position().left;
      }
    }

    function setLine() {
      line.css({
        'position': 'absolute',
        'background-color': conf.slidingLineColor,
        'bottom': '0',
        'height': conf.slidingLineHeight,
      }).animate({
        'left': liPos,
        'width': lineWidth
      }, conf.slidingLineSpeedAnimate);
    }

    function checkMob() {
      _window.width() > conf.winMobWidth ? line.show() : line.hide();
    }

    function moveLine() {
      refreshPosition();
      setLine();
    }

    function refreshLine() {
      insertLine();
      moveLine();
      checkMob();
    }

    function test(hash) {
      menuLi.removeClass('active');

      $.each(menuLi, function() {
        if ($(this).children('a').attr('href').slice(1) == hash) {
          $(this).addClass('active');
          moveLine();
        }
      });
    }

    refreshLine();

    if (!$.isEmptyObject(this.Waypoint)) {
      var waypointTracked = $(this.waypointTrackedClassName);

      waypointTracked.waypoint({
        handler: function(direction) {
          test(this.element.id);
        },
        offset: '30%',
      });
      waypointTracked.waypoint({
        handler: function(direction) {
          test(this.element.id);
        },
        offset: -menuLi.outerHeight(true),
      });
    } else {
      //todo without waypoint
    }
    _window.resize(function() {
      refreshLine();
    });
  };


  $.fn.simpleMenu = function(options) {
    var first = this.first();
    options = options || {};
    Waypoint = window.Waypoint || {};
    new SimpleMenu(first, options, Waypoint);
    return first;
  };

})(jQuery);;
