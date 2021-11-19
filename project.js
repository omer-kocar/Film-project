const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// UI Objesini Başlatma
const ui = new UI();

//Storage Objesi Üret
const storage = new Storage();

// Tüm eventleri yükleme
addEventListeners();

function addEventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);

    })
    cardbody.addEventListener("click", deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url ==="") {
        // Hata
        ui.displayMessages("Tüm alanları doldurunuz!", "danger");
    } else {
        // Bir tane filmimizi bu şekilde oluşturduk. Yeni film.
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // Arayüze bu fonksiyon sayesinde ekleme yapacağız ve ui.js ye gelerek bizim bu fonksiyonu yazmamız gerekiyor.
        storage.addFilmToStorage(newFilm); // storage'a film ekleme

        ui.displayMessages("Film başarıyla eklendi.","success")
    }

    ui.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();
}


function deleteFilm (e) {
    if (e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Film'i başarıyla sildiniz.", "success");
        
    }
}

function clearAllFilms () {
    if (confirm("Hepsini silmek istediğinize emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
}




