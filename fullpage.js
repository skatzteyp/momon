import _ from 'lodash';

class Fullpage {
  constructor(options = {}) {
    let defaults = {
      selector: '.fullpage',
      threshold: 1000,
      resetDelay: 500,
    };

    this.options = Object.assign({}, defaults, options);
    this.currentIndex = 0;
    this.animating = false;
    this.totalDelta = 0;

    this.init();
  }

  init() {
    this.pages = document.querySelectorAll(this.options.selector);
    window.addEventListener('wheel', (e) => {
      this.onWheel(e);
      _.debounce(this.onWheelReset, this.options.resetDelay);
    });

    this.pages[this.currentIndex].style.display = 'block';
  }

  onWheel(e) {
    if (!this.animating) {
      this.totalDelta += e.deltaY;
    }

    if (this.totalDelta > this.options.threshold) {
      let current = this.pages[this.currentIndex]
      this.currentIndex++;

      if (this.currentIndex >= this.pages.length) {
        this.currentIndex = 0;
      }

      let next = this.pages[this.currentIndex];

      this.show(current, next, 'down');
    }
    else if (this.totalDelta < this.options.threshold * -1) {
      let current = this.pages[this.currentIndex]
      this.currentIndex--;

      if (this.currentIndex < 0) {
        this.currentIndex = this.pages.length - 1;
      }

      let next = this.pages[this.currentIndex];

      this.show(current, next, 'up');
    }
  }

  onWheelReset() {
    this.totalDelta = 0;
  }

  show(current, next, direction) {
    this.animating = true;
    this.totalDelta = 0;

    let ret = this.options.next(current, next, direction);

    if (ret && ret.then) {
      ret.then(() => {
        this.animating = false;
      });
    }
    else {
      this.animating = false;
    }
  }
}

new Fullpage({
  next: (current, next, direction) => {
    current.style.display = 'none';
    next.style.display = 'block';
  }
});
