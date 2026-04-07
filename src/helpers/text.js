export function splitText(text, maxLength) {
   // tous les maxLenght le text sera coupé et un retour à la ligne sera ajouté
  if (text.length <= maxLength) {
    return text;
  }
  const regex = new RegExp(`.{1,${maxLength}}`, "g");
  return text.match(regex).join("\n");
}

export function breakText(text, maxLength) {
  // tous les maxLenght le text sera coupé et un retour à la ligne sera ajouté
  if (text.length <= maxLength) {
    return text;
  }
 
  return text.substring(0, maxLength) +".."
}

export function findTextInElt(text, elt) { 
  if (elt === undefined || elt === null || elt === "") {
    return false;
  }
  let textSTRING = JSON.stringify(text);
   return textSTRING.includes(elt)
}