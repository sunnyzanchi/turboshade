export const loadImage = url => {
  const img = new Image();
  img.src = url;

  return new Promise((resolve, reject) => {
    img.onload = _ => resolve(img);
    img.onerror = err => reject(err);
  });
};
