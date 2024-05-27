/************************************************************/
/**
 * Université Sorbonne Paris Nord, Programmation Web
 * Auteurs                       : Étienne André
 * Création                      : 2023/12/11
 * Dernière modification         : 2024/04/02
 */
/************************************************************/

'use strict'

/************************************************************/
/* Constantes */
/************************************************************/

/*------------------------------------------------------------*/
// Dimensions du plateau
/*------------------------------------------------------------*/

// Nombre de cases par défaut du simulateur
const LARGEUR_PLATEAU	= 30;
const HAUTEUR_PLATEAU	= 15;

// Dimensions des cases par défaut en pixels
const LARGEUR_CASE	= 40;
const HAUTEUR_CASE	= 40;
var STOP = true;
var TRAIN_TAB = [];

var audio = new Audio();
audio.src = "audio/tchou.mp3";

var audio2 = new Audio();
audio2.src = "audio/yarayah.mp3";

var audio3 = new Audio();
audio3.src = "audio/bib.mp3";


audio.controls = true;
audio2.controls = true;
audio3.controls = true;

/*------------------------------------------------------------*/
// Types des cases
/*------------------------------------------------------------*/
class Type_de_case{
	static Foret						= new Type_de_case('foret');

	static Eau							= new Type_de_case('eau');

	static Rail_horizontal				= new Type_de_case('rail horizontal');

	static Rail_vertical				= new Type_de_case('rail vertical');

	// NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le haut (ou de vertical vers horizontal en allant de bas vers gauche)
	static Rail_droite_vers_haut		= new Type_de_case('rail droite vers haut');

	// NOTE: faisant la jonction de vertical à horizontal en allant vers le haut puis vers la droite (ou de horizontal à vertical en allant de gauche vers le bas)
	static Rail_haut_vers_droite		= new Type_de_case('rail haut vers droite');

	// NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le bas (ou de vertical vers horizontal en allant de haut vers gauche)
	static Rail_droite_vers_bas		= new Type_de_case('rail droite vers bas');

	// NOTE: faisant la jonction de vertical à horizontal en allant vers le bas puis vers la droite (ou de horizontal à vertical en allant de gauche vers le haut)
	static Rail_bas_vers_droite		= new Type_de_case('rail bas vers droite');

	constructor(nom) {
		this.nom = nom;
	}
}



/*------------------------------------------------------------*/
// Images
/*------------------------------------------------------------*/





//BASIC

const IMAGE_FORET = new Image();
IMAGE_FORET.src = 'images/grass.png';

const IMAGE_EAU = new Image();
IMAGE_EAU.src = 'images/sol.png';


const IMAGE_RAIL_HORIZONTAL = new Image();
IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png'

const IMAGE_RAIL_VERTICAL = new Image();
IMAGE_RAIL_VERTICAL.src = 'images/vertical.png';

const IMAGE_RAIL_BAS_VERS_DROITE = new Image();
IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rightup.png';

const IMAGE_RAIL_DROITE_VERS_BAS = new Image();
IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/upleft.png';

const IMAGE_RAIL_DROITE_VERS_HAUT = new Image();
IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/leftup.png';

const IMAGE_RAIL_HAUT_VERS_DROITE = new Image();
IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/upright.png';

//SANDY

const IMAGE_EAUX = new Image();
IMAGE_EAUX.src = 'images/eaux.png';

const IMAGE_SABLE = new Image();
IMAGE_SABLE.src = 'images/sols.png';

const IMAGE_HS = new Image();
IMAGE_HS.src = 'images/hs.png';

const IMAGE_VS = new Image();
IMAGE_VS.src = 'images/vs.png';

const IMAGE_RUS = new Image();
IMAGE_RUS.src = 'images/rus.png';

const IMAGE_ULS = new Image();
IMAGE_ULS.src = 'images/uls.png';

const IMAGE_LUS = new Image();
IMAGE_LUS.src = 'images/lus.png';

