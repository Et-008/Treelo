var gamePage = document.getElementById("gamePage");
var message = document.getElementById("flashMessage");
var backGroundImage = document.getElementById("backGroundImage");

window.onload = function() {
  setTimeout(() => {
  	message.remove()
  }, 5000 );

  gamePage.addEventListener('click', () => {
  	backGroundImage.style.display = none;
  })

}