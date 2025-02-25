// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => console.log(data));
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message1");
const messageTwo = document.getElementById("message2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading..";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data[0].location;
        messageTwo.textContent = data[0].forecast;
      }
    });
  });
});
