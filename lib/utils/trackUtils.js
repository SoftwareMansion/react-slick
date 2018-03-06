'use strict';

exports.__esModule = true;
exports.getPreClones = getPreClones;
exports.getPostClones = getPostClones;
exports.getTotalSlides = getTotalSlides;
exports.siblingDirection = siblingDirection;
exports.slidesOnRight = slidesOnRight;
exports.slidesOnLeft = slidesOnLeft;
function getPreClones(_ref) {
  var slideCount = _ref.slideCount,
      variableWidth = _ref.variableWidth,
      slidesToShow = _ref.slidesToShow,
      centerMode = _ref.centerMode,
      unslick = _ref.unslick;

  if (unslick) return 0;
  if (variableWidth) {
    return slideCount;
  }
  return slidesToShow + (centerMode ? 1 : 0);
}

function getPostClones(_ref2) {
  var slideCount = _ref2.slideCount,
      unslick = _ref2.unslick;

  if (unslick) return 0;
  return slideCount;
}

function getTotalSlides(_ref3) {
  var variableWidth = _ref3.variableWidth,
      slideCount = _ref3.slideCount,
      slidesToShow = _ref3.slidesToShow,
      centerMode = _ref3.centerMode,
      unslick = _ref3.unslick;

  if (slideCount === 1) {
    return 1;
  }
  return getPreClones({ slideCount: slideCount, variableWidth: variableWidth, slidesToShow: slidesToShow, centerMode: centerMode, unslick: unslick }) + slideCount + getPostClones({ slideCount: slideCount, unslick: unslick });
}

function siblingDirection(_ref4) {
  var currentSlide = _ref4.currentSlide,
      targetSlide = _ref4.targetSlide,
      slidesToShow = _ref4.slidesToShow,
      centerMode = _ref4.centerMode,
      rtl = _ref4.rtl;

  if (targetSlide > currentSlide) {
    if (targetSlide > currentSlide + slidesOnRight(slidesToShow, centerMode, rtl)) {
      return 'left';
    }
    return 'right';
  } else {
    if (targetSlide < currentSlide - slidesOnLeft(slidesToShow, centerMode, rtl)) {
      return 'right';
    }
    return 'left';
  }
}

function slidesOnRight(slidesToShow, centerMode, rtl) {
  // returns no of slides on the right of active slide
  if (centerMode) {
    var right = (slidesToShow - 1) / 2 + 1;
    if (rtl && slidesToShow % 2 === 0) right += 1;
    return right;
  }
  if (rtl) {
    return 0;
  }
  return slidesToShow - 1;
}

function slidesOnLeft(slidesToShow, centerMode, rtl) {
  // returns no of slides on the left of active slide
  if (centerMode) {
    var left = (slidesToShow - 1) / 2 + 1;
    if (!rtl && slidesToShow % 2 === 0) left += 1;
    return left;
  }
  if (rtl) {
    return slidesToShow - 1;
  }
  return 0;
}