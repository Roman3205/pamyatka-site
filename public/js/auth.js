let button = document.querySelector('.button-password');
let input = document.querySelector('.input-password');
let image = document.querySelector('.image-password');
let visible = false;

button.addEventListener('click', function(e) {
e.preventDefault()
  if (visible) {
    input.type = 'password';
    image.src = '/assets/hide.png';
  } else {
    input.type = 'text';
    image.src = '/assets/show.png';
  }
  visible = !visible;
});
