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

window.onload = function() {

  setTimeout(() => {
  	flashMessage.remove()
  }, 5000 );

}