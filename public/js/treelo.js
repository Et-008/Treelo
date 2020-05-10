$("#closeList").on("click", function(){
	$("#deleteList").submit()
})

$("#closeListItem").on("click", function(){
	$("#deleteListItem").submit()
})

$("div text").on("click", function() {
	$(this).toggleClass("completed")
})

$(".color").on("click", function() {
	if(!($("#soundGame").hasClass("hide"))) {
		$("#soundGame").toggleClass("hide");
	}
		$("#colorGame").toggleClass("hide");
})

$(".sound").on("click", function() {
	if(!($("#colorGame").hasClass("hide"))) {
		$("#colorGame").toggleClass("hide");
	}
	$("#soundGame").toggleClass("hide");
})

const user = document.getElementById("item");

function catchItem(e) {
  this.style.left = e.pageX - this.clientWidth / 2 + "px";
  this.style.top = e.pageY - this.clientHeight / 2 + "px";
  this.onmousemove = function(e) {
  this.style.left = e.pageX - this.clientWidth / 2 + "px";
  this.style.top = e.pageY - this.clientHeight / 2 + "px";
  }
  this.onmouseup = function() {
  this.onmousemove = null; // onmouseup event [ redirect mousemove event signal to null instead of the drag-able element]
  }
}
user.onmousedown = catchItem;



window.onload = function() {

  setTimeout(() => {
  	flashMessage.remove()
  }, 5000 );

}