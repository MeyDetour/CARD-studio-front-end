export const expressionList = [
  // MATHÉMATIQUES
  {
    nameKey: "addition",
    categories: ["Mathematics"],
    descriptionKey: "additionDescription",
    syntax: "calc(a+b)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Premier opérande",
        required: true,
      },
      {
        name: "b",
        type: "number | string",
        description: "Deuxième opérande",
        required: true,
      },
    ],
    returns: {
      type: "number | string",
      description: "Résultat de l'addition",
    },
    examples: ["calc(5+3)", "calc(x+y)", 'calc(10+"abc")'],
    returnExample: "8",
  },
  {
    nameKey: "soustraction",
    categories: ["Mathematics"],
    descriptionKey: "soustractionDescription",
    syntax: "calc(a-b)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Nombre de départ",
        required: true,
      },
      {
        name: "b",
        type: "number | string",
        description: "Nombre à soustraire",
        required: true,
      },
    ],
    returns: {
      type: "number | string",
      description: "Résultat de la soustraction",
    },
    examples: ["calc(10-3)", "calc(x-y)", 'calc("abc"-1)', 'calc(5-"a")'],
    returnExample: "7",
  },
  {
    nameKey: "multiplication",
    categories: ["Mathematics"],
    descriptionKey: "multiplicationDescription",
    syntax: "calc(a*b)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Premier facteur",
        required: true,
      },
      {
        name: "b",
        type: "number | string",
        description: "Deuxième facteur",
        required: true,
      },
    ],
    returns: {
      type: "number | string",
      description: "Produit de la multiplication",
    },
    examples: ["calc(5*3)", "calc(x*y)", 'calc(2*"abc")'],
    returnExample: "15",
  },
  {
    nameKey: "division",
    categories: ["Mathematics"],
    descriptionKey: "divisionDescription",
    syntax: "calc(a/b)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Dividende",
        required: true,
      },
      {
        name: "b",
        type: "number | string",
        description: "Diviseur (ne peut pas être 0)",
        required: true,
      },
    ],
    returns: {
      type: "number | string",
      description: "Quotient de la division",
    },
    examples: ["calc(10/2)", "calc(x/y)", 'calc("abc"/2)', 'calc(5/"a")'],
    returnExample: "5",
    notes: ["becareful:divisionByZero"],
  },
  {
    nameKey: "modulo",
    categories: ["Mathematics"],
    descriptionKey: "moduloDescription",
    syntax: "calc(a%b)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Dividende",
        required: true,
      },
      {
        name: "b",
        type: "number | string",
        description: "Diviseur",
        required: true,
      },
    ],
    returns: { type: "number | string", description: "Reste de la division" },
    examples: ["calc(10%3)", "calc(x%y)", 'calc(5%"a")'],
    returnExample: "1",
  },
  {
    nameKey: "minimum",
    categories: ["Mathematics"],
    descriptionKey: "minimumDescription",
    syntax: "min(a,b,...)",
    inputs: [
      {
        name: "a, b, ...",
        type: "number | string",
        description: "Nombres à comparer",
        required: true,
      },
    ],
    returns: { type: "number | string", description: "Plus petite valeur" },
    examples: ["min(5,3,8)", "min(x,y,z)"],
    returnExample: "3",
  },
  {
    nameKey: "maximum",
    categories: ["Mathematics"],
    descriptionKey: "maximumDescription",
    syntax: "max(a,b,...)",
    inputs: [
      {
        name: "a, b, ...",
        type: "number | string",
        description: "Nombres à comparer",
        required: true,
      },
    ],
    returns: { type: "number | string", description: "Plus grande valeur" },
    examples: ["max(5,3,8)", "max(x,y,z)"],
    returnExample: "8",
  },
  {
    nameKey: "arrondir",
    categories: ["Mathematics"],
    descriptionKey: "arrondirDescription",
    syntax: "round(a)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Nombre à arrondir",
        required: true,
      },
    ],
    returns: { type: "number | string", description: "Nombre arrondi" },
    examples: ["round(3.7)", "round(x)", 'round("12.5")'],
    returnExample: "4",
  },
  {
    nameKey: "arrondirInferieur",
    categories: ["Mathematics"],
    descriptionKey: "arrondirInferieurDescription",
    syntax: "floor(a)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Nombre à arrondir",
        required: true,
      },
    ],
    returns: { type: "number | string", description: "Entier inférieur" },
    examples: ["floor(3.9)", "floor(x)", 'floor("12.5")'],
    returnExample: "3",
  },
  {
    nameKey: "arrondirSuperieur",
    categories: ["Mathematics"],
    descriptionKey: "arrondirSuperieurDescription",
    syntax: "ceil(a)",
    inputs: [
      {
        name: "a",
        type: "number | string",
        description: "Nombre à arrondir",
        required: true,
      },
    ],
    returns: { type: "number | string", description: "Entier supérieur" },
    examples: ["ceil(3.1)", "ceil(x)", 'ceil("12.5")'],
    returnExample: "4",
  },

  // COMPARAISON
  {
    nameKey: "egalA",
    categories: ["Comparaison", "Boolean"],
    descriptionKey: "egalADescription",
    syntax: "comp(a;isEqualNumber;b)",
    inputs: [
      {
        name: "a",
        type: "any",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "any",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si égaux, false sinon" },
    examples: [
      "comp(a;isEqualNumber;b)  ->  true/false",
      "comp(5;isEqualNumber;5)  ->  true",
      "comp(5;isEqualNumber;3)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBeSameType"],
  },
  {
    nameKey: "differentDe",
    categories: ["Comparaison", "Boolean"],
    descriptionKey: "differentDeDescription",
    syntax: "comp(a;isNotEqualNumber;b)",
    inputs: [
      {
        name: "a",
        type: "any",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "any",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: {
      type: "boolean",
      description: "true si différents, false sinon",
    },
    examples: [
      "comp(a;isNotEqualNumber;b)  ->  true/false",
      "comp(5;isNotEqualNumber;3)  ->  true",
      "comp(5;isNotEqualNumber;5)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBeSameType"],
  },
  {
    nameKey: "superieurA",
    categories: ["Comparaison", "Boolean"],
    descriptionKey: "superieurADescription",
    syntax: "comp(a;isSuperiorNumber;b)",
    inputs: [
      {
        name: "a",
        type: "any",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "any",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a > b, false sinon" },
    examples: [
      "comp(a;isSuperiorNumber;b)  ->  true/false",
      "comp(10;isSuperiorNumber;5)  ->  true",
      "comp(3;isSuperiorNumber;7)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBeSameType"],
  },
  {
    nameKey: "inferieurA",
    categories: ["Comparaison", "Boolean"],
    descriptionKey: "inferieurADescription",
    syntax: "comp(a;isInferiorNumber;b)",
    inputs: [
      {
        name: "a",
        type: "any",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "any",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a < b, false sinon" },
    examples: [
      "comp(a;isInferiorNumber;b)  ->  true/false",
      "comp(3;isInferiorNumber;7)  ->  true",
      "comp(10;isInferiorNumber;5)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBeSameType"],
  },
  {
    nameKey: "superieurOuEgal",
    categories: ["Comparaison", "Boolean"],
    descriptionKey: "superieurOuEgalDescription",
    syntax: "comp(a;isSuperiorOrEqual;b)",
    inputs: [
      {
        name: "a",
        type: "any",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "any",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a ≥ b, false sinon" },
    examples: [
      "comp(a;isSuperiorOrEqual;b)  ->  true/false",
      "comp(5;isSuperiorOrEqual;5)  ->  true",
      "comp(7;isSuperiorOrEqual;5)  ->  true",
      "comp(3;isSuperiorOrEqual;5)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBeSameType"],
  },
  {
    nameKey: "inferieurOuEgal",
    categories: ["Comparaison", "Boolean"],
    descriptionKey: "inferieurOuEgalDescription",
    syntax: "comp(a;isInferiorOrEqual;b)",
    inputs: [
      {
        name: "a",
        type: "any",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "any",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a ≤ b, false sinon" },
    examples: [
      "comp(a;isInferiorOrEqual;b)  ->  true/false",
      "comp(5;isInferiorOrEqual;5)  ->  true",
      "comp(3;isInferiorOrEqual;7)  ->  true",
      "comp(10;isInferiorOrEqual;5)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBeSameType"],
  },

  // Opérateurs supplémentaires
  {
    nameKey: "egalAString",
    categories: ["Comparaison", "Boolean"],
    descriptionKey: "egalAStringDescription",
    syntax: "comp(a;isEqualString;b)",
    inputs: [
      {
        name: "a",
        type: "string",
        description: "Première chaîne",
        required: true,
      },
      {
        name: "b",
        type: "string",
        description: "Deuxième chaîne",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si égales, false sinon" },
    examples: [
      "comp(a;isEqualString;b)  ->  true/false",
      "comp('abc';isEqualString;'abc')  ->  true",
      "comp('abc';isEqualString;'def')  ->  false",
    ],
    notes: ["becareful:twoVariableMustBeString"],
  },
  {
    nameKey: "differentPlayer",
    categories: ["Players", "Boolean", "Comparaison"],
    descriptionKey: "differentPlayerDescription",
    syntax: "comp(a;differentPlayer;b)",
    inputs: [
      {
        name: "a",
        type: "Player",
        description: "Premier joueur",
        required: true,
      },
      {
        name: "b",
        type: "Player",
        description: "Deuxième joueur",
        required: true,
      },
    ],
    returns: {
      type: "boolean",
      description: "true si différents, false sinon",
    },
    examples: [
      "comp(a;differentPlayer;b)  ->  true/false",
      "comp(joueur1;differentPlayer;joueur2)  ->  true",
      "comp(joueur1;differentPlayer;joueur1)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBePlayer"],
  },
  {
    nameKey: "samePlayer",
    categories: ["Players", "Boolean", "Comparaison"],
    descriptionKey: "samePlayerDescription",
    syntax: "comp(a;samePlayer;b)",
    inputs: [
      {
        name: "a",
        type: "Player",
        description: "Premier joueur",
        required: true,
      },
      {
        name: "b",
        type: "Player",
        description: "Deuxième joueur",
        required: true,
      },
    ],
    returns: {
      type: "boolean",
      description: "true si identiques, false sinon",
    },
    examples: [
      "comp(a;samePlayer;b)  ->  true/false",
      "comp(joueur1;samePlayer;joueur1)  ->  true",
      "comp(joueur1;samePlayer;joueur2)  ->  false",
    ],
    notes: ["becareful:twoVariableMustBePlayer"],
  },
  {
    nameKey: "notContain",
    categories: ["List", "Boolean", "Comparaison"],
    descriptionKey: "notContainDescription",
    syntax: "comp(liste;notContain;element)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste à vérifier",
        required: true,
      },
      {
        name: "element",
        type: "any",
        description: "Élément à rechercher",
        required: true,
      },
    ],
    returns: {
      type: "boolean",
      description: "true si non contenu, false sinon",
    },
    examples: [
      "comp(liste;notContain;element)  ->  true/false",
      "comp([1,2,3];notContain;4)  ->  true",
      "comp([1,2,3];notContain;2)  ->  false",
    ],
    notes: ["becareful:arrayAndElementType"],
  },
  {
    nameKey: "contain",
    categories: ["List", "Boolean", "Comparaison"],
    descriptionKey: "containDescription",
    syntax: "comp(liste;contain;element)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste à vérifier",
        required: true,
      },
      {
        name: "element",
        type: "any",
        description: "Élément à rechercher",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si contenu, false sinon" },
    examples: [
      "comp(liste;contain;element)  ->  true/false",
      "comp([1,2,3];contain;2)  ->  true",
      "comp([1,2,3];contain;4)  ->  false",
    ],
    notes: ["becareful:arrayAndElementType"],
  },

  // LOGIQUE
  {
    nameKey: "etLogique",
    categories: ["Logic", "Boolean"],
    descriptionKey: "etLogiqueDescription",
    syntax: "exp(a&&b)",
    inputs: [
      {
        name: "a",
        type: "boolean",
        description: "Première condition",
        required: true,
      },
      {
        name: "b",
        type: "boolean",
        description: "Deuxième condition",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a ET b sont vrais" },
    examples: [
      "exp(true&&false) -> false",
      "exp(allPlayersHasPlayed/endOfTour&&true) -> true",
      "exp(allPlayersHasPlayed/endOfTour&&false) -> false",
    ],
  },
  {
    nameKey: "allPlayersHasPlayed/endOfTour",
    categories: ["Logic", "Boolean"],
    descriptionKey: "thisVariableVerifyIfAllPlayersHasPlayedOrIfItsEndOfTour",
    syntax: "allPlayersHasPlayed/endOfTour",

    returns: { type: "boolean" },
    examples: [
      "exp(true&&false) -> false",
      "exp(allPlayersHasPlayed/endOfTour&&true) -> true",
      "exp(allPlayersHasPlayed/endOfTour&&false) -> false",
    ],
  },
  {
    nameKey: "ouLogique",
    categories: ["Boolean", "Logic"],
    descriptionKey: "ouLogiqueDescription",
    syntax: "exp(a||b)",
    inputs: [
      {
        name: "a",
        type: "boolean",
        description: "Première condition",
        required: true,
      },
      {
        name: "b",
        type: "boolean",
        description: "Deuxième condition",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a OU b est vrai" },
    examples: [
      "exp(true||false) -> true",
      "exp(allPlayersHasPlayed/endOfTour||true) -> true",
      "exp(allPlayersHasPlayed/endOfTour||false) -> true",
      "exp(false||false) -> false",
    ],
  },
  {
    nameKey: "nonLogique",
    categories: ["Logic"],
    descriptionKey: "nonLogiqueDescription",
    syntax: "!a",
    inputs: [
      {
        name: "a",
        type: "boolean",
        description: "Condition à inverser",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "Opposé de a" },
    examples: [
      "!true -> false",
      "!false -> true",
      "!allPlayersHasPlayed/endOfTour -> Opposite of allPlayersHasPlayed/endOfTour",
    ],
  },

  // TEXTE
  {
    nameKey: "longueurTexte",
    categories: ["Value","Function"],
    descriptionKey: "longueurTexteDescription",
    syntax: "len(texte)",
    inputs: [
      {
        name: "texte",
        type: "string | array",
        description: "Texte à mesurer",
        required: true,
      },
    ],
    returns: { type: "number", description: "Nombre de caractères" },
    examples: ['len("Bonjour")  -> 7', 'len("")  -> 0', "len([a,b,c])  -> 3"],
  },

  {
    nameKey: "premierElement",
    categories: ["List"],
    descriptionKey: "premierElementDescription",
    syntax: "first(a)",
    inputs: [
      {
        name: "a",
        type: "array",
        description: "Liste source",
        required: true,
      },
    ],
    returns: { type: "any", description: "Premier élément" },
    examples: [
      "first({allPlayersInGame}) -> first player",
      "first([1,2,3]) -> 1",
    ],
  },
  {
    nameKey: "dernierElement",
    categories: ["List"],
    descriptionKey: "dernierElementDescription",
    syntax: "last(liste)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste source",
        required: true,
      },
    ],
    returns: { type: "any", description: "Dernier élément" },
    examples: [
      {
        code: "last(historiqueTours)",
        description: "Dernier tour joué",
        result: "Tour",
      },
    ],
  },
  {
    nameKey: "elementALindex",
    categories: ["List"],
    descriptionKey: "elementALindexDescription",
    syntax: "get(liste, index)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste source",
        required: true,
      },
      {
        name: "index",
        type: "number",
        description: "Index (commence à 0)",
        required: true,
      },
    ],
    returns: { type: "any", description: "Élément à l'index" },
    examples: [
      "get([1,2,3], 0) -> 1",
      "get([1,2,3], 1) -> 2",
      "get([1,2,3], 2) -> 3",
    ],
    notes: ["returnTypeDependOfInputType"],
  },
  {
    nameKey: "ajouterAListe",
    categories: ["List"],
    descriptionKey: "ajouterAListeDescription",
    syntax: "push(liste, element)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste cible",
        required: true,
      },
      {
        name: "element",
        type: "any",
        description: "Élément à ajouter",
        required: true,
      },
    ],
    returns: { type: "array", description: "Liste modifiée" },
    examples: ["push(array,b) -> array", "push([a,b],c) -> [a,b,c]"],
  },
  {
    nameKey: "retirerDeListe",
    categories: ["List"],
    descriptionKey: "retirerDeListeDescription",
    syntax: "pop(liste)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste à modifier",
        required: true,
      },
    ],
    returns: { type: "any", description: "Élément retiré" },
    examples: ["pop([a,b,c]) -> c"],
    notes: ["thisFunctionRemoveTheLastElementOfTheList"],
  },

  // JOUEURS
  {
    nameKey: "getPlayer",
    categories: ["Players","Function"],
    descriptionKey: "getPlayerDescription",
    syntax: "getPlayer(a)",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Position du joueur",
        required: true,
      },
    ],
    returns: { type: "Player", description: "Joueur actif" },
    examples: ["getPlayer(2) -> player"],
  },  

  // ALÉATOIRE
  {
    nameKey: "nombreAleatoire",
    categories: ["Random","Value","Function"],
    descriptionKey: "nombreAleatoireDescription",
    syntax: "random(min, max)",
    inputs: [
      {
        name: "min",
        type: "number",
        description: "Valeur minimum (incluse)",
        required: true,
      },
      {
        name: "max",
        type: "number",
        description: "Valeur maximum (incluse)",
        required: true,
      },
    ],
    returns: { type: "number", description: "Nombre aléatoire" },
    examples: [ "random(1, 6) -> ex : 4", "random(1, 6) -> ex : 2"
    ],
  },
  {
    nameKey: "choixAleatoire",
    categories: ["Random","Value","Function"],
    descriptionKey: "choixAleatoireDescription",
    syntax: "randomChoice(liste)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste d'éléments",
        required: true,
      },
    ],
    returns: { type: "any", description: "Élément choisi" },
    examples: [ "randomChoice(['pierre', 'feuille', 'ciseaux']) -> ex : 'pierre'", "randomChoice(['pierre', 'feuille', 'ciseaux']) -> ex : 'ciseaux'"
    ],
  }, {
    nameKey: "ifExist",
    categories: ["Function","Boolean"],
    descriptionKey: "returnTrueIfTheTargetExist",
    syntax: "exist(liste)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste d'éléments",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "Retourne true si l'élément existe" },
    examples: [ "exist({topDiscardDeck}) -> true", "exist(null) -> false"
    ],
  },{
    nameKey: "getOppositeBoolean",
    categories: ["Function","Boolean"],
    descriptionKey: "getOppositeBooleanDescription",
    syntax: "not(boolean)",
    inputs: [
      {
        name: "boolean",
        type: "boolean",
        description: "Valeur booléenne",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "Retourne l'opposé de la valeur booléenne" },
    examples: [ "not(true) -> false", "not(false) -> true"
    ],
  },

  // CONDITIONS
  {
    nameKey: "siAlorsSinon",
    categories: ["Conditions","Value","Function"],
    descriptionKey: "siAlorsSinonDescription",
    syntax: "if(condition, valeurSiVrai, valeurSiFaux)",
    inputs: [
      {
        name: "condition",
        type: "boolean",
        description: "Condition à éValuer",
        required: true,
      },
      {
        name: "valeurSiVrai",
        type: "any",
        description: "Retour si vrai",
        required: true,
      },
      {
        name: "valeurSiFaux",
        type: "any",
        description: "Retour si faux",
        required: true,
      },
    ],
    returns: { type: "any", description: "Valeur selon condition" },
    examples: [ "if(true, 'gagné', 'perdu') -> 'gagné'", "if(false, 'gagné', 'perdu') -> 'perdu'"
    ],
  },
  // Variables 
  {
    nameKey: "allPlayers",
    categories: ["Players","Value","Value"],
    descriptionKey: "allPlayerDescription",
    syntax: "{allPlayer}",
    inputs: [],
    returns: { type: "array", description: "Tous les joueurs" },
    examples: [ "{allPlayersInGame} -> [player1, player2, player3]" ],
  } ,
    // Variables
  {
    nameKey: "getTopCardOfDeck",
    categories: ["Cards","Value"],
    descriptionKey: "getTopCardOfDeckDescription",
    syntax: "{getTopCardOfDeck}",
    inputs: [],
    returns: { type: "card", description: "Carte du dessus de la pioche" },
    examples: [ "{getTopCardOfDeck} -> {name:'',id:'',attribute:''}" ],
  } , {
    nameKey: "getTopCardOfDiscard",
    categories: ["Cards","Value"],
    descriptionKey: "getTopCardOfDiscardDescription",
    syntax: "{getTopCardOfDiscard}",
    inputs: [],
    returns: { type: "card", description: "Carte du dessus de la défausse" },
    examples: [ "{getTopCardOfDiscard} -> {name:'',id:'',attribute:''}" ],
  } , {
    nameKey: "getDeck",
    categories: ["Cards","Value"],
    descriptionKey: "getDeckDescription",
    syntax: "{deck}",
    inputs: [],
    returns: { type: "card", description: "Cible la pioche" },
    examples: [ "{deck} -> [card1, card2, card3]" ],
  }  , {
    nameKey: "getDiscard",
    categories: ["Cards","Value"],
    descriptionKey: "getDiscardDescription",
    syntax: "{discardDeck}",
    inputs: [],
    returns: { type: "card", description: "Cible la défausse" },
    examples: [ "{discardDeck} -> [card1, card2, card3]" ],
  }  , {
    nameKey: "targetCard",
    categories: ["Cards","Value"],
    descriptionKey: "targetCardDescription",
    syntax: "{cardOfBoucle}",
    inputs: [],
    returns: { type: "card", description: "Carte ciblée" },
    examples: [ "{cardOfBoucle} -> {name:'',id:'',attribute:''}" ],
  } 
];
export const expressionListTypes = [
  { name: "all", icon: "all" },
  { name: "Mathematics", icon: "maths" },
  { name: "Boolean", icon: "boolean" },
  { name: "Logic", icon: "logic" },
  { name: "Value", icon: "value" }, 
  { name: "List", icon: "list" },
  { name: "Cards", icon: "joker" },
  { name: "Players", icon: "players" },
  { name: "Random", icon: "random" },
  { name: "Conditions", icon: "condition" },
  { name: "Comparaison", icon: "compare" },
  { name: "Function", icon: "function" },
];
