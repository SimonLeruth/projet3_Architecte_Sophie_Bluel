/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du site. 
 * 
 *********************************************************************************/

/** Fonction qui permet de generer dynamiquement les projets presents dans l'API, dans le DOM
 *  @param {json} projets : Tous les projets presents dans l'API
 */

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

        // Rattache la balise article a la section gallery
        sectionProjet.appendChild(projet);
        projet.appendChild(imageElement);
        projet.appendChild(titleElement);

        // Définit un minuteur qui exécute la fonction spécifiée une fois le minuteur expiré.
        setTimeout(() => {
            projet.classList.add("visible");
        });
    }
}

/** Fonction qui permet de generer dynamiquement les boutons de filtres dans le DOM a partir de l'API
 *  @param {json} categoriesFiltres : Toutes les categories presentes dans l'API
 */

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
    // Insere a un endroit precis les boutons dans le HTML
    sectionPortfolio.insertBefore(navFiltres, divGallery);
}

/** Fonction qui active les filtres en fonction des numeros de categories
 *  @param {json} works : Tous les projets presents dans l'API
 */ 

export async function activerFiltres (works) {

    // Recuperation de tous les boutons dans une seule variable
    const boutonsFiltres = document.querySelectorAll(".filtres li");

    // Boucle sur les boutons afin d'y ajouter un evenement de type click
    boutonsFiltres.forEach(bouton => {
        bouton.addEventListener('click', () => {

            // Retire la classe active de tous les boutons afin de mettre la classe sur l'evenement en question
            boutonsFiltres.forEach(b => b.classList.remove("active"));
            bouton.classList.add("active");

            // Recupere l'id du bouton en question
            const idCategory = parseInt(bouton.dataset.id);
            let projetsFiltres;

            // Condition dans laquel si le bouton est le bouton "tous", on laisse tous les works au sinon on filtre 
            // les works en fonction de l'id de la categorie du work
            if (idCategory === 0) {
                projetsFiltres = works
            } else {
                projetsFiltres = works.filter(work => work.category.id === idCategory);
            }

            // Vide la partie HTML et on refresh avec les works demandes
            document.querySelector(".gallery").innerText = "";
            genererProjets(projetsFiltres);
        })
    });
}

// Fonction qui remplace le login en logout si l'utilisateur est connecte et qui redirige l'utilisateur sur la page projets

export function gererConnexion() {

    // Recuperation de l'element ou doit changer le login/logout
    const loginLink = document.getElementById("loginLink");

    // Change le login -> logout et au moment du click sur ce logout on supprime 
    // le token du localStorage
    loginLink.textContent = "logout";

    loginLink.addEventListener('click', () => {
        localStorage.removeItem("token");
        window.location.reload();
    })
}

// Fonction qui affiche dynamiquement, en cas de connexion de la part de l'utilisateur, la bande noir au dessus de site du mode edition

export function afficherModeEdition () {

    // Recuperation des balises body et html
    const body = document.querySelector("body");
    const html = document.querySelector("html");

    // Creation de l'element div en lui ajoutant la classe topBar
    const topBar = document.createElement("div");
    topBar.classList.add("topBar")
    // Insert l'HTML dans la balise div
    topBar.innerHTML += '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>';

    // Insert la balise entre la balise html et le body
    html.insertBefore(topBar, body);
}

// Fonction qui ajoute dynamiquement le bouton "modifier" lors de la connexion

export function afficherBoutonModifier () {

    // Recuperation des elements du DOM
    const h2 = document.querySelector("#portfolio h2");
    const div = document.createElement("div");
    // Ajoute la classe edition a la div
    div.classList.add("edition");
    // Change la balise h2 en div et re-injectons le h2 a l'interieur
    h2.replaceWith(div);
    div.appendChild(h2);

    // Creation dynamique du bouton qui contiendra la classe "js-modal" et qui contiendra l'icone pour le texte "Modifier"
    const editionBouton = document.createElement("a");
    editionBouton.classList.add("js-modale");
    editionBouton.setAttribute('href', "#modale1");
    editionBouton.innerHTML += '<i class="fa-regular fa-pen-to-square"></i><p>Modifier</p>';

    // Injecte le code dans le DOM
    div.appendChild(editionBouton);
}

// Fonction qui appelle l'ouverture de la modale lors de l'appui sur le bouton "Modifier"

