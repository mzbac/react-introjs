import PropTypes from 'prop-types';

export const stepShape = PropTypes.shape({
  element: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  position: PropTypes.string,
  tooltipClass: PropTypes.string,
  highlightClass: PropTypes.string,
});

export const hintsShape = PropTypes.shape({
  element: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  hintPosition: PropTypes.string,
});

export const tooltipPosition = PropTypes.oneOf([
  'top',
  'right',
  'bottom',
  'left',
  'bottom-left-aligned',
  'bottom-middle-aligned',
  'bottom-right-aligned',
  'auto',
]);

export const hintPosition = PropTypes.oneOf([
  'top-middle',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'bottom-middle',
  'middle-left',
  'middle-right',
  'middle-middle',
]);

export const optionsPropTypes = PropTypes.shape({
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  skipLabel: PropTypes.string,
  doneLabel: PropTypes.string,
  hidePrev: PropTypes.bool,
  hideNext: PropTypes.bool,
  tooltipPosition,
  tooltipClass: PropTypes.string,
  highlightClass: PropTypes.string,
  exitOnEsc: PropTypes.bool,
  exitOnOverlayClick: PropTypes.bool,
  showStepNumbers: PropTypes.bool,
  keyboardNavigation: PropTypes.bool,
  showButtons: PropTypes.bool,
  showBullets: PropTypes.bool,
  showProgress: PropTypes.bool,
  scrollToElement: PropTypes.bool,
  overlayOpacity: PropTypes.number,
  scrollPadding: PropTypes.number,
  positionPrecedence: PropTypes.arrayOf(PropTypes.string),
  disableInteraction: PropTypes.bool,
  hintPosition,
  hintButtonLabel: PropTypes.string,
  hintAnimation: PropTypes.bool,
});
