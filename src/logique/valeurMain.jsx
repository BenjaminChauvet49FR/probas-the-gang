export const C = 0;
export const P = 1;
export const K = 2;
export const T = 3;

export const MAIN = {
	CARTE_HAUTE : 0,
	PAIRE : 1,
	DOUBLE_PAIRE : 2,
	BRELAN : 3,
	SUITE : 4,
	COULEUR : 5,
	FULL : 6,
	CARRE : 7,
	QUINTE_FLUSH : 8
}

export const mainCode = [
	"C.H.", "paire", "double paire", 
	"brelan", "suite", "couleur", 
	"full", "carre", "quinte flush"
];

export function couleurCode(pCo) {
	return "CPKT".charAt(pCo);
} 

export function idVersNumero(pId) {
	return Math.floor(pId/4)+2;
}

export function idVersCouleur(pId) {
	return pId%4;
}

export function valeurCode(pVal) {
	let vCode = "..234567891JQKA".charAt(pVal);
	if (vCode === "1") {
		vCode += "0";
	}
	return vCode;
}


// Etant donné le nombre d'occurences des cartes de 2 à 14 qui nous intéresse, un nombre n de cartes à chercher, on suppose que les cartes retournées (en excluant une valeur, correspondant à un carré/un brelan/une paire) sont V1 V2 ... Vn, renvoie le nombre (15**(n-1)*(V1) +  15**(n-2)*(V2) + ... + 15*V(n-1) + Vn
function valorisationSansPaires(pNombreOccurences, pCartesVoulues, pValeurExclue) {
	let reste = pCartesVoulues;
	let reponse = 0;
	let numero = 14;
	while (reste > 0 && numero >= 2) { // Sans le "numero >= 2", on bannit les mains de moins de 5 cartes...
		if (pNombreOccurences[numero] > 0 && numero !== pValeurExclue) {
			reponse *= 15;
			reponse += numero;
			reste--;
		}
		numero--;
	}
	return reponse;
}

export function valeurDeMain(pMain) {
	let couleurs = [0,0,0,0];
	for (let i = 0 ; i < pMain.length ; i++) {
		couleurs[idVersCouleur(pMain[i])]++;
	}
	
	// Détection d'une couleur maîtresse (voir d'une quinte flush)
	let reponse = [MAIN.CARTE_HAUTE, 0];
	let valeursCetteCouleur;
	let mainCetteCouleur;
	for (let c = 0 ; c < 4 ; c++) {
		if (couleurs[c] >= 5) {
			valeursCetteCouleur = [0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,0];
			for (let i = 0 ; i < pMain.length ; i++) {
				if (idVersCouleur(pMain[i]) == c) {
					valeursCetteCouleur[idVersNumero(pMain[i])]++;
				}
			}
			valeursCetteCouleur[1] = valeursCetteCouleur[14];
			
			// Detection d'une quinte flush
			let starter = -1;
			for (let n = 14 ; n >= 1; n--) {
				if (valeursCetteCouleur[n] > 0) {
					if (starter == -1) {
						starter = n;
					}
					if (starter == n+4) { // ON A LA QUINTE FLUSH !
						if (reponse[0] == MAIN.QUINTE_FLUSH) {
							reponse = [MAIN.QUINTE_FLUSH, Math.max(starter, reponse[1])];
						} else {
							reponse = [MAIN.QUINTE_FLUSH, starter];						
						}
					}
				} else {
					starter = -1;
					if (n < 5) {
						break;
					}
				}
				
			}
			// Couleur
			if (reponse[0] != MAIN.QUINTE_FLUSH) {
				reponse = [MAIN.COULEUR, valorisationSansPaires(valeursCetteCouleur,5, 0)];
			}
		}
	}
	if (reponse[0] === MAIN.QUINTE_FLUSH) {
		return reponse;
	}
	// Pas une quinte flush, on continue
	
	let valeurs = [0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,0];
	for (let i = 0 ; i < pMain.length ; i++) {
		valeurs[idVersNumero(pMain[i])]++;
	}
	
	// Détection des mains non colorées
	let valeurCarre = 0;
	let valeurBrelan = 0;
	let valeurPaire = 0;
	let valeurPaire2 = 0;
	let valeurSuite = 0;
	for (let n = 14 ; n >= 2 ; n--) {
		if (valeurs[n] >= 4) {
			valeurCarre = n;
			break;
		}
		if (valeurs[n] == 3 && valeurBrelan == 0) {
			valeurBrelan = n;
		} else if (valeurs[n] >= 2) { // La "paire suivant un brelan" peut être un brelan. Par contre, un brelan ne doit pas compter comme une paire, d'où le else.
			if (valeurPaire === 0) {
				valeurPaire = n;
			} else {
				valeurPaire2 = n;
			}
		}
		if (n >= 5 && valeurs[n] > 0 && valeurs[n-1] > 0 && valeurs[n-2] > 0 && valeurs[n-3] > 0 && valeurs[n-4] > 0) {
			valeurSuite = n;
		}
	}
	// Evaluation finale !
	if (valeurCarre > 0) {
		let valeurExtra = 0;
		for (let n = 14 ; n >= 2 ; n--) {
			if (valeurs[n] > 0 && n != valeurCarre) {
				valeurExtra = n; 
				break;
			}
		}
		// if (valeurExtra === 0) { return 1/0; } Dangereux si on a 4 cartes
		return [MAIN.CARRE, valeurCarre*15+valeurExtra]
	}
	if (valeurBrelan > 0 && valeurPaire > 0) {
		return [MAIN.FULL, valeurBrelan*15 + valeurPaire];
	}
	if (reponse[0] === MAIN.COULEUR) {
		return reponse;
	}
	if (valeurSuite > 0) {
		return [MAIN.SUITE, valeurSuite];
	}
	if (valeurBrelan > 0) {
		let compt = 0;
		return [MAIN.BRELAN, valeurBrelan*225+valorisationSansPaires(valeurs, 2, valeurBrelan)];
	}
	if (valeurPaire2 > 0) {	
		let valeurExtra = 0;
		for (let n = 14 ; n >= 2 ; n--) {
			if (valeurs[n] > 0 && n != valeurPaire && n != valeurPaire2) {
				valeurExtra = n; 
				break;
			}
		}
		//if (valeurExtra === 0) { return 1/0; } Dangereux si on a 4 cartes
		return [MAIN.DOUBLE_PAIRE, valeurPaire*225+valeurPaire2*15+valeurExtra]

	}
	if (valeurPaire > 0) {
		let compt = 0;
		return [MAIN.PAIRE, valeurPaire*3375+valorisationSansPaires(valeurs, 3, valeurPaire)];
	}
	return [MAIN.CARTE_HAUTE, valorisationSansPaires(valeurs, 5, 0)];

}



