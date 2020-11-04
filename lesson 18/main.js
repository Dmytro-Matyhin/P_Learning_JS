const url = 'https://jsonplaceholder.typicode.com/';
const photoUrl = 'photos';
let photoHistory = [];


let photContainer = document.querySelector('.photo-container');
let request = document.querySelector('#request');
let photoInput = document.querySelector('#photoInput');

request.addEventListener('click', main);
photoInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        main()
    } else {
        event.preventDefault()
    }
});

// function main() {
//   let id = photoInput.value;
//   if (!isNaN(id)) {
//     photoInput.disabled = true;

//     fetch(`${url}${photoUrl}/${id}`)
//     .then(data => {
//       return data.json();
//     })
//     .then(data => {
//       console.log(data);
//       return loadImage(data);
//     })
//     .then(({
//       image,
//       data
//     }) => {
//       photContainer.append(image);
//       photoHistory.push(data);
//       console.log(photoHistory);
//       photoInput.disabled = false;
//       photoInput.focus();
//     })
//   }
// }

async function main() {
  let id = photoInput.value;
  if (!isNaN(id)) {
    photoInput.disabled = true;
    try {
      let request = await fetch(`${url}${photoUrl}/${id}`);
      let response = await request.json();
      console.log(response)
      let imageData = await loadImage(response);
      console.log(imageData)

      photContainer.append(imageData.image);
      photoHistory.push(response);
      console.log(photoHistory);
      photoInput.disabled = false;
      photoInput.focus();

    } catch(error) {
      console.error(error);
    }
  }
}
// main()

function loadImage(data) {
    return new Promise(function (resolve, reject) {
        let image = new Image();
        image.src = data.url;
        image.onload = () => resolve({
            image,
            data
        });
        image.onerror = () => reject();
    })
}
