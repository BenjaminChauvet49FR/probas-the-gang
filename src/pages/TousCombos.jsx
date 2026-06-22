import * as exploitationValeurMains from "../logique/exploitationValeurMains.jsx";
import {Carte} from '../Card.jsx';
import * as C from "../logique/constantesCartes.jsx";
import * as valeurMain from "../logique/valeurMain.jsx";
import SerieCartes from '../SerieCartes.jsx';
import { useEffect, useState } from "react";







export default function TousCombos() {
const [nombreCartesParJProv, setNombreCartesParJProv] = useState(2)
const [nombreCartesParJ, setNombreCartesParJ] = useState(2)
const [cartesVisibles, setCartesVisibles] = useState([C.C7])
const [statsMains, setStatsMains] = useState([])
const [total, setTotal] = useState(1)

useEffect(() => {
	const statsM = exploitationValeurMains.mainsPossiblesClassees(cartesVisibles, nombreCartesParJ);  
	setStatsMains(statsM);
	//setTotal(statsMains[statsMains.length-1].accumulation); INCORRECT ! Un coup à se taper des appels infinies parce qu'on appelle "statsMains".
	setTotal(statsM[statsM.length-1].accumulation);
}, [cartesVisibles, nombreCartesParJ]);


function changerCartesParJoueur() {
	setNombreCartesParJ(parseInt(nombreCartesParJProv, 10));
}

   // Credits : https://polvara.me/posts/create-an-array-containing-1-to-N-in-JS/ const rangeID = Array.from({ length: 52 }, (_, i) => i);
  return (
    <div>
      Cartes visibles : <SerieCartes monChangeur={setCartesVisibles}></SerieCartes> <br/>
      Cartes par joueur : <input
            type="number"
            onChange={(e) => setNombreCartesParJProv(e.target.value)}
            min={2}
            max={5}></input><button onClick={() => changerCartesParJoueur()}>Changer</button>
      <div>---{
		cartesVisibles.map((id) => <Carte key={id} idCarte={id}/>)
      	}---</div>
      	<table><tbody>
      	{  statsMains.map((mainStat, i) => 
      		<tr key={i}>
      		<td>{ mainStat.main.map((idCarte) => <Carte key={idCarte} idCarte={idCarte}></Carte>) }</td>
      		<td>  {valeurMain.mainCode[mainStat.type]} </td>
      		<td> ({mainStat.quantite}) </td>
      		<td>({ (mainStat.accumulation * 100 / total).toFixed(2) }%) </td>
      		</tr>
      	)}
      	</tbody></table>
    </div>
    
    
    
  );
}
