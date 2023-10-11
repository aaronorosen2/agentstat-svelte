var select = document.querySelectorAll(".links>button")
var c=0
select.forEach(function(element){
element.addEventListener("click",function(){
    if(c==0){
        element.style.color="#134F61"
        c=1
    }
    else{
        element.style.color="rgb(135 135 135)"
        c=0
    }
})})

var f=document.querySelector(".f")
var c=document.querySelector(".c")
var popup=document.querySelector(".popup")
var cut=document.querySelector(".line i")

c.addEventListener("click", function(){
    popup.style.display="flex"
})
cut.addEventListener("click", function(){
    popup.style.display="none"
})


var popup2=document.querySelector(".popup2")
var cross=document.querySelector(".popup2 .mobilcat .line i")
f.addEventListener("click", function(){
    popup2.style.display="flex"
})
cross.addEventListener("click", function(){
    popup2.style.display="none"
  
})
