import { Animate } from './animate';


document.querySelector('#basic-run').addEventListener('click', () => {
  Animate.to('#basic-div', {
    translateX: '200px'
  });
});

document.querySelector('#basic-reset').addEventListener('click', () => {
  document.querySelector('#basic-div').style = {};
});

document.querySelector('#multiple-run').addEventListener('click', () => {
  Animate.to('#multiple-div', {
    translateX: '200px',
    rotate: '90deg',
    opacity: 0
  });
});

document.querySelector('#multiple-reset').addEventListener('click', () => {
  document.querySelector('#multiple-div').style = {};
});

document.querySelector('#chain-run').addEventListener('click', () => { Animate.to('#chain-div', {
    translateX: '200px'
  })
  .then(() => {
    return Animate.to('#chain-div', {
      translateY: '200px',
      delay: 1000
    });
  })
  .then(() => {
    return Animate.to('#chain-div', {
      rotate: '90deg'
    });
  });
});

document.querySelector('#chain-reset').addEventListener('click', () => {
  document.querySelector('#chain-div').style = {};
});

document.querySelector('#elements-run').addEventListener('click', () => {
  Promise.all([
    Animate.to('#elements-div1', {
      translateX: '200px',
      backgroundColor: 'blue',
      duration: 3000
    }),
    Animate.to('#elements-div2', {
      translateX: '200px',
      duration: 2000
    }),
    Animate.to('#elements-div3', {
      translateX: '200px',
      duration: 2000
    })
  ])
  .then(() => {
    return Animate.to('#elements-div1', {
      translateX: '100px',
      // backgroundColor: 'yellow',
      duration: 1000
    });
  })
  .then(() => {
    return Animate.to('#elements-div2', {
      translateY: '-100px',
      duration: 1000
    });
  });
});

document.querySelector('#elements-reset').addEventListener('click', () => {
  document.querySelector('#elements-div1').style = {};
  document.querySelector('#elements-div2').style = {};
  document.querySelector('#elements-div3').style = {};
});

document.querySelector('#to-1').addEventListener('click', () => {
  Animate.scrollTo('#section-1');
});
document.querySelector('#to-2').addEventListener('click', () => {
  Animate.scrollTo('#section-2');
});
document.querySelector('#to-3').addEventListener('click', () => {
  Animate.scrollTo('#section-3');
});
