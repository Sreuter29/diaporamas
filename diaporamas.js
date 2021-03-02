// SLIDER BARRE D outils
function getRandomInteger(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function installEventHandler(selector, type, eventHandler)
{
    var domObject;

    // Récupération du premier objet DOM correspondant au sélecteur.
    domObject = document.querySelector(selector);

    // Installation d'un gestionnaire d'évènement sur cet objet DOM.
    domObject.addEventListener(type, eventHandler);
}
// Codes des touches du clavier.
const TOUCHE_ESPACE = 32;
const TOUCHE_GAUCHE = 37;
const TOUCHE_DROITE = 39;

// La liste des slides du carrousel.
var slidesImages =
[
    { image: 'images/1.jpg', legend: 'Street Art'          },
    { image: 'images/2.jpg', legend: 'Fast Lane'           },
    { image: 'images/3.jpg', legend: 'Colorful Building'   },
    { image: 'images/4.jpg', legend: 'Skyscrapers'         },
    { image: 'images/5.jpg', legend: 'City by night'       },
    { image: 'images/6.jpg', legend: 'Tour Eiffel la nuit' }
];

// Objet contenant l'état du carrousel.
var state;

function onSliderGoToNext()
{
    // Passage à la slide suivante.
    state.index++;

    // Est-ce qu'on est arrivé à la fin de la liste des slides ?
    if(state.index == slidesImages.length)
    {
        // Oui, on revient au début (le carrousel est circulaire).
        state.index = 0;
    }

    // Mise à jour de l'affichage.
    refreshSlider();
}

function onSliderGoToPrevious()
{
    // Passage à la slide précédente.
    state.index--;

    // Est-ce qu'on est revenu au début de la liste des slides ?
    if(state.index < 0)
    {
        // Oui, on revient à la fin (le carrousel est circulaire).
        state.index = slidesImages.length - 1;
    }

    // Mise à jour de l'affichage.
    refreshSlider();
}

function onSliderGoToRandom()
{
    var index;

    do
    {
        /*
         * Récupération d'un numéro de slide aléatoire différent
         * du numéro de slide actuel.
         */
        index = getRandomInteger(0, slidesImages.length - 1);
    }
    while(index == state.index);

    // Passage à une slide aléatoire.
    state.index = index;

    // Mise à jour de l'affichage.
    refreshSlider();
}

function onSliderKeyUp(event)
{
    switch(event.keyCode)
    {
        case TOUCHE_DROITE:
        // On passe à la slide suivante.
        onSliderGoToNext();
        break;

        case TOUCHE_ESPACE:
        // On démarre ou on arrête le carrousel.
        onSliderToggle();
        break;

        case TOUCHE_GAUCHE:
        // On passe à la slide précédente.
        onSliderGoToPrevious();
        break;
    }
}

function onSliderToggle()
{
    var icon;

    // Modification de l'icône du bouton pour démarrer ou arrêter le carrousel.
    icon = document.querySelector('#slider-toggle i');

    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');

    // Est-ce que le carousel est démarré ?
    if(state.timer == null)
    {
        // Non, démarrage du carousel, toutes les deux secondes.
        state.timer = window.setInterval(onSliderGoToNext, 2000);

        this.title = 'Arrêter le carrousel';
    }
    else
    {
        // Oui, arrêt du carousel.
        window.clearInterval(state.timer);

        // Réinitialisation de la propriété pour le prochain clic sur le bouton.
        state.timer = null;

        this.title = 'Démarrer le carrousel';
    }
}

function onToolbarToggle()
{
    var icon;

    // Modification de l'icône du lien pour afficher ou cacher la barre d'outils.
    icon = document.querySelector('#toolbar-toggle i');

    icon.classList.toggle('fa-arrow-down');
    icon.classList.toggle('fa-arrow-right');

    // Affiche ou cache la barre d'outils.
    document.querySelector('.toolbar ul').classList.toggle('hide');
}

function refreshSlider()
{
    var sliderImage;
    var sliderLegend;

    sliderImage  = document.querySelector('#slider img');
    sliderLegend = document.querySelector('#slider figcaption');

    // Changement de la source de l'image et du texte de la légende du carrousel.
    sliderImage.src          = slidesImages[state.index].image;
    sliderLegend.textContent = slidesImages[state.index].legend;
}

document.addEventListener('DOMContentLoaded', function()
{
    // Initialisation du carrousel.
    state       = {};
    state.index = 0;                   // On commence à la première slide
    state.timer = null;                // Le carrousel est arrêté au démarrage


    // Installation des gestionnaires d'évènement.
    installEventHandler('#slider-random', 'click', onSliderGoToRandom);
    installEventHandler('#slider-previous', 'click', onSliderGoToPrevious);
    installEventHandler('#slider-next', 'click', onSliderGoToNext);
    installEventHandler('#slider-toggle', 'click', onSliderToggle);
    installEventHandler('#toolbar-toggle', 'click', onToolbarToggle);

    document.addEventListener('keyup', onSliderKeyUp);
    // Equivalent à installEventHandler('html', 'keyup', onSliderKeyUp);


    // Affichage initial.
    refreshSlider();
});

//DIAPO IMG AUTOMATIQUE
$(function() {
  var i=0;
  affiche();

  function affiche() {
    i++;
    if (i==1) precedent = '#img5'
    else precedent = '#img' + (i-1);
    var actuel = '#img' + i;
    $(precedent).fadeOut(2000);
    $(actuel).fadeIn(2000);
    if (i==5) i=0;
  }

  setInterval(affiche, 2000);
});

// SLIDER JS AVEC commandes
const items = document.querySelectorAll('.slider2 img');
const nbSlide = items.length;
const suivant = document.querySelector('.right');
const precedent2 = document.querySelector('.left');
let count = 0;

function slideSuivante(){
  items[count].classList.remove('active');
  if(count < nbSlide - 1){
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active')
}
suivant.addEventListener('click', slideSuivante)

function slidePrecedente(){
  items[count].classList.remove('active');

  if(count > 0){
    count--;
  } else {
    count = nbSlide - 1;
  }

  items[count].classList.add('active')
}
precedent2.addEventListener('click', slidePrecedente)

function keyPress(e){
  if(e.keyCode === 37){
    slidePrecedente();
  } else if(e.keyCode === 39){
    slideSuivante();
  }
}
document.addEventListener('keydown', keyPress)

// SLIDER AU GLISSER DEPOSER
const containerSlides = document.querySelector('.container-slides'),
slides = document.querySelectorAll('.slideBis'),
slideSize = 500;

let positionClic = 0,
positionGlissade = 0,
posInitiale,
posFinale,
limitePourDeplacer = 100;

containerSlides.addEventListener('mousedown', dragStart);

function dragStart(e){
  e.preventDefault();

  posInitiale = containerSlides.offsetLeft;
  positionClic = e.clientX;

  document.addEventListener('mousemove', bougerLeContainerASlides);
  document.addEventListener('pointerup', finDuDrag);
}

function bougerLeContainerASlides(e){
  positionGlissade = positionClic - e.clientX;
  positionClic = e.clientX;

  if(containerSlides.offsetLeft - positionGlissade > 0 || containerSlides.offsetLeft - positionGlissade < -2000){
    return;
  }

  containerSlides.style.left = `${containerSlides.offsetLeft - positionGlissade}px`;
}

function finDuDrag(e){
  posFinale = containerSlides.offsetLeft;

  if(posFinale - posInitiale < -limitePourDeplacer){
    bougerLesSlides(1);
  }
  else if (posFinale - posInitiale > limitePourDeplacer){
    bougerLesSlides(-1);
  }
  else {
    containerSlides.style.left = `${posInitiale}px`;
  }

  document.removeEventListener('mousemove', bougerLeContainerASlides);
  document.removeEventListener('pointerup', finDuDrag);
}


function bougerLesSlides(direction){
  containerSlides.classList.add('glissade');

  if(direction === 1){
    containerSlides.style.left = `${posInitiale - slideSize}px`;
  }
  else if (direction === -1){
    containerSlides.style.left = `${posInitiale + slideSize}px`;
  }
}

containerSlides.addEventListener('transitionend', () => {
  containerSlides.classList.remove('glissade');
})

// CAROUSEL BOOTSTRAP
// enlève le comportement par défaut: qd la souris passe dessus le carousel s'arrête
$('.carousel').carousel({
  pause: "null"
})
