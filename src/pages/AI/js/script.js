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
// })
// });
// filterSelection("all")
// function filterSelection(c){
//     var x, i;
//     x=document.getElementsByClassName("card");
//     if(c == "all") c="";
//     for(i=0;i<x.length;i++){
//         w3RemoveClass(x[i], "show");
//         if(x[i].className.indexOf(c) > -1)
//         w3AddClass(x[i], "show")
//     }
// }
// function w3AddClass(element, name){
//     var i, arr1, arr2; 
//     arr1=element.className.split("");
//     arr2=name.split(" ");
//     for(i=0;i<arr2.length;i++){
//         if(arr2.indexOf(arr2[i]) == -1){
//             element.className+= " " + arr2[i];
//         }
//     }
// }
// function w3RemoveClass(element, name){
//     var i, arr1, arr2; 
//     arr1=element.className.split("");
//     arr2=name.split(" ");
//     for(i=0;i<arr2.length;i++){
//         while(arr2.indexOf(arr2[i]) > -1){
//            arr1.splice(arr1.indexOf(arr2[i], 1));
//         }
//     }
//     element.className=arr1.join(" ");
// }
// var contain=document.querySelector(".list ul ")
// var btns=contain.querySelectorAll(".btn")

// for(var i= 0;i<btns.length;i++){
//     btns[i].addEventListener("click", function(){
//         var current = document.getElementsByClassName("active")
//         current[0].className=current[0].className.replace("active", " ");
//         this.className+="active";
//     })
// }





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
    console.log("hello")
})
