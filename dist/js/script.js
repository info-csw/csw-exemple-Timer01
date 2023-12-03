// Récupérer les éléments du DOM
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

// Déclarer une variable pour stocker le nombre de secondes écoulées
let secondes = 0;
// Déclarer une variable pour stocker l'identifiant de l'intervalle
let timerInterval;

/** Fonction pour mettre à jour l'affichage du minuteur 
 */
function updateTimer() {
    // Calculer les heures (secondes divisées par 3600)
    const heures = Math.floor(secondes / 3600);
    // Calculer les minutes restantes (le reste de la division des secondes par 3600)
    let secondesRestantes = secondes % 3600;
    // Calculer les minutes (secondes restantes divisées par 60)
    const minutes = Math.floor(secondesRestantes / 60);
    // Calculer les secondes restantes (le reste de la division des secondes par 60)
    secondesRestantes = secondes % 60;
    // Afficher le temps restant dans le minuteur
    // Utiliser la méthode padStart pour ajouter un 0 devant les nombres < 10
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/padStart
    timerElement.textContent = `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondesRestantes).padStart(2, '0')}`;
}

/** Fonction pour démarrer le minuteur
 */ 
function startTimer() {
    // Appeler la fonction updateTimer toutes les secondes
    // https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
    timerInterval = setInterval(() => {
        secondes++;
        updateTimer();
    }, 1000);
    // Désactiver le bouton de démarrage
    startButton.disabled = true;
    // Activer les boutons de pause et de réinitialisation
    pauseButton.disabled = false;
    resetButton.disabled = false;
}

/** Fonction pour mettre en pause le minuteur
 */
function pauseTimer() {
    // Arrêter l'intervalle
    // https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
    clearInterval(timerInterval);
    // Activer le bouton de démarrage
    startButton.disabled = false;
    // Désactiver le bouton de pause
    pauseButton.disabled = true;
}

/** Fonction pour réinitialiser le minuteur
 */
function resetTimer() {
    // Arrêter l'intervalle
    clearInterval(timerInterval);
    // Réinitialiser le nombre de secondes écoulées
    secondes = 0;
    // Mettre à jour l'affichage du minuteur
    updateTimer();
    // Désactiver les boutons de pause et de réinitialisation
    pauseButton.disabled = true;
    resetButton.disabled = true;
    // Activer le bouton de démarrage
    startButton.disabled = false;
}

// Ajouter des event listener aux boutons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
