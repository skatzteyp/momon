import { Easing } from './easing';

export class Animate {
  constructor(element = null) {
    this.element = element;
  }

  static animate(element, options) {
    instance.element = element;
    return instance.animate(options);
  }

  animate(options) {
    let element = this.element;
    let defaults = { duration: 1000,
      easing: 'ease-out',
      transformOrigin: '',
      delay: 0,
      animations: [ ]
    };

    options = Object.assign(defaults, options);

    return new Promise((resolve) => {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      this.addTransitionEvents(element, resolve);

      element.style.transition = this.getTransitions(options);
      element.style.transformOrigin = options.transformOrigin;

      setTimeout(() => {
        options.animations.forEach((animation) => {
          let { type, transform, values } = animation;

          if (values instanceof Array) {
            if (transform) {
              values = values.join(', ');
            }
            else {
              values = values.join(' ');
            }
          }

          if (transform) {
            let oldTransform = element.style.transform;
            oldTransform = oldTransform.split(' ').filter(t => !t.includes(transform)).join(' ');

            values = `${oldTransform} ${transform}(${values})`;
          }

          element.style[type] = values;
        });
      }, options.delay);
    });
  }

  addTransitionEvents(element, resolve) {
    let style = window.getComputedStyle(element),
      transitions = style.getPropertyValue('transition-property').split(', '),
      transitionCount = 0;

    element.addEventListener('transitionend', function transitionend() {
      transitionCount++;

      if (transitionCount === transitions.length) {
        element.removeEventListener('transitionend', transitionend);
        resolve();
      }
    });
  }

  getTransitions(options) {
    const toKebab = (str) => {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };
    let transition = '';

    options.animations.forEach((animation) => {
      let type = toKebab(animation.type);

      if (!transition.includes(type)) {
        if (transition.length) {
          transition += ', ';
        }

        transition += `${options.duration}ms ${type} ${options.easing}`;
      }
    });

    return transition;
  }

  static to(element, options = {}) {
    const transforms = [
      'scaleX',
      'scaleY',
      'scale',
      'translateX',
      'translateY',
      'translate',
      'rotate',
      'rotateY',
      'rotateX'
    ];

    const others = [
      'duration',
      'easing',
      'delay',
      'transformOrigin'
    ];

    let keys = Object.keys(options),
      data = {
        animations: []
      };

    keys.forEach((key) => {
      if (transforms.includes(key)) {
        data.animations.push({
          type: 'transform',
          transform: key,
          values: options[key]
        });
      }
      else if (others.includes(key)) {
        data[key] = options[key];
      }
      else {
        data.animations.push({
          type: key,
          values: options[key]
        });
      }
    });

    return Animate.animate(element, data);
  }

  static scrollTo(element, options) {
    let defaults = {
      duration: 1000,
      easing: Easing.custom,
      delay: 0
    };

    options = Object.assign(defaults, options);

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    let start,
      targetPos = window.scrollY + element.getBoundingClientRect().top,
      startPos = window.scrollY,
      distance = targetPos - startPos;

    let step = (timestamp) => {
      start = start || timestamp;

      let progress = (timestamp - start) / options.duration;

      if (progress <= 1) {
        progress = options.easing(progress, options.duration);

        window.scrollTo(0, startPos + (distance * progress));
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
}

let instance = new Animate();
