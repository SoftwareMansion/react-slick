"use strict";

exports.__esModule = true;

// Following function expects props and states from InnerSlider component
// and returns a list of slides that need to be loaded in order to complete the list frame
var getOnDemandLazySlides = exports.getOnDemandLazySlides = function getOnDemandLazySlides(spec) {
  /*
  @TODO: call onLazyLoad event here
  */
  var onDemandSlides = [];
  // you might wanna use trackUtils functions for this
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
      onDemandSlides.push(slideIndex);
    }
  }
  return onDemandSlides;
};

var getRequiredLazySlides = exports.getRequiredLazySlides = function getRequiredLazySlides(spec) {
  var requiredSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);
  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    requiredSlides.push(slideIndex);
  }
  return requiredSlides;
};

var lazyStartIndex = exports.lazyStartIndex = function lazyStartIndex(spec) {
  return spec.currentSlide - slidesOnLeft(spec);
};
var lazyEndIndex = exports.lazyEndIndex = function lazyEndIndex(spec) {
  return spec.currentSlide + slidesOnRight(spec);
}; // endIndex is exclusive

// may be compared with trackutils equivalents for betterment
var slidesOnLeft = exports.slidesOnLeft = function slidesOnLeft(spec) {
  return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
};

// may be compared with trackutils equivalents for betterment
var slidesOnRight = exports.slidesOnRight = function slidesOnRight(spec) {
  return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
};