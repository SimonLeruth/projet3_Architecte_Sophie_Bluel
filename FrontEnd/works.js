const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

async function genererProjets (projets) {
    
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionProjet = document.querySelector(".gallery");
    
    for (let i = 0 ; i < projets.length; i++) {
        const projetElement = projets[i];

        // Création d’une balise dédiée à un projet
        const projet = document.createElement("article");
        projet.dataset.id = projetElement.id

        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = projetElement.imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = projetElement.title;

        // On rattache la balise article a la section gallery
        sectionProjet.appendChild(projet);
        projet.appendChild(imageElement);
        projet.appendChild(titleElement);
    }
}

async function genererBoutonFiltres (categoriesFiltres) {

    // Récupération des deux elements du DOM pour pouvoir positionner des filtres a la bonne place sur la page.
    const sectionPortfolio = document.querySelector("#portfolio");
    const divGallery = document.querySelector(".gallery");

    // Création d'un 'nav' ainsi que le 'ul' pour y mettre des 'li'.
    const navFiltres = document.createElement("nav");
    navFiltres.classList.add("filtres");
    const ulFiltres = document.createElement("ul");
    navFiltres.appendChild(ulFiltres);

    // Création du bouton 'Tous' et ajout de la classe active
    const filtreTous = document.createElement('li');
    filtreTous.innerText = "Tous";
    filtreTous.classList.add("active");
    filtreTous.dataset.id = "0";
    ulFiltres.appendChild(filtreTous);

    // Boucle afin de generer les boutons a partir de l'API
    for (let i = 0; i < categoriesFiltres.length; i++) {
        const categorieCourante = categoriesFiltres[i];
        
        
        const filtre = document.createElement('li');
        filtre.dataset.id = categorieCourante.id;
        filtre.innerText = `${categorieCourante.name}`;

        ulFiltres.appendChild(filtre);
    }
    sectionPortfolio.insertBefore(navFiltres, divGallery);
}

genererProjets(works);
genererBoutonFiltres(categories);