var domUtil = require('wind-dom');
var ieVersion = Number(document.documentMode);

var getRect = function (element) {
  if (ieVersion < 9) {
    var rect = element.getBoundingClientRect();

    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom
    };
  }
  return element.getBoundingClientRect();
};

var positionElement = function (element, target, placement, alignment) {
  if (!element || !target || !placement) {
    return null;
  }

  alignment = alignment || 'center';
  var targetRect = getRect(target);
  var selfRect = getRect(element);
  var position = {};

  switch (placement) {
    case 'left':
      position.left = targetRect.left - selfRect.width;
      break;
    case 'right':
      position.left = targetRect.right;
      break;
    case 'innerLeft':
      position.left = targetRect.left;
      break;
    case 'innerRight':
      position.left = targetRect.right - selfRect.width;
      break;
    case 'center':
      position.left = (targetRect.right - selfRect.width) / 2;
      break;
    case 'top':
      position.top = targetRect.top - selfRect.height;
      break;
    case 'bottom':
      position.top = targetRect.bottom;
      break;
  }

  if (placement === 'left' || placement === 'right' || placement === 'innerLeft' || placement === 'innerRight') {
    switch (alignment) {
      case 'start':
        position.top = targetRect.top;
        break;
      case 'center':
        position.top = (targetRect.top + targetRect.bottom) / 2 - selfRect.height / 2;
        break;
      case 'end':
        position.top = targetRect.bottom - selfRect.height;
        break;
    }
  } else {
    switch (alignment) {
      case 'start':
        position.left = targetRect.left;
        break;
      case 'center':
        position.left = (targetRect.left + targetRect.right) / 2 - selfRect.width / 2;
        break;
      case 'end':
        position.left = targetRect.right - selfRect.width;
        break;
    }
  }

  var currentNode = element.parentNode;

  while (currentNode && currentNode.nodeName !== 'HTML') {
    if (domUtil.getStyle(currentNode, 'position') !== 'static') {
      break;
    }
    currentNode = currentNode.parentNode;
  }

  if (currentNode) {
    var parentRect = getRect(currentNode);

    position.left = position.left - parentRect.left;
    position.top = position.top - parentRect.top;
  }

  return position;
};

var isElementOutside = function (element) {
  var rect = element.getBoundingClientRect();
  var leftOutside = false;
  var topOutside = false;

  if (rect.top < 0 || rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
    topOutside = true;
  }

  if (rect.left < 0 || rect.right > (window.innerWidth || document.documentElement.clientWidth)) {
    leftOutside = true;
  }

  if (leftOutside && topOutside) {
    return 'both';
  } else if (leftOutside) {
    return 'left';
  } else if (topOutside) {
    return 'top';
  }

  return 'none';
};

module.exports = {
  positionElement: positionElement,
  isElementOutside: isElementOutside
};