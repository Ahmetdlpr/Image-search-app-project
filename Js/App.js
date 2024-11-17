const imgsearch = document.querySelector(".imgsearch");
const searchbutton = document.querySelector(".searchbutton");
const searchcontainer = document.querySelector(".search-container");
const imagecontainer = document.querySelector(".image-container");
const container = document.querySelector(".container");
const form = document.querySelector(".Form");
const Prwbtn = document.querySelector(".Prwbtn");
imagecontainer.remove();
Prwbtn.remove();

let key = 'YOUR_CLIENT_ID_HERE'; // API anahtarınızı buraya ekleyin

function search(e) {
    searchcontainer.remove();
    container.appendChild(imagecontainer);
    container.appendChild(Prwbtn);

    e.preventDefault();
    imagecontainer.textContent = "";

    const value = imgsearch.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: `Client-ID ${key}` // Kendinize ait tokeninizi ekleyin 
        }
    })
    .then(res => res.json())
    .then(data => {
        Array.from(data.results).forEach(image => {
            resimleriekle(image.urls.small);
        });
    })
    .catch(err => console.log(err));
    imgsearch.value = "";
}

const resimleriekle = (url) => {
    let img = document.createElement("img");
    img.classList.add("img");
    img.src = url;
    imagecontainer.appendChild(img);
}

Prwbtn.addEventListener("click", () => {
    imagecontainer.remove();
    container.appendChild(searchcontainer);
    Prwbtn.remove();
})

searchbutton.addEventListener("click", search);
