export function parserGetTypeReturn(exp) {
    let type = parserGetType(exp);
  if (type == "bool" || type=="string" || type=="int") {
    return type;
  } 
  if (type=="expression") {
    return "boolean";
  } else if (type=="calcul") {
    return "number";
  } else if (type=="comparaison") {
    return "boolean";
  } else if (type=="variable") {
    return "object|number|string|boolean";
  } else if (exp.startsWith("getPlayer(")) {
    return "object";
  } else if (exp.startsWith("len(")) {
    return "number";
  } else if (type=="valeur") {
    return "string|number|boolean";
  } else if (type=="evenement spécial") {
    return "boolean";
  } else if (exp == "allPlayersHasPlayed/endOfTour") {
    return "boolean"
  } else {
    return "str";
  }
}
export function parserGetTypeTextual(exp) {
    let type = parserGetType(exp);
   if (type == "bool" || type=="string" || type=="int") {
    return type;
  } 
  if (type=="expression") {
    return "Expression : exp( A "+parserGetPartsOfExpression(exp)[1]+" B )";
  } else if (type=="calcul") {
    return "Calcul : calc( A + B )";
  } else if (type=="comparaison") {
    return "Comparaison : comp( A "+parserGetPartsOfComparaison(exp)[1]+" B )";
  } else if (type=="variable") {
    return "Variable : {Objet#Attribut}";
  } else if (exp.startsWith("getPlayer(")) {
    return "Fonction : getPlayer(Argument)";
  } else if (exp.startsWith("len(")) {
    return "Fonction : len(Argument)";
  } else if (type=="valeur") {
    return "Valeur : <<...>>";
  } else if (type=="evenement spécial") {
    return "Evenement spécial : " + exp;
  } else if (exp == "allPlayersHasPlayed/endOfTour") {
    return "Evenement spécial : " + exp;
  } else {
    return "str";
  }
}
export function parserGetType(exp) {
  const specialEvents = ["onChangeTour", "startOfGame", "eachStartOfManche"];
  if (exp === "true" || exp === "false" || typeof exp === "boolean") {
    return "bool";
  }
  // on le met avant la comparaison avec le string pour pas qu'il soit ignoré
  if (!isNaN(parseInt(exp))) {
    return "int";
  }
  if (typeof exp !== "string") {
    return exp;
  }
  if (exp.startsWith("exp(")) {
    return "expression";
  } else if (exp.startsWith("calc(")) {
    return "calcul";
  } else if (exp.startsWith("comp(")) {
    return "comparaison";
  } else if (exp.startsWith("{")) {
    return "variable";
  } else if (exp.startsWith("getPlayer(")) {
    return "fonction";
  } else if (exp.startsWith("len(")) {
    return "fonction";
  } else if (exp.startsWith("<<")) {
    return "valeur";
  } else if (specialEvents.includes(exp)) {
    return "evenement spécial";
  } else if (exp == "allPlayersHasPlayed/endOfTour") {
    return "evenement spécial";
  } else {
    return "str";
  }
}

export function parserGetPartsOfExpression(exp) {
  const str = exp.substring(4, exp.length - 1);

  let depth = 0;
  let parts = [];
  let current = "";

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    const next = str[i + 1];

    if (c === "(") depth++;
    if (c === ")") depth--;
    if (
      depth === 0 &&
      ((c === "|" && next === "|") || (c === "&" && next === "&"))
    ) {
      parts.push(current.trim());
      current = "";
      if (c === "|" && next === "|") {
        parts.push("||");
      } else if (c === "&" && next === "&") {
        parts.push("&&");
      }
      i++;
      continue;
    }
    current += c;
  }

  // right side of
  if (current) {
    parts.push(current.trim());
  }
  if (parts.length === 1) return parts[0];

  return parts;
}

export function parserGetPartsOfComparaison(exp) {
  const str = exp.substring(5, exp.length - 1);

  let depth = 0;
  let parts = [];
  let current = "";

  for (let i = 0; i < str.length; i++) {
    const c = str[i]; 
    if (c === "(") depth++;
    if (c === ")") depth--;
    if (depth == 0 && c == ";") {
      parts.push(current.trim());
      current = ""; 
      continue;
    }
    current += c;
  }

  // right side of
  if (current) {
    parts.push(current.trim());
  } 

  return parts;
}

export function parserGetPartsOfVariable(exp) {
  const str = exp.substring(1, exp.length - 1);

  let depth = 0;
  let parts = [];
  let current = "";

  for (let i = 0; i < str.length; i++) {
    const c = str[i]; 
    if (c === "(") depth++;
    if (c === ")") depth--;
    if (depth == 0 && c == "#") {
      parts.push(current.trim());
      current = ""; 
      continue;
    }
    current += c;
  }

  // right side of
  if (current) {
    parts.push(current.trim());
  }
  console.log(parts);

  return parts;
}
