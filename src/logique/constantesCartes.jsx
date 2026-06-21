import * as valeurMain from "./valeurMain.jsx";

// Additionne le tableau de gauche dans le tableau de droite. Les deux sont supposés de même taille.
function addVect(pTableau1, pTableau2) {
	for (var i = 0 ; i < pTableau2.length ; i++) {
		pTableau2[i] += pTableau1[i];
	}
}

const quatreCouleurs = [valeurMain.P, valeurMain.K, valeurMain.T, valeurMain.C];
export const [P2,K2,T2,C2]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [P3,K3,T3,C3]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [P4,K4,T4,C4]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [P5,K5,T5,C5]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [P6,K6,T6,C6]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [P7,K7,T7,C7]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [P8,K8,T8,C8]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [P9,K9,T9,C9]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [Pd,Kd,Td,Cd]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [PV,KV,TV,CV]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [PD,KD,TD,CD]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [PR,KR,TR,CR]=quatreCouleurs; addVect([4,4,4,4], quatreCouleurs);
export const [PA,KA,TA,CA]=quatreCouleurs; 
