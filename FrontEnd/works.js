export async function genererProjets (projets) {
    
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

            // condition dans laquel si le bouton est le bouton "tous", on laisse tous les works au sinon on filtre les works en fonction de l'id de la categorie du work
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


