/*********************************************************************************
 * 
 * Ce fichier contient toutes les appels de fonctions nécessaires au fonctionnement du site. 
 * 
 *********************************************************************************/

import {
    genererProjets, genererBoutonFiltres, activerFiltres, gererConnexion, 
    afficherModeEdition, afficherBoutonModifier, appelModale,genererProjetModale,
    supprimerProjetModale, ajouterProjet, previewImage, submitFormulaire
} from "./works.js";

// Recuperation des donnees de l'API
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();
const token = sessionStorage.getItem("token");

genererProjets(works);

if (token) {
    gererConnexion();
    afficherModeEdition();
    afficherBoutonModifier();
    appelModale();
    genererProjetModale(works);
    supprimerProjetModale();
    ajouterProjet();
    previewImage();
    submitFormulaire();
} else {
    genererBoutonFiltres(categories);
    activerFiltres(works);
}