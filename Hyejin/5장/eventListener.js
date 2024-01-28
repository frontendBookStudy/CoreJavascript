// var fruits = ["apple", "banana", "peach"];
// var ul = document.createElement("ul");

// fruits.forEach(function (fruit) {
//   var li = document.createElement("li");
//   li.innerText = fruit;
//   li.addEventListener("click", function () {
//     alert("your choice is " + fruit);
//   });
//   ul.appendChild(li);
// });
// document.body.appendChild(ul);

// var fruits = ["apple", "banana", "peach"];
// var ul = document.createElement("ul");
// var alertFruit = function(){
//   alert("your choice is " + fruit);
// }

// fruits.forEach(function (fruit) {
//   var li = document.createElement("li");
//   li.innerText = fruit;
//   li.addEventListener("click", alertFruit);
//   ul.appendChild(li);
// });
// document.body.appendChild(ul);

//고차함수
var fruits = ["apple", "banana", "peach"];
var ul = document.createElement("ul");
var alertFruit = function (fruit) {
  return () => alert("your choice is " + fruit);
};

fruits.forEach(function (fruit) {
  var li = document.createElement("li");
  li.innerText = fruit;
  li.addEventListener("click", alertFruit(fruit));
  ul.appendChild(li);
});
document.body.appendChild(ul);
