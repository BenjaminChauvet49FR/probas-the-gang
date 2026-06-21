import * as exploitationValeurMains from "../logique/exploitationValeurMains.jsx";
import {Carte} from '../Card.jsx';
import * as C from "../logique/constantesCartes.jsx";
import * as valeurMain from "../logique/valeurMain.jsx";

export default function TousCombos() {
  const rangeID = Array.from({ length: 52 }, (_, i) => i); // Credits : https://polvara.me/posts/create-an-array-containing-1-to-N-in-JS/
  const cartesVisibles = [C.C4, C.C8, C.C7, C.T4, C.KA];
  const statsMains = exploitationValeurMains.mainsPossiblesClassees(cartesVisibles, 3);
  const total = statsMains[statsMains.length-1].accumulation;
  const listeChaines = [];
  
  return (
    <div className="App">
      <div>---{
		cartesVisibles.map((id) => <Carte key={id} idCarte={id}/>)
      	}---</div>
      	<table>
      	{  statsMains.map((mainStat, i) => 
      		<tr key={i}> 
      		<td>{ mainStat.main.map((idCarte) => <Carte key={idCarte} idCarte={idCarte}></Carte>) }</td><td>  {valeurMain.mainCode[mainStat.type]} </td><td> ({mainStat.quantite}) </td> <td>({ (mainStat.accumulation * 100 / total).toFixed(2) }%) </td>
      		
      	</tr>
      	)}
      	</table>
    </div>
    
    
    
  );
}