export function appelModale() {

    let modale = null
    /** Creation d'une constante qui va avoir comme fonction d'afficher la modale lors du click sur le bouton
        modifier et sa fermeture lors du click en dehors de la modale ou sur la croix de fermeture
        @param {*} event 
    */
    const openModale = function (event) {
        // Empeche le chargement par defaut de la page
        event.preventDefault();

        // Recupere l'id de la modale et changeons ses attributs
        const target = document.querySelector(event.currentTarget.getAttribute('href'));
        target.style.display = null;
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', true);

        // Empeche le scroll sur le body
        document.body.style.overflow = "hidden"

        // Ferme la modale quand on clique sur le fond ou sur le bouton de fermeture
        modale = target;
        modale.addEventListener('click', closeModale);
        modale.querySelector('.modale-close').addEventListener('click', closeModale);
        modale.querySelector('.modale-stop').addEventListener('click', stopPropagation);
    }

    /**
     * Creation d'une constante qui va avoir comme fonction de fermer la modale et de changer les attributs de la modale
     * @param {*} event
     */
    const closeModale = function (event) {
        //Si la variable modale ne contient aucun id alors ne fait rien
        if (modale === null) return;
            
        // Empeche le chargement par defaut de la page
        event.preventDefault();

        // Change les attributs de la modale
        modale.style.display = "none";
        modale.setAttribute('aria-hidden', true);
        modale.removeAttribute('aria-modal');

        // Réactiver le scroll sur le body
        document.body.style.overflow = "auto"


        //Supprime les evenements des elements de la modale lorsque celle ci n'est pas affichee
        modale.removeEventListener('click', closeModale);
        modale.querySelector('.modale-close').removeEventListener('click', closeModale);
        modale.querySelector('.modale-stop').removeEventListener('click', stopPropagation);
        // Reinitialise le formulaire
        resetForm();
        // Enleve l'id dans la variable "modale"
        modale = null;
    }

    /**
     * Creation d'une constante qui va avoir comme fonction de stopper la propagation du click de fermeture sur la modale
     * @param {*} event 
     */

    const stopPropagation = function (event) {
        event.stopPropagation();
    }

    document.querySelector(".js-modale").addEventListener('click', openModale);

    // Ajouter la possibilite de fermer la modale avec la touche escape du clavier
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeModale(event);
        }
    })
}

/**
 * Fonction qui genere tous les projets sur la modale dynamiquement
 * @param {json} works : Tous les projets presents dans l'API
 */

