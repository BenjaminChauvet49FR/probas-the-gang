const C = 0;
const P = 1;
const K = 2;
const T = 3;

function idVersNumero(pId) {
	return math.floor(pId/4)+1;
}

function idVersCouleur(pId) {
	return pId%4;
}

// Etant données les "cartes visibles", fabrique toutes les paires possibles de cartes restantes en regroupant ensemble les paires équivalentes.
// Les cartes sont par ordre croissant d'id.
// Les paires de cartes équivalentes sont, par exemple si coeur est dominant, : 5 coeur et 7 trèfle/ 5 coeur et 7 pique. Ou bien 3 carreau et 9 trèfle ; 3 pique et 9 pique. 
function pairesPossiblesEtNombres(pCartesVisibles, pCouleurDominante) {
	/* Imaginons le cas suivant : 2C 3C 6P 8T DC 
	Alors les paires sont : 
	2X3X : 9 paires
	2X4X : 9 paires
	2X4C : 3 paires
	3X4C : 3 paires
	2X5X : 9 paires
	2X5C : 3 paires
	3X5X : 9
	3X5C : 3
	4X5X : 9
	4C5X : 3
	4X5C : 3
	4C5C : 1
	...
	2X6X : 6
	2X6C : 3
	...
	4X6X : 6
	4X6C : 3
	...
	2X2X : 3
	3X3X : 3
	4X4X : 3
	4X4C : 3
	...
	6X6X : 1
	6X6C : 1
	
	*/
	
	
	
	// 4 cartes absentes : 6 paires possibles à ce numéro
	// 3 cartes absentes (mais pas la CD) : 3 paires possibles
	// 3 cartes absentes dont la CD : 3 paires possibles
	// 2 cartes absentes (mais pas la CD) : 1 paire possible
	// 2 cartes absentes (dont la CD) : 1 paire possible
	// 1 carte absente : aucune paire
	// Sélection 4*3 = 
	
	
	
	let iCV = 0; // indice carte visible
	let premierICV;
	let cdPres; // couleur dominante presente
	let cartesManquantesParNumSansCD = [0, 0,0,0,0, 0,0,0,0, 0,0,0,0,0];
	let cartesManquantesParNumCD =     [0, 0,0,0,0, 0,0,0,0, 0,0,0,0,0];
	for (let numero = 2 ; numero <= 14 ; numero++) {
		premierICV = iCV;
		cdPres = false;
		while (iCV < pCartesVisibles.length && idVersNumero(pCartesVisibles[iCV]) < pCartesVisibles) {
			iCV++;
			if (idVersCouleur(pCartesVisibles[iCV]) === pCouleurDominante) {
				cdPres = true;
			}
		}
		// [premierICV ; iCV[ : les cartes de pCartesVisibles à ces positions ont des numéros égaux à "numero".
		cartesManquantesParNumSansCD[numero] = iCV-premierICV;
		if (cdPres) {
			cartesManquantesParNumSansCD[numero]--;
			cartesManquantesParNumCD[numero] = 1;
		}
	}
	
	let paires = [];
	for (let numero = 3 ; numero <= 14 ; numero++) {
		for (let num2 = 2 ; num2 < numero ; num2++) {
			// Faire les paires numero2,numero	
		}
	}
	for (let numero = 2 ; numero <= 14 ; numero++) {
		// Faire les paires numero,numero
	}
}
