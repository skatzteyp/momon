import { Animate } from './animate';

class Tilt {
  constructor(element, options) {
    const defaults = {
      perspective: '75px'
    };

    this.element = element;
    this.options = Object.assign(defaults, options);

    if (typeof this.element === 'string') {
      this.element = document.querySelector(this.element);
    }

    if (typeof this.options.bounds === 'string') {
      this.options.bounds = document.querySelector(this.options.bounds).getBoundingClientRect();
    }

    this.init();
  }

  init() {
    const wrapper = document.createElement('div');
    wrapper.style.perspective = this.options.perspective;

    this.element.parentNode.insertBefore(wrapper, this.element);
    wrapper.appendChild(this.element);

    const bounds = this.options.bounds,
      centerX = (bounds.x + bounds.width / 2),
      centerY = (bounds.y + bounds.height / 2);

    window.addEventListener('mousemove', (e) => {
      let x = e.pageX,
        y = e.pageY;

      if (x >= bounds.x && x <= bounds.x + bounds.width && y >= bounds.y && y <= bounds.y + bounds.height) {
      }
      else {
        return;
      }

      let distX = (x - centerX) / (bounds.width / 2),
        distY = (centerY - y) / (bounds.height / 2);

      Animate.to(this.element, {
        rotateY: distX + 'deg',
        rotateX: distY + 'deg',
        duration: 500
      });
    });
  }
}

new Tilt('#tilt-me', {
  perspective: '75px',
  bounds: '#tilt-bounds' // x, y, width, height
});

new Tilt('#tilt2', {
  perspective: '100px',
  bounds: '#tilt-bounds' // x, y, width, height
});
