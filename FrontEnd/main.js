import {
    genererProjets, genererBoutonFiltres, activerFiltres, gererConnexion, 
    afficherModeEdition, afficherBoutonModifier, appelModale,genererProjetModale,
    supprimerProjetModale, ajouterProjet, previewImage, submitFormulaire
} from "./works.js";

const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();
const token = localStorage.getItem("token");

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