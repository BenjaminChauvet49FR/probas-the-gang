import * as valeurMain from "./logique/valeurMain.jsx"

export function Carte({idCarte}) {
	const valeur = valeurMain.idVersNumero(idCarte);
	const couleur = valeurMain.idVersCouleur(idCarte);
	const className = "carte couleur"+couleur;
	return <span className={className}>{valeurMain.valeurCode(valeur)}			{valeurMain.couleurCode(couleur)}</span>
}
