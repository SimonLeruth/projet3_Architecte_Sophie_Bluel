export async function genererProjets (projets) {
    
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionProjet = document.querySelector(".gallery");
    
    for (let i = 0 ; i < projets.length; i++) {
        const projetElement = projets[i];

        // Création d’une balise dédiée à un projet
        const projet = document.createElement("article");
        projet.dataset.id = projetElement.id;

        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = projetElement.imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = projetElement.title;

        // On rattache la balise article a la section gallery
        sectionProjet.appendChild(projet);
        projet.appendChild(imageElement);
        projet.appendChild(titleElement);

        // On définit un minuteur qui exécute la fonction spécifiée une fois le minuteur expiré.
        setTimeout(() => {
            projet.classList.add("visible");
        });
    }
}

export async function genererBoutonFiltres (categoriesFiltres) {

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
    // on insere a un endroit precis les boutons dans le HTML
    sectionPortfolio.insertBefore(navFiltres, divGallery);
}

export async function activerFiltres (works) {

    // On recupere tous les boutons dans une seule variable
    const boutonsFiltres = document.querySelectorAll(".filtres li");

    // On boucle sur les boutons afin d'y ajouter un evenement de type click
    boutonsFiltres.forEach(bouton => {
        bouton.addEventListener('click', () => {

            // On retire la classe active de tous les boutons afin de mettre la classe sur l'evenement en question
            boutonsFiltres.forEach(b => b.classList.remove("active"));
            bouton.classList.add("active");

            // on recupere l'id du bouton en question
            const idCategory = parseInt(bouton.dataset.id);
            let projetsFiltres;

            // condition dans laquel si le bouton est le bouton "tous", on laisse tous les works au sinon on filtre 
            // les works en fonction de l'id de la categorie du work
            if (idCategory === 0) {
                projetsFiltres = works
            } else {
                projetsFiltres = works.filter(work => work.category.id === idCategory);
            }

            // On vide la partie HTML et on refresh avec les works demandes
            document.querySelector(".gallery").innerText = "";
            genererProjets(projetsFiltres);
        })
    });
}

export function connexion() {

    // On recupere l'element ou doit changer le login/logout
    const loginLink = document.getElementById("loginLink");

    // On change le login -> logout et au moment du click sur ce logout on supprime 
    // le token du localStorage
    loginLink.textContent = "logout";

    loginLink.addEventListener('click', () => {
        localStorage.removeItem("token");
        window.location.reload();
    })
}


export function afficherModeEdition () {

    const body = document.querySelector("body");
    const html = document.querySelector("html");

    const topBar = document.createElement("div");
    topBar.classList.add("topBar")
    topBar.innerHTML += '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>';

    html.insertBefore(topBar, body);
}

export function afficherBoutonModifier () {

    const h2 = document.querySelector("#portfolio h2");
    const div = document.createElement("div");
    div.classList.add("edition");
    h2.replaceWith(div);
    div.appendChild(h2);


    const editionBouton = document.createElement("a");
    editionBouton.classList.add("js-modale");
    editionBouton.setAttribute('href', "#modale1");
    editionBouton.innerHTML += '<i class="fa-regular fa-pen-to-square"></i><p>Modifier</p>';

    div.appendChild(editionBouton);
}

export function appelModale() {

    let modale = null
    const openModale = function (event) {
        event.preventDefault();

        const target = document.querySelector(event.currentTarget.getAttribute('href'));
        target.style.display = null;
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', true);

        // Empeche le scroll sur le body
        document.body.style.overflow = "hidden"

        // Fermer la modale quand on clique sur le fond ou sur le bouton de fermeture
        modale = target;
        modale.addEventListener('click', closeModale);
        modale.querySelector('.modale-close').addEventListener('click', closeModale);
        modale.querySelector('.modale-stop').addEventListener('click', stopPropagation);
    }

    const closeModale = function (event) {
        if (modale === null) return;
            
        event.preventDefault();

        modale.style.display = "none";
        modale.setAttribute('aria-hidden', true);
        modale.removeAttribute('aria-modal');

        // Réactiver le scroll sur le body
        document.body.style.overflow = "auto"


        modale.removeEventListener('click', closeModale);
        modale.querySelector('.modale-close').removeEventListener('click', closeModale);
        modale.querySelector('.modale-stop').removeEventListener('click', stopPropagation);
        modale = null;
    }

    const stopPropagation = function (event) {
        event.stopPropagation();
    }

    document.querySelector(".js-modale").addEventListener('click', openModale);

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeModale(event);
        }
    })
}

export function genererProjetModale(works) {
    const projetsModale= document.querySelector(".photosGalerie");

    for (let i = 0; i < works.length; i++) {
        const projetElementModale = works[i];

        // Création d’une balise dédiée à un projet
        const projetModale = document.createElement("article");
        projetModale.dataset.id = projetElementModale.id;

        // Création des balises
        const imageElementModale = document.createElement("img");
        imageElementModale.src = projetElementModale.imageUrl;
        const lienCorbeille = document.createElement("a");
        lienCorbeille.classList.add("trash")
        lienCorbeille.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

        // On rattache les balises a la section photosGalerie
        projetsModale.appendChild(projetModale);
        projetModale.appendChild(imageElementModale);
        projetModale.insertBefore(lienCorbeille, imageElementModale);

    }
}

export function supprimerProjetModale() {
    const boutonsSuppProjet = document.querySelectorAll(".trash");

    boutonsSuppProjet.forEach(bouton => bouton.addEventListener('click', async () => {
        const projet = bouton.closest("article");
        const projetId = projet.dataset.id;

        try {
            const reponse = await fetch(`http://localhost:5678/api/works/${projetId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (reponse.ok) {
                projet.remove();
            } else {
                console.error("Erreur lors de la suppresion de l'element : ", reponse.status);
            }

        } catch (err) {
            console.error("Erreur reseau : ", err);
        }
    }));
}