import {genererProjets, genererBoutonFiltres, activerFiltres} from "./works.js";

const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

genererProjets(works);
genererBoutonFiltres(categories);
activerFiltres(works);