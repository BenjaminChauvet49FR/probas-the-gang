import { useEffect, useState } from "react";
import {MASTER_CHAINE_VALEURS, MASTER_CHAINE_COULEURS, genererIDCarte}  from "./logique/valeurMain.jsx"



export default function SerieCartes({monChangeur}) {
const [str, setStr] = useState("");

	  function essayerDeChangerCartes() {	  	
	//  console.log(str);
  		const tokens = str.split(" ");
  		const cartes = [];
  		let token = "";
  		let valeur, couleur;
  		let ok = true;
  		for (var i = 0 ; i < tokens.length ; i++) {
  			token = tokens[i];
  			if (token.length > 0) {
  				valeur = MASTER_CHAINE_VALEURS.indexOf(token[0]);
  				couleur = MASTER_CHAINE_COULEURS.indexOf(token[1]);
  				if (valeur != -1 && couleur != -1) {
  					cartes.push(genererIDCarte(valeur,couleur))
  				} else {
  					ok = false;
  					break;
  				}
  			}
  		}
  		if (ok) {
  			cartes.sort();
  			for (var i = 0 ; i < cartes.length-1 ; i++) {
  				if (cartes[i] === cartes[i+1]) {
  					ok = false;
  					break;
  				}
  			}  			
  		}
  		if (ok) {
  		  	monChangeur(cartes);
  		}
	  }
	  
	  
	  return <span><input
            type="text"
            onChange={(e) => setStr(e.target.value)}
          ></input><button onClick={() => essayerDeChangerCartes()}>Charger</button>
</span>
}
