const BASE_URL = 'https://dog.ceo/api/';
const aside = document.querySelector(".aside");
const ul = document.querySelector("ul");
const button = document.querySelector(".refreshButton");
const imageDiv = document.querySelector(".image");
const main = document.querySelector(".main");
const h2 = document.querySelector("h2");

function renderDogs(dogs){
  let headerText= document.querySelector("header h1");
    for (let dog in dogs){
      let li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = dog;
      li.id = dog;
      let ulSubBreed = document.createElement("ul");
      ulSubBreed.className = "ulSubBreed";
      li.appendChild(ulSubBreed);

      li.addEventListener("click", function (e) {
        getSubBreeds(dog,e);
        window.location.hash = dog;
        h2.textContent = dog;
        getBreedsImage(dog,e);
      });
    }
}

function renderImages(images){
  imageDiv.innerHTML="";
  let img;
    for (let image of images){
      img = document.createElement('img');
      img.src = image;
      imageDiv.appendChild(img);
      main.insertBefore(imageDiv,button);
    }
}

function getDogImages() {
  if (window.location.hash) {
    imageDiv.innerHTML="";
    const splitted = window.location.hash.slice(1).split("-");

    if ( splitted.length === 2){
      let breed = splitted[0];
      let subBreed = splitted[1];
      getSubBreedsImage(breed,subBreed);
      h2.textContent= subBreed;
    }else{
      let breed = splitted[0];
      getBreedsImage(breed);
      h2.textContent= breed;
    }
    }else{
    getImages();
  }
}

getDogImages();
button.addEventListener("click", function(){
  getDogImages();
});

function renderSubBreeds(dogs,e){
  let breed = e.target.id;
  let ulSubBreed = e.target.querySelector(".ulSubBreed");
  ulSubBreed.innerHTML = "";

    for (let subBreed of dogs ){
      if (subBreed !== null){
        let li = document.createElement("li");
        ulSubBreed.appendChild(li);
        li.textContent= subBreed;

        li.addEventListener("click", function(e){
          e.stopPropagation();
          window.location.hash = breed+ "-" +subBreed;
          h2.textContent = subBreed;
          getSubBreedsImage(subBreed,e);
        });
      }
    }
}

function home(){
   let homeButton = document.querySelector(".material-icons");
   homeButton.addEventListener("click", function(){
     window.location.href= "index.html";
   });
 }
home();

function getImages(){
  let url = BASE_URL;
  axios.get( url + "breeds/image/random/3")
    .then(response => {
      const images = response.data.message;
      renderImages(images);
    });
}

function getDogs() {
  let url = BASE_URL;
  axios.get( url + "breeds/list/all")
    .then(response => {
      const dogs = response.data.message;
      renderDogs(dogs);
    });
}
getDogs();

function getSubBreeds(subBreed,e) {
  let url = BASE_URL;
  axios.get(url + "breed/" + subBreed +"/list")
    .then(response => {
      let dogs = response.data.message;
      renderSubBreeds(dogs,e);
    });
}

function getBreedsImage(breed,e) {
  let url = BASE_URL;
  axios.get(url + "breed/" + breed + "/images/random/3")
    .then(response => {
      let images = response.data.message;
      renderImages(images,e);
    });
}

function getSubBreedsImage(breed,subBreed, e) {
  subBreed = window.location.hash.slice(1);
  let splitSubBreed = subBreed.split("-");
  breed = splitSubBreed[0];
  subBreed = splitSubBreed[1];
  axios.get(`${BASE_URL}breed/${breed}/${subBreed}/images/random/3`)
    .then(response => {
      let images = response.data.message;
      renderImages(images,e);
    });
}
