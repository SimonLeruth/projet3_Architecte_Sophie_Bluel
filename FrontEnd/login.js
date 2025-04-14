/*************************************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement de la connexion au site. 
 * 
 *************************************************************************************************/

/**
 * Fonction qui verifie par rapport a l'API les donnees rentrees dans le formulaire de connexion
 */
function seConnecter () {

    // Recuperation du formulaire
    const form = document.querySelector('.formSeConnecter');

    // Ajout de l'evenement submit.
    form.addEventListener('submit', async (event) => {
        
        // On evite le refresh de la page lors de l'appui
        event.preventDefault();

        // on stocke dans des constantes les besoins pour faire appel a l'API
        const email = document.getElementById('email').value;
        const password = document.getElementById('passwd').value;
        const idConnexion = {email: email, password: password};
        const errorMessage = document.querySelector('.erreur-message');

        // On envoie les donnees du formulaire a l'API qui nous renvoie un fichier JSON
        const reponse = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(idConnexion)
        });

        // On teste si la reponse n'etait pas un code erreur, et si oui on active le paragraphe indiquant a l'utilisateur son erreur
        if (!reponse.ok) {
            errorMessage.textContent = "E-mail ou mot de passe incorrect."
            errorMessage.style.display = "block";
            return;
        } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
        }

        // On stocke dans une variable le fichier JSON transforme en objet et ajoute le token re-envoye par l'API au localStorage. 
        // Ensuite nous redirigeons la connexion sur la page index.html
        const data = await reponse.json();
        sessionStorage.setItem("token", data.token);
        window.location.href = "index.html";
    })
}

seConnecter();