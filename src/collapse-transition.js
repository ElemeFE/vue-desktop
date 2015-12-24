export default {
  beforeEnter: function (el) {
    el.style.height = '0';
  },
  enter: function (el) {
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '';
    }
    el.dataset.oldOverflow = el.style.overflow;
    el.style.overflow = 'hidden';
  },
  afterEnter: function(el) {
    el.style.display = '';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  },
  beforeLeave: function (el) {
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
    el.dataset.oldOverflow = el.style.overflow;
    el.style.overflow = 'hidden';
  },
  leave: function (el) {
    if (el.scrollHeight !== 0) {
      setTimeout(() => el.style.height = '0');
    }
  },
  afterLeave: function (el) {
    el.style.display = el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  }
};
