function change() {
	var decider = document.querySelector('.switch');
  	var listItem = document.querySelector(".listItem");
	if(decider.checked){
    	listItem.style.text-decoration: line-through;
	}else{
    	listItem.style.text-decoration: "none";
	}
}