export function genererProjetModale(works) {
    const projetsModale= document.querySelector(".photosGalerie");

    // Boucle sur tous les projets
    for (let i = 0; i < works.length; i++) {
        const projetElementModale = works[i];

        // Création d’une balise dédiée à un projet
        const projetModale = document.createElement("article");
        projetModale.dataset.id = projetElementModale.id;

        // Création des balises et ajout de l'icone de suppression sur les images
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

/**
 * Fonction qui active, lors du click sur l'icone "poubelle", la suppression du projet que l'on veut enlever de l'API
 */

export function supprimerProjetModale() {

    // Recuperation de l'icone "poubelle"
    const boutonsSuppProjet = document.querySelectorAll(".trash");

    // Boucle sur tous les projets afin de recuperer le click sur le projet voulu
    boutonsSuppProjet.forEach(bouton => bouton.addEventListener('click', async (event) => {
        // Empeche le chargement par defaut de la page
        event.preventDefault();

        // Recuperation de la balise article du bouton sur lequel on clique
        const projet = bouton.closest("article");
        const projetId = projet.dataset.id;

        // Essai de l'envoi de la requete pour suppression dans l'API
        try {
            const reponse = await fetch(`http://localhost:5678/api/works/${projetId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            // Condition en fonction de la reponse de l'API
            if (reponse.ok) {

                //Supprime le projet de l'API
                projet.remove();

                // Re-actualise le DOM en fonction de la nouvelle API
                const nouvelleReponse = await fetch("http://localhost:5678/api/works");
                const nouveauxProjets = await nouvelleReponse.json();
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(nouveauxProjets);
                
            } else {
                alert("Erreur lors de la suppression de l'element : ", reponse.status);
            }

        } catch (err) {
            console.error("Erreur reseau : ", err);
        }
    }));
}

let categoriesLoaded = false;

/**
 * Fonction qui affiche la modale d'ajout et retire la modale de suppression
 */

export function ajouterProjet () {

    // Reprend toutes les elements du DOM necessaire tels que la premiere modale la deuxieme modale, le bouton qui remplace l'affiche des modales
    const modaleSupprimerProjet = document.querySelector(".modale-supprimer-projet");
    const modaleAjouterProjet = document.querySelector(".form-ajout");
    const boutonAjouterProjet = document.querySelector('.btnAjtProjet');
    const modale = document.getElementById("modale1");

    // Ajoute l'evenement de changement de modale au click du bouton "ajouter un projet"
    boutonAjouterProjet.addEventListener('click', async (event) => {
        // Empeche le chargement par defaut de la page
        event.preventDefault();

        //Change les attribut style --> display de chaque modale
        modaleSupprimerProjet.style.display = "none";
        modaleAjouterProjet.style.display = "block";

        // Condition si une categorie est chargee pour eviter de recharger plusieurs fois le select
        if(!categoriesLoaded) {
            try {
                const reponse = await fetch("http://localhost:5678/api/categories");
                const categories = await reponse.json();
                const select = modale.querySelector('.select-categories');

                categories.forEach(categorie => {
                    const option = document.createElement("option");
                    option.value = categorie.id;
                    option.textContent = categorie.name;
                    select.appendChild(option);
                });

                categoriesLoaded = true;

            } catch (err) {
                console.error("Erreur lors du chargement des categories : ", err)
            }
        }

        // Ajoute le retour en arriere sur la modale de suppresion
        const boutonRetour = modale.querySelector('.modale-retour');
        boutonRetour.addEventListener('click', () => {
            modaleSupprimerProjet.style.display = "block";
            modaleAjouterProjet.style.display = "none";
            resetForm();
        });

        // Reprend la fonction de fermeture de la modale sur le bouton close.
        const boutonFermer = modale.querySelector('.form-ajout .modale-close');
        boutonFermer.addEventListener('click', () => {
            modale.style.display = "none";
            modale.setAttribute("aria-hidden", true);
            modale.removeAttribute("aria-modal");
            document.body.style.overflow = "auto";
            modaleSupprimerProjet.style.display = "block";
            modaleAjouterProjet.style.display = "none";
            resetForm();
        });
    });
}

/**
 * Fonction qui affiche l'image selectionnee dans la box de previsualisation
 */

export function previewImage () {

    //Recuperation du DOM
    const input = document.getElementById('photo-upload');
    const preview = document.getElementById('preview');
    const content = document.getElementById('uploadContent');
    const cancelBtn = document.getElementById('cancelBtn');

    // Ajout d'un evenement lorsque l'image de la box change de rien a l'image selectionnee
    input.addEventListener('change', () => {
        const file = input.files[0];
        // Condition si le fichier est bien une image et est bien charge
        if (file && file.type.startsWith('image/')) {
            //Recupere le fichier image et s'assure de le rendre dans le bon format pour l'API
            const reader = new FileReader();
            // Lorsque le fichier est charge alors change les attributs des elements du DOM qui sont necessaires et affiche le bouton d'annulation
            reader.onload = e => {
                preview.src = e.target.result;
                preview.style.display = 'block';
                content.style.display = 'none';
                cancelBtn.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
        }
    });

    // Ajout de l'evenement lors du click sur le bouton "Annuler" et remet la box ou l'image est pre-chargee a l'etat initial
    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault()
        input.value = '';
        preview.src = '';
        preview.style.display = 'none';
        content.style.display = 'flex';
        cancelBtn.style.display = 'none';
    });
}

/**
 * Fonction qui envoie les donnees du formulaire, en mettant en format {JSON},a l'API et qui ajoute le projet a celui-ci si toutes les donnees
 * sont remplies dans les champs du formulaire.
 */

export function submitFormulaire () {

    // On recupere le formulaire et on ajoute l'evenement de type submit
    const form = document.querySelector(".form-ajout form");
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // On recupere chaque donnee du formulaire.
        const imageInput = document.getElementById('photo-upload');
        const titleInput = form.querySelector('input[name="title"]');
        const categorySelect = form.querySelector('select[name="category"]');
        const erreurSubmit = form.querySelector(".erreurSubmit");

        // Condition dans laquelle toutes les donnees du formulaire ne sont pas entrees
        if (!imageInput.files[0] || titleInput.value === "" || !categorySelect.value) {
            erreurSubmit.innerText = "Veuillez remplir tous les champs du formulaire.";
            erreurSubmit.style.display = "block"
            return;
        } else {
            erreurSubmit.innerText = "";
            erreurSubmit.style.display = "none";
        }

        // Transforme toutes les donnees du formulaire en un objet
        const formData = new FormData();
        formData.append("image", imageInput.files[0]);
        formData.append("title", titleInput.value);
        formData.append("category", categorySelect.value);

        // Essai de l'envoi de l'objet a l'API
        try {
            const reponse = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            });

            if(!reponse.ok) {
                throw new Error("Erreur lors de l'ajout du projet.")
            }

            // Recuperation des projets de l'API mis a jour.
            const nouvelleReponse = await fetch("http://localhost:5678/api/works");
            const nouveauxProjets = await nouvelleReponse.json();

            // Rafraichissement des pages projets et de la modale de suppression la ou les projets sont affiches afin de les mettre a jour 
            const galerieModale = document.querySelector('.photosGalerie');
            const galleriePortfolio = document.querySelector('.gallery')
            galerieModale.innerHTML = "";
            genererProjetModale(nouveauxProjets);
            supprimerProjetModale();

            galleriePortfolio.innerHTML = "";
            genererProjets(nouveauxProjets);

            // Re-initialisation du formulaire
            resetForm();
            

        } catch (error) {
            console.error("Erreur : ", error);
            alert("Une erreur est survenue lors de l'ajout du projet !");
        }
    });
}

/**
 * Fonction qui re-initialise le formulaire a zero
 */
function resetForm () {
    // Recuperation du formulaire
    const form = document.querySelector(".form-ajout form");
    // Fonction qui remet par defaut les champs de formulaire a zero
    form.reset();
    // Re-initialise la box de previsualisation
    document.getElementById('preview').style.display = "none";
    document.getElementById('uploadContent').style.display = "flex";
    document.getElementById('cancelBtn').style.display = "none";
    form.querySelector(".erreurSubmit").style.display = "none";
}