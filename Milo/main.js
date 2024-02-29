function calculer() {
    const nom = document.getElementById('nom').value;
    const dateNaissance = new Date(document.getElementById('dateNaissance').value);
    const resultats = document.getElementById('resultats');
    resultats.innerHTML = '';

    for (let i = 1000; i <= 100000; i += 1000) {
        let nouvelleDate = new Date(dateNaissance);
        nouvelleDate.setDate(nouvelleDate.getDate() + i);
        let dateString = nouvelleDate.toISOString().split('T')[0];
        resultats.innerHTML += `<p>${nom} : Le ${dateString} aura ${i} jours</p>`;
    }
}

function reinitialiser() {
    document.getElementById('nom').value = '';
    document.getElementById('dateNaissance').value = '';
    document.getElementById('resultats').innerHTML = '';
}
