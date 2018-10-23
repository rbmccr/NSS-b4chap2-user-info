// This is the div that shows database information
const box = document.querySelector('.post');

// Get data from database to fill box with database information
fetch("http://localhost:4500/lego")
.then(data => data.json())
.then(data2 => {
  data2.forEach(post => {
    box.innerHTML += `<br /> Item ${post.id}: <br /> Creator: ${post.creator} <br /> Color: ${post.color} <br /> Shape: ${post.shape} <br /> Creation: ${post.creation} <br />`
  })
})

// Pass in information from the form as single post. Fetch data from
// database to get the id of the new post (last item in array)
function getData(singlePost) {
  fetch("http://localhost:4500/lego")
    .then(data => data.json())
    .then(data2 => {
      box.innerHTML += `<br /> Item ${data2[data2.length - 1].id}: <br /> Creator: ${singlePost.creator} <br /> Color: ${singlePost.color} <br /> Shape: ${singlePost.shape} <br /> Creation: ${singlePost.creation} <br />`
    })};

// This click event posts to the database and then calls getdata()
// to append the DOM
document.querySelector(".lego__save").addEventListener("click", event => {
  const creatorValue = document.querySelector("#lego__creator").value;
  const colorValue = document.querySelector("#lego__color").value;
  const shapeValue = document.querySelector("#lego__shape").value;
  const creationValue = document.querySelector("#lego__creation").value;

  const legoToSave = {
      creator: creatorValue,
      color: colorValue,
      shape: shapeValue,
      creation: creationValue
  };

  fetch("http://localhost:4500/lego", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(legoToSave)
  })
  .then( () => {
    getData(legoToSave);
  });

});