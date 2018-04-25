import turboshade from 'turboshade';
import { loadImage } from './utils';
import img1Url from './img/img1.jpg';
import shader from './shader.frag';

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

loadImage(img1Url)
  .then(img => {
    canvas.height = img.height;
    canvas.width = img.width;
    const render = turboshade(gl, shader, img);

    let i = 0.00001;
    const draw = () => {
      render({ u_time: i });

      i += 0.1;
      requestAnimationFrame(draw);
    };

    draw();
  })
  .catch(err => console.log(err));