const IMAGE_URS = new Image();
IMAGE_URS.src = 'images/urs.png';



//VOLCAN

const IMAGE_EAUVOL = new Image();
IMAGE_EAUVOL.src = 'images/eau_volcan.png';

const IMAGE_SOLVOL = new Image();
IMAGE_SOLVOL.src = 'images/sol_volcan.png';

const IMAGE_HV = new Image();
IMAGE_HV.src = 'images/h-v.png';

const IMAGE_VV = new Image();
IMAGE_VV.src = 'images/v-v.png';

const IMAGE_RUV = new Image();
IMAGE_RUV.src = 'images/ru-v.png';

const IMAGE_ULV = new Image();
IMAGE_ULV.src = 'images/ul-v.png';

const IMAGE_LUV = new Image();
IMAGE_LUV.src = 'images/lu-v.png';

const IMAGE_URV = new Image();
IMAGE_URV.src = 'images/ur-v.png';


const IMAGE_LOCO = new Image();
IMAGE_LOCO.src = 'images/locomotive.png';

const IMAGE_WAGON = new Image();
IMAGE_WAGON.src = 'images/wagon.png';


/************************************************************/
// Variables globales
/************************************************************/

// TODO


/************************************************************/
/* Classes */
/************************************************************/

/*------------------------------------------------------------*/
// Plateau
/*------------------------------------------------------------*/

class Plateau{
	/* Constructeur d'un plateau vierge */
	constructor(){
		this.largeur = LARGEUR_PLATEAU;
		this.hauteur = HAUTEUR_PLATEAU;

		this.cases = [];
		for (let x = 0; x < this.largeur; x++) {
			this.cases[x] = [];
			for (let y = 0; y < this.hauteur; y++) {
				this.cases[x][y] = Type_de_case.Foret;
			}
		}
	}

	

}

