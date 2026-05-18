export function parserGetTypeReturn(exp) {
  let type = parserGetType(exp);
  if (type == "bool" || type == "string" || type == "int") {
    return type;
  }
  if (type == "expression") {
    return "boolean";
  } else if (type == "calcul") {
    return "number";
  } else if (type == "comparaison") {
    return "boolean";
  } else if (type == "variable") {
    return "object|number|string|boolean";
  } else if (exp.startsWith("getPlayer(")) {
    return "object";
  } else if (exp.startsWith("len(")) {
    return "number";
  } else if (exp.startsWith("not(")) {
    return "boolean";
  } else if (exp.startsWith("exist(")) {
    return "boolean";
  } else if (type == "valeur") {
    return "string|number|boolean";
  } else if (type == "evenement spécial") {
    return "boolean";
  } else if (exp == "allPlayersHasPlayed/endOfTour") {
    return "boolean";
  } else {
    return "str";
  }
}
export function parserGetColor(type) { 
  if (type == "bool" || type == "string" || type == "int") {
    return type;
  }
  if (type == "expression") {
    return "hsla(260, 50%, 60%, 1)";
  } else if (type == "calcul") {
    return "magenta";
  } else if (type == "comparaison") {
    return "violet";
  } else if (type == "variable") {
    return "rgb(168 113 4)"; 
  } else if (type == "function") {
    return "hsla(200, 70%, 45%, 1)";
 
  } else if (type == "valeur") {
    return "hsla(170, 70%, 45%, 1)";
  } else if (type == "evenement spécial") {
    return "grey";
  } else if (type == "boolean") {
    return "#f6f6f6";
  } else {
    return "hsla(130, 70%, 45%, 1)";
  }
}
export function parserGetTypeTextual(exp) {
  let type = parserGetType(exp);
  if (type == "bool" || type == "string" || type == "int") {
    return type;
  }
  if (type == "expression") {
    return "Expression : exp( A " + parserGetPartsOfExpression(exp)[1] + " B )";
  } else if (type == "calcul") {
    return "Calcul : calc( A + B )";
  } else if (type == "comparaison") {
    return (
      "Comparaison : comp( A " + parserGetPartsOfComparaison(exp)[1] + " B )"
    );
  } else if (type == "variable") {
    return "Variable : {Objet#Attribut}";
  } else if (exp.startsWith("getPlayer(")) {
    return "Fonction : getPlayer(Argument)";
  } else if (exp.startsWith("len(")) {
    return "Fonction : len(Argument)";
  } else if (exp.startsWith("not(")) {
    return "Fonction : not(Argument)";
  } else if (exp.startsWith("exist(")) {
    return "Fonction : exist(Argument)";
  } else if (type == "valeur") {
    return "Valeur : <<...>>";
  } else if (type == "evenement spécial") {
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
  } else if (
    exp.startsWith("getPlayer(") ||
    exp.startsWith("len(") ||
    exp.startsWith("not(") ||
    exp.startsWith("exist(")
  ) {
    return "function";
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

export function parserGetPartsOfFunction(exp) {
  return exp.substring(exp.indexOf("(") + 1, exp.length - 1);
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

export function verifyExpressionSyntax(str) {
  let expression = "";
  let isInVariable = false;
  let depth = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (c === "{") {
      depth++;
      isInVariable = true;
      continue;
    }
    if (c === "(") {
      depth++;
      continue;
    }
    // si on est a la fin d'une variable on va verifier le contenu
    if (c === "}") {
      depth--;
      // contenu =  aaa#bbb#ccc
      // si contenu = a#   ou #b  on aura ["a",""] ou ["","b"] et c'est pas bon
      if (expression.includes("#")) {
        const parts = expression.split("#");
        if (parts.length < 2 || parts.some((p) => p.trim() === "")) {
          return false;
        }
      }
      isInVariable = false;
      continue;
    }
    if (c === ")") {
      depth--;
      continue;
    }
    if (isInVariable) {
      expression += c;
    }
  }
  if (depth !== 0) {
    return false;
  }

  return true;
}
