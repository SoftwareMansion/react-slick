'use strict';

exports.__esModule = true;
exports.InnerSlider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eventHandlers = require('./mixins/event-handlers');

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _helpers = require('./mixins/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _initialState = require('./initial-state');

var _initialState2 = _interopRequireDefault(_initialState);

var _defaultProps = require('./default-props');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _innerSliderUtils = require('./utils/innerSliderUtils');

var _track = require('./track');

var _dots = require('./dots');

var _bar = require('./bar');

var _arrows = require('./arrows');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InnerSlider = exports.InnerSlider = (0, _createReactClass2.default)({
  displayName: 'InnerSlider',

  mixins: [_helpers2.default, _eventHandlers2.default],
  list: null, // wraps the track
  track: null, // component that rolls out like a film
  listRefHandler: function listRefHandler(ref) {
    this.list = ref;
  },
  trackRefHandler: function trackRefHandler(ref) {
    this.track = ref;
  },
  getInitialState: function getInitialState() {
    return _extends({}, _initialState2.default, {
      currentSlide: this.props.initialSlide
    });
  },
  componentWillMount: function componentWillMount() {
    if (this.props.init) {
      this.props.init();
    }
    if (this.props.lazyLoad) {
      var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)((0, _objectAssign2.default)({}, this.props, this.state));
      if (slidesToLoad.length > 0) {
        this.setState(function (prevState, props) {
          return { lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad) };
        });
        if (this.props.onLazyLoad) {
          this.props.onLazyLoad(slidesToLoad);
        }
      }
    }
  },
  componentDidMount: function componentDidMount() {
    // Hack for autoplay -- Inspect Later
    this.initialize(this.props);
    this.adaptHeight();

    // To support server-side rendering
    if (!window) {
      return;
    }
    if (window.addEventListener) {
      window.addEventListener('resize', this.onWindowResized);
    } else {
      window.attachEvent('onresize', this.onWindowResized);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.animationEndCallback) {
      clearTimeout(this.animationEndCallback);
    }
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onWindowResized);
    } else {
      window.detachEvent('onresize', this.onWindowResized);
    }
    if (this.state.autoPlayTimer) {
      clearInterval(this.state.autoPlayTimer);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // probably unneccessary code - commented resolves problem with setState
    // if (this.props.slickGoTo != nextProps.slickGoTo) {
    //   if (process.env.NODE_ENV !== 'production') {
    //     console.warn('react-slick deprecation warning: slickGoTo prop is deprecated and it will be removed in next release. Use slickGoTo method instead')
    //   }
    //   this.changeSlide({
    //     message: 'index',
    //     index: nextProps.slickGoTo,
    //     currentSlide: this.state.currentSlide
    //   });
    // } else if (this.state.currentSlide >= nextProps.children.length) {
    //   this.update(nextProps);
    //   this.changeSlide({
    //     message: 'index',
    //     index: nextProps.children.length - nextProps.slidesToShow,
    //     currentSlide: this.state.currentSlide
    //   });
    // } else {
    //   this.update(nextProps);
    // }
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.props.reInit) {
      this.props.reInit();
    }
    if (this.props.lazyLoad) {
      var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)((0, _objectAssign2.default)({}, this.props, this.state));
      if (slidesToLoad.length > 0) {
        this.setState(function (prevState, props) {
          return { lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad) };
        });
        if (this.props.onLazyLoad) {
          this.props.onLazyLoad(slidesToLoad);
        }
      }
    }
    // if (this.props.onLazyLoad) {
    //   this.props.onLazyLoad([leftMostSlide])
    // }
    this.adaptHeight();
  },
  onWindowResized: function onWindowResized() {
    this.update(this.props);
    // animating state should be cleared while resizing, otherwise autoplay stops working
    this.setState({
      animating: false
    });
    clearTimeout(this.animationEndCallback);
    delete this.animationEndCallback;
  },
  slickPrev: function slickPrev() {
    var _this = this;

    // this and fellow methods are wrapped in setTimeout
    // to make sure initialize setState has happened before
    // any of such methods are called
    setTimeout(function () {
      return _this.changeSlide({ message: 'previous' });
    }, 0);
  },
  slickNext: function slickNext() {
    var _this2 = this;

    setTimeout(function () {
      return _this2.changeSlide({ message: 'next' });
    }, 0);
  },
  slickGoTo: function slickGoTo(slide) {
    var _this3 = this;

    slide = Number(slide);
    !isNaN(slide) && setTimeout(function () {
      return _this3.changeSlide({
        message: 'index',
        index: slide,
        currentSlide: _this3.state.currentSlide
      });
    }, 0);
  },
  render: function render() {
    var className = (0, _classnames2.default)('slick-initialized', 'slick-slider', this.props.className, {
      'slick-vertical': this.props.vertical
    });

    var trackProps = {
      fade: this.props.fade,
      cssEase: this.props.cssEase,
      speed: this.props.speed,
      infinite: this.props.infinite,
      centerMode: this.props.centerMode,
      focusOnSelect: this.props.focusOnSelect ? this.selectHandler : null,
      currentSlide: this.state.currentSlide,
      lazyLoad: this.props.lazyLoad,
      lazyLoadedList: this.state.lazyLoadedList,
      rtl: this.props.rtl,
      slideWidth: this.state.slideWidth,
      slideHeight: this.state.slideHeight,
      listHeight: this.state.listHeight,
      vertical: this.props.vertical,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: this.props.slidesToScroll,
      slideCount: this.state.slideCount,
      trackStyle: this.state.trackStyle,
      variableWidth: this.props.variableWidth,
      unslick: this.props.unslick,
      centerPadding: this.props.centerPadding
    };

    var dots;

    if (this.props.dots === true && this.state.slideCount >= this.props.slidesToShow) {
      var dotProps = {
        dotsClass: this.props.dotsClass,
        slideCount: this.state.slideCount,
        slidesToShow: this.props.slidesToShow,
        currentSlide: this.state.currentSlide,
        slidesToScroll: this.props.slidesToScroll,
        clickHandler: this.changeSlide,
        children: this.props.children,
        customPaging: this.props.customPaging,
        infinite: this.props.infinite,
        appendDots: this.props.appendDots
      };

      dots = _react2.default.createElement(_dots.Dots, dotProps);
    }

    var bar;

    if (this.props.bar === true && this.state.slideCount >= this.props.slidesToShow) {
      var barProps = {
        barClass: this.props.barClass,
        barThumbClass: this.props.barThumbClass,
        slideCount: this.state.slideCount,
        slidesToShow: this.props.slidesToShow,
        currentSlide: this.state.currentSlide,
        listWidth: this.state.listWidth
      };

      bar = _react2.default.createElement(_bar.Bar, barProps);
    }

    var prevArrow, nextArrow;

    var arrowProps = {
      infinite: this.props.infinite,
      centerMode: this.props.centerMode,
      currentSlide: this.state.currentSlide,
      slideCount: this.state.slideCount,
      slidesToShow: this.props.slidesToShow,
      prevArrow: this.props.prevArrow,
      nextArrow: this.props.nextArrow,
      clickHandler: this.changeSlide
    };

    if (this.props.arrows) {
      prevArrow = _react2.default.createElement(_arrows.PrevArrow, arrowProps);
      nextArrow = _react2.default.createElement(_arrows.NextArrow, arrowProps);
    }

    var verticalHeightStyle = null;

    if (this.props.vertical) {
      verticalHeightStyle = {
        height: this.state.listHeight
      };
    }

    var centerPaddingStyle = null;

    if (this.props.vertical === false) {
      if (this.props.centerMode === true) {
        centerPaddingStyle = {
          padding: '0px ' + this.props.centerPadding
        };
      }
    } else {
      if (this.props.centerMode === true) {
        centerPaddingStyle = {
          padding: this.props.centerPadding + ' 0px'
        };
      }
    }

    var listStyle = (0, _objectAssign2.default)({}, verticalHeightStyle, centerPaddingStyle);
    var listProps = {
      className: 'slick-list',
      style: listStyle,
      onMouseDown: this.swipeStart,
      onMouseMove: this.state.dragging ? this.swipeMove : null,
      onMouseUp: this.swipeEnd,
      onMouseLeave: this.state.dragging ? this.swipeEnd : null,
      onTouchStart: this.swipeStart,
      onTouchMove: this.state.dragging ? this.swipeMove : null,
      onTouchEnd: this.swipeEnd,
      onTouchCancel: this.state.dragging ? this.swipeEnd : null,
      onKeyDown: this.props.accessibility ? this.keyHandler : null
    };

    var innerSliderProps = {
      className: className,
      onMouseEnter: this.onInnerSliderEnter,
      onMouseLeave: this.onInnerSliderLeave,
      onMouseOver: this.onInnerSliderOver
    };

    if (this.props.unslick) {
      listProps = { className: 'slick-list' };
      innerSliderProps = { className: className };
    }

    return _react2.default.createElement(
      'div',
      innerSliderProps,
      !this.props.unslick ? prevArrow : '',
      _react2.default.createElement(
        'div',
        _extends({ ref: this.listRefHandler }, listProps),
        _react2.default.createElement(
          _track.Track,
          _extends({ ref: this.trackRefHandler }, trackProps),
          this.props.children
        )
      ),
      !this.props.unslick ? nextArrow : '',
      !this.props.unslick ? dots : '',
      !this.props.unslick ? bar : ''
    );
  }
});