function collision(TRAIN_TAB, context, plateau) {
	let offset;
    for (let i = 0; i < TRAIN_TAB.length; i++) {
        for (let j = 0; j < TRAIN_TAB[i].wagons.length; j++) {
            for (let k = i; k < TRAIN_TAB.length; k++) {
				if ( i === k ) {
					offset = j+1
				}
				else{
					offset = 0; 
				}
                for (let l = offset; l < TRAIN_TAB[k].wagons.length; l++) {
                    if (TRAIN_TAB[i].wagons[j].position[0] === TRAIN_TAB[k].wagons[l].position[0] &&
						TRAIN_TAB[i].wagons[j].position[1] === TRAIN_TAB[k].wagons[l].position[1]) {
						TRAIN_TAB[i].effacer(context, plateau);
						TRAIN_TAB[k].effacer(context, plateau);
						
						let tpm = TRAIN_TAB[i];
						let tpm2 = TRAIN_TAB[k];
					
						TRAIN_TAB.splice(i, 1);
						TRAIN_TAB.splice(k-1, 1);		

						// Colision detecter
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function getNumOfWagons(type) {
	switch (type){
			case "bouton_train_1":
			return 1;
			case "bouton_train_2":
				return 2;
			case "bouton_train_4":
				return 4;
			case "bouton_train_6":
			    return 6;
		}
}

function move(train, page, plateau, x1, y1, direction, index) {
    // Nettoyage de la case actuelle
    page.clearRect(x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
    page.fillStyle = "gray";
    page.fillRect(x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
    page.drawImage(image_of_case(plateau.cases[x1][y1], current_world()), x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);

    // Initialisation des nouvelles coordonnées
    let newX = x1;
    let newY = y1;

    switch (direction) {
        case 'up':
            newY--;
            break;
        case 'down':
            newY++;
            break;
        case 'left':
            newX--;
            break;
        case 'right':
            newX++;
            break;
        default:
            console.log('Invalid direction');
            return; // Arrêter la fonction si la direction n'est pas valide
    }

    // Choix de l'image en fonction de si le wagon est le premier
    const imageType = train.wagons[index].isFirst ? IMAGE_WAGON : IMAGE_LOCO;
    page.drawImage(imageType, newX * LARGEUR_CASE, newY * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);

    // Mise à jour de la position du wagon
    train.wagons[index].position = [newX, newY];
}


class Wagon {
	constructor(direction, position, bol) {
		this.isFirst = bol;
		this.direction = direction;
		this.position = position;
	}
}

class Train{

	constructor(type) {
		this.type = type;
		this.nb_of_wagons = getNumOfWagons(type);
		this.wagons = [];
	}

	effacer(page, plateau) {
		for (let i = 0; i < this.nb_of_wagons; i++) {
			let [x1, y1] = this.wagons[i].position;
			page.clearRect(x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
			page.fillStyle = "gray";
			page.fillRect(x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
			page.drawImage(image_of_case(plateau.cases[x1][y1], current_world()), x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
		}
	}

	// Fonction de déplacement tu train ici
	avancer(page, plateau) {
		for (let i = 0; i < this.nb_of_wagons; i++) {
			let [x, y] = this.wagons[i].position;
			let j = 0, k = 0;
			switch (this.wagons[i].direction) {
				case "up":
					k = -1;
					break;
				case "down":
					k = 1;
					break;
				case "right":
					j = 1;
					break;
				case "left":
					j = -1;
					break;
			}
			if (plateau.cases[x + j][y + k].nom.includes("rail")) {
				console.log("Deplacement possible !! ");
				let tmp_direction = this.wagons[i].direction;
				switch (plateau.cases[x + j][y + k]) {
					case Type_de_case.Rail_bas_vers_droite:
						if (this.wagons[i].direction === "down") {
							this.wagons[i].direction = "right";
						} else {
							this.wagons[i].direction = "up";
						}
						
						break;
					case Type_de_case.Rail_droite_vers_bas:
						if (this.wagons[i].direction === "right")
							this.wagons[i].direction = "down";
						else {
							this.wagons[i].direction = "left";
						}
						break;
					case Type_de_case.Rail_droite_vers_haut:
						if (this.wagons[i].direction === "right") {
							this.wagons[i].direction = "up";
						}
						else {
							this.wagons[i].direction = "left";
						}
						break;
					case Type_de_case.Rail_haut_vers_droite:
						if (this.wagons[i].direction === "up") {
							this.wagons[i].direction = "right";
						} else {
							this.wagons[i].direction = "down";
						}
						break;
				}
				move(this, page, plateau, x, y, tmp_direction, i);
				
			}
			else {
				console.log("Déplacement Impossible");
				this.effacer(page, plateau);
				TRAIN_TAB.splice(i, 1);
				return false;
			}
		}	
	}

	initTrain(x1, y1) {
		for (let index = 0; index < this.nb_of_wagons; index++) {
			if (index === 0) {
				this.wagons.push(new Wagon("right", [x1, y1], 0));
			} else {
				this.wagons.push(new Wagon("right", [x1 - index, y1], 1));
			}
			
		}
	}

	dessiner(x1, y1, page, plateau) {
		let isDrawn = false;
		switch(this.type) {
			case "bouton_train_1":
				if (plateau.cases[x1][y1] === Type_de_case.Rail_horizontal) {
					this.initTrain(x1, y1);
					page.drawImage(IMAGE_LOCO, x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					isDrawn = true;
				}
				break;
			case "bouton_train_2":
				if ((x1 - 1) >= 0 && (x1 - 1) <= 29 && [[x1, y1], [x1 - 1, y1]].every(([x, y]) => plateau.cases[x][y] === Type_de_case.Rail_horizontal)) {
					this.initTrain(x1, y1);
					page.drawImage(IMAGE_LOCO, x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1-1) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);

					isDrawn = true;
					console.log("isdrawn");
				}
				break;
			case "bouton_train_4":
				if ((x1-3) >= 0 && (x1-2) <= 27 && [[x1, y1], [x1-1, y1], [x1-2,y1], [x1-3,y1]].every(([x, y]) => plateau.cases[x][y] === Type_de_case.Rail_horizontal) ){
					this.initTrain(x1, y1);
					//this.position.push([x1, y1], [x1 - 1, y1], [x1 - 2, y1], [x1 - 3, y1]);
					page.drawImage(IMAGE_LOCO, x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					
					page.drawImage(IMAGE_WAGON, (x1 - 1) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1 - 2) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1 - 3) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					isDrawn = true;
				}
				break;
			case "bouton_train_6":
				if ((x1-5) >= 0 && (x1-5) <= 25 && [[x1, y1], [x1-1, y1], [x1-2,y1], [x1-3,y1], [x1-4,y1], [x1-5,y1]].every(([x, y]) => plateau.cases[x][y] === Type_de_case.Rail_horizontal)){
					this.initTrain(x1, y1);
					
					page.drawImage(IMAGE_LOCO, x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1 - 5) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1 - 1) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1 - 2) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1 - 3) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					page.drawImage(IMAGE_WAGON, (x1 - 4) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
					isDrawn = true;
			}
				break;
		}
		
	return isDrawn;
	}
}


/************************************************************/
// Méthodes
/************************************************************/

function image_of_case(type_de_case, world){
	switch (world) {
		case "1":
			switch(type_de_case){
				case Type_de_case.Foret					: return IMAGE_FORET;
				case Type_de_case.Eau					: return IMAGE_EAU;
				case Type_de_case.Rail_horizontal		: return IMAGE_RAIL_HORIZONTAL;
				case Type_de_case.Rail_vertical			: return IMAGE_RAIL_VERTICAL;
				case Type_de_case.Rail_droite_vers_haut	: return IMAGE_RAIL_DROITE_VERS_HAUT;
				case Type_de_case.Rail_haut_vers_droite	: return IMAGE_RAIL_HAUT_VERS_DROITE;
				case Type_de_case.Rail_droite_vers_bas	: return IMAGE_RAIL_DROITE_VERS_BAS;
				case Type_de_case.Rail_bas_vers_droite	: return IMAGE_RAIL_BAS_VERS_DROITE;
			}
		case "2":
			switch(type_de_case){
				case Type_de_case.Foret					: return IMAGE_SABLE;
				case Type_de_case.Eau					: return IMAGE_EAUX;
				case Type_de_case.Rail_horizontal		: return IMAGE_HS;
				case Type_de_case.Rail_vertical			: return IMAGE_VS;
				case Type_de_case.Rail_droite_vers_haut	: return IMAGE_LUS;
				case Type_de_case.Rail_haut_vers_droite	: return IMAGE_URS;
				case Type_de_case.Rail_droite_vers_bas	: return IMAGE_ULS;
				case Type_de_case.Rail_bas_vers_droite	: return IMAGE_RUS;
			}

		case "3":
			switch(type_de_case){
				case Type_de_case.Foret					: return IMAGE_SOLVOL;
				case Type_de_case.Eau					: return IMAGE_EAUVOL;
				case Type_de_case.Rail_horizontal		: return IMAGE_HV;
				case Type_de_case.Rail_vertical			: return IMAGE_VV;
				case Type_de_case.Rail_droite_vers_haut	: return IMAGE_LUV;
				case Type_de_case.Rail_haut_vers_droite	: return IMAGE_URV;
				case Type_de_case.Rail_droite_vers_bas	: return IMAGE_ULV;
				case Type_de_case.Rail_bas_vers_droite	: return IMAGE_RUV;
			}

	}
	
}


function dessine_case(contexte, plateau, x, y){
	const la_case = plateau.cases[x][y];
	
	let image_a_afficher = image_of_case(la_case, current_world());
	switch(image_a_afficher){
		case IMAGE_RAIL_BAS_VERS_DROITE : 
		case IMAGE_RAIL_VERTICAL :
		case IMAGE_RAIL_HORIZONTAL :
		case IMAGE_RAIL_HAUT_VERS_DROITE :
		case IMAGE_RAIL_DROITE_VERS_HAUT :
		case IMAGE_RAIL_DROITE_VERS_BAS :
		 break;

	}
	// Affiche l'image concernée
	contexte.drawImage(image_a_afficher, x * LARGEUR_CASE, y * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
}

function dessine_plateau(page, plateau){

	// Dessin du plateau avec paysages et rails
	for (let x = 0; x < plateau.largeur; x++) {
		for (let y = 0; y < plateau.hauteur; y++) {
			dessine_case(page, plateau, x, y);
		}
	}
}

function type_de_case_par_boutons(type_bouton) {
	switch (type_bouton) {
		case "bouton_foret":
			return Type_de_case.Foret
			break;
		case "bouton_eau":
			return Type_de_case.Eau
			break;
		case "bouton_rail_horizontal":
			return Type_de_case.Rail_horizontal
			break;
		case "bouton_rail_vertical":
			return Type_de_case.Rail_vertical
			break;
		case "bouton_rail_droite_vers_haut":
			return Type_de_case.Rail_droite_vers_haut
			break;
		case "bouton_rail_haut_vers_droite":
			return Type_de_case.Rail_haut_vers_droite
			break;
		case "bouton_rail_droite_vers_bas":
			return Type_de_case.Rail_droite_vers_bas
			break;
		case "bouton_rail_bas_vers_droite":
			return Type_de_case.Rail_bas_vers_droite
	}

}

function modifier_plateau(page, plateau) {
    let button = document.getElementById('bouton_foret');
    let current_id;
    const wrapper = document.getElementById('boutons');
    const platt = document.getElementById('simulateur');
    let rect = platt.getBoundingClientRect();  // Initial calculation of bounding rectangle

    // Update rect on window resize or scroll
    window.addEventListener('resize', function() {
        rect = platt.getBoundingClientRect();
    });
    window.addEventListener('scroll', function() {
        rect = platt.getBoundingClientRect();
    });

    platt.addEventListener('mousemove', function(event) {
		
        let x1 = Math.floor((event.clientX - rect.left) / LARGEUR_CASE);
        let y1 = Math.floor((event.clientY - rect.top) / HAUTEUR_CASE);
    });

    let activePlattListener = null;

    wrapper.addEventListener('click', function(event) {
        const isButton = event.target.nodeName === 'BUTTON' && event.target.id !== 'bouton_pause';
        if (!isButton) {
            return;
        }
        if (event.target.id !== current_id) {
            if (button) button.removeAttribute("disabled");
            current_id = event.target.id;
            button = document.getElementById(current_id);
            button.setAttribute("disabled", "");
        }

        if (activePlattListener) {
            platt.removeEventListener('click', activePlattListener);
        }

        activePlattListener = function(ev) {
            let x1 = Math.floor((ev.clientX - rect.left) / LARGEUR_CASE);
            let y1 = Math.floor((ev.clientY - rect.top) / HAUTEUR_CASE);
            if (event.target.id.includes("train")) {
                let test_train = new Train(event.target.id);
                if (test_train.dessiner(x1, y1, page, plateau)) {
					//page.drawImage(IMAGE_LOCO, (x1) * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
            		TRAIN_TAB.push(test_train);
        		}
            } else {
                page.clearRect(x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
                if (event.target.id.includes("rail")) {
                    page.fillStyle = "gray";
                    page.fillRect(x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
                }
                plateau.cases[x1][y1] = type_de_case_par_boutons(event.target.id);
                page.drawImage(image_of_case(type_de_case_par_boutons(event.target.id), current_world()), x1 * LARGEUR_CASE, y1 * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
            }
        };

        platt.addEventListener('click', activePlattListener);
    });
}

var STOP = false;
function ecoute_pause(page, plateau) {
	const wrapper = document.getElementById("bouton_pause");
	wrapper.addEventListener('click', function (event) {	
		console.log("JE SUIS PAUSE");
		if (STOP === false) {
			STOP = true
		} else {
			STOP = false;
			loop(page, plateau);
		}
	})
}


/************************************************************/
// Plateau de jeu initial
/************************************************************/


function cree_plateau_initial(plateau){
	current_world();
	// Circuit
	plateau.cases[12][7] = Type_de_case.Rail_horizontal;
	plateau.cases[13][7] = Type_de_case.Rail_horizontal;
	plateau.cases[14][7] = Type_de_case.Rail_horizontal;
	plateau.cases[15][7] = Type_de_case.Rail_horizontal;
	plateau.cases[16][7] = Type_de_case.Rail_horizontal;
	plateau.cases[17][7] = Type_de_case.Rail_horizontal;
	plateau.cases[18][7] = Type_de_case.Rail_horizontal;
	plateau.cases[19][7] = Type_de_case.Rail_droite_vers_haut;
	plateau.cases[19][6] = Type_de_case.Rail_vertical;
	plateau.cases[19][5] = Type_de_case.Rail_droite_vers_bas;
	plateau.cases[12][5] = Type_de_case.Rail_horizontal;
	plateau.cases[13][5] = Type_de_case.Rail_horizontal;
	plateau.cases[14][5] = Type_de_case.Rail_horizontal;
	plateau.cases[15][5] = Type_de_case.Rail_horizontal;
	plateau.cases[16][5] = Type_de_case.Rail_horizontal;
	plateau.cases[17][5] = Type_de_case.Rail_horizontal;
	plateau.cases[18][5] = Type_de_case.Rail_horizontal;
	plateau.cases[11][5] = Type_de_case.Rail_haut_vers_droite;
	plateau.cases[11][6] = Type_de_case.Rail_vertical;
	plateau.cases[11][7] = Type_de_case.Rail_bas_vers_droite;

	// Segment isolé à gauche
	plateau.cases[0][7] = Type_de_case.Rail_horizontal;
	plateau.cases[1][7] = Type_de_case.Rail_horizontal;
	plateau.cases[2][7] = Type_de_case.Rail_horizontal;
	plateau.cases[3][7] = Type_de_case.Rail_horizontal;
	plateau.cases[4][7] = Type_de_case.Rail_horizontal;
	plateau.cases[5][7] = Type_de_case.Eau;
	plateau.cases[6][7] = Type_de_case.Rail_horizontal;
	plateau.cases[7][7] = Type_de_case.Rail_horizontal;

	// Plan d'eau
	for(let x = 22; x <= 27; x++){
		for(let y = 2; y <= 5; y++){
			plateau.cases[x][y] = Type_de_case.Eau;
		}
	}

	// Segment isolé à droite
	plateau.cases[22][8] = Type_de_case.Rail_horizontal;
	plateau.cases[23][8] = Type_de_case.Rail_horizontal;
	plateau.cases[24][8] = Type_de_case.Rail_horizontal;
	plateau.cases[25][8] = Type_de_case.Rail_horizontal;
	plateau.cases[26][8] = Type_de_case.Rail_bas_vers_droite;
	plateau.cases[27][8] = Type_de_case.Rail_horizontal;
	plateau.cases[28][8] = Type_de_case.Rail_horizontal;
	plateau.cases[29][8] = Type_de_case.Rail_horizontal;

	// TCHOU
	plateau.cases[3][10] = Type_de_case.Eau;
	plateau.cases[4][10] = Type_de_case.Eau;
	plateau.cases[4][11] = Type_de_case.Eau;
	plateau.cases[4][12] = Type_de_case.Eau;
	plateau.cases[4][13] = Type_de_case.Eau;
	plateau.cases[4][13] = Type_de_case.Eau;
	plateau.cases[5][10] = Type_de_case.Eau;

	plateau.cases[7][10] = Type_de_case.Eau;
	plateau.cases[7][11] = Type_de_case.Eau;
	plateau.cases[7][12] = Type_de_case.Eau;
	plateau.cases[7][13] = Type_de_case.Eau;
	plateau.cases[8][10] = Type_de_case.Eau;
	plateau.cases[9][10] = Type_de_case.Eau;
	plateau.cases[8][13] = Type_de_case.Eau;
	plateau.cases[9][13] = Type_de_case.Eau;

	plateau.cases[11][10] = Type_de_case.Eau;
	plateau.cases[11][11] = Type_de_case.Eau;
	plateau.cases[11][12] = Type_de_case.Eau;
	plateau.cases[11][13] = Type_de_case.Eau;
	plateau.cases[12][11] = Type_de_case.Eau;
	plateau.cases[13][10] = Type_de_case.Eau;
	plateau.cases[13][11] = Type_de_case.Eau;
	plateau.cases[13][12] = Type_de_case.Eau;
	plateau.cases[13][13] = Type_de_case.Eau;

	plateau.cases[15][10] = Type_de_case.Eau;
	plateau.cases[15][11] = Type_de_case.Eau;
	plateau.cases[15][12] = Type_de_case.Eau;
	plateau.cases[15][13] = Type_de_case.Eau;
	plateau.cases[16][10] = Type_de_case.Eau;
	plateau.cases[16][13] = Type_de_case.Eau;
	plateau.cases[17][10] = Type_de_case.Eau;
	plateau.cases[17][11] = Type_de_case.Eau;
	plateau.cases[17][12] = Type_de_case.Eau;
	plateau.cases[17][13] = Type_de_case.Eau;

	plateau.cases[19][10] = Type_de_case.Eau;
	plateau.cases[19][11] = Type_de_case.Eau;
	plateau.cases[19][12] = Type_de_case.Eau;
	plateau.cases[19][13] = Type_de_case.Eau;
	plateau.cases[20][13] = Type_de_case.Eau;
	plateau.cases[21][10] = Type_de_case.Eau;
	plateau.cases[21][11] = Type_de_case.Eau;
	plateau.cases[21][12] = Type_de_case.Eau;
	plateau.cases[21][13] = Type_de_case.Eau;
}


/************************************************************/
// Fonction principale
/************************************************************/

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function loop(context, plateau) {
	let world = current_world();
	switch (world){
		case "1": 
			audio.play();
			break;
		case "2": 
			audio2.play();
			break;
		case "3": 
			audio3.play();
			break;
	}
	
	while (!STOP) {
        await new Promise(resolve => setTimeout(resolve, 500)); 
		if (TRAIN_TAB.length > 0) {
			collision(TRAIN_TAB, context, plateau);
            TRAIN_TAB.forEach(train => {
                train.avancer(context, plateau);
			});
        } else {
            STOP = true; 
            break;
		}
    }

	audio.pause();
	audio2.pause();
	audio3.pause();
}

function current_world(){
	var e = document.getElementById("worlds");
	var value = e.value;
	if (value == "2") {
		document.getElementById("bouton_foret").style.backgroundImage = "url(../images/sols.png)";
		document.getElementById("bouton_eau").style.backgroundImage = "url(../images/eaux.png)";
	}
	if (value == "3") {
		document.getElementById("bouton_foret").style.backgroundImage = "url(../images/sol_volcan.png)";
		document.getElementById("bouton_eau").style.backgroundImage = "url(../images/eau_volcan.png)";
	}
	
	return value;
}



async function tchou(){
	/*------------------------------------------------------------*/
	// Variables DOM
	/*------------------------------------------------------------*/
	const contexte = document.getElementById('simulateur').getContext("2d");

	// Création du plateau
	let plateau = new Plateau();
	cree_plateau_initial(plateau);

	// Dessine le plateau
	dessine_plateau(contexte, plateau);
	modifier_plateau(contexte, plateau);
	ecoute_pause(contexte, plateau);
	
	loop(contexte, plateau);

}

/************************************************************/
// Programme principal
/************************************************************/
// NOTE: rien à modifier ici !
window.addEventListener("load", () => {
	// Appel à la fonction principale
	tchou();
});



