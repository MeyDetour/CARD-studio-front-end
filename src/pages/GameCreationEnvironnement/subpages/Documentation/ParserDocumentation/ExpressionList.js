export const expressionList = [
  // MATHÉMATIQUES
  {
    nameKey: "addition",
    categories: ["mathematics"],
    descriptionKey: "additionDescription",
    syntax: "cacl(a+b)",
    inputs: [
      {
        name: "a",
        type: "number | string | expressionOfExpressionList",
        description: "Premier opérande",
        required: true,
      },
      {
        name: "b",
        type: "number | string | expressionOfExpressionList",
        description: "Deuxième opérande",
        required: true,
      },
    ],
    returns: {
      type: "number",
      description: "Résultat de l'addition ou concaténation",
    },
    examples: [
      { code: "5 + 3", description: "Addition simple", result: "8" },
      {
        code: "pointsVictoire + 10",
        description: "Ajout de points",
        result: "pointsVictoire + 10",
      },
      {
        code: '"Bonjour " + "monde"',
        description: "Concaténation de texte",
        result: '"Bonjour monde"',
      },
    ],
  },
  {
    nameKey: "soustraction",
    categories: ["mathematics"],
    descriptionKey: "soustractionDescription",
    syntax: "calc(a-b)",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Nombre de départ",
        required: true,
      },
      {
        name: "b",
        type: "number",
        description: "Nombre à soustraire",
        required: true,
      },
    ],
    returns: { type: "number", description: "Résultat de la soustraction" },
    examples: [
      { code: "10 - 3", description: "Soustraction simple", result: "7" },
      {
        code: "vieJoueur - degats",
        description: "Réduction de points de vie",
        result: "vieJoueur - degats",
      },
    ],
  },
  {
    nameKey: "multiplication",
    categories: ["mathematics"],
    descriptionKey: "multiplicationDescription",
    syntax: "calc(a*b)",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Premier facteur",
        required: true,
      },
      {
        name: "b",
        type: "number",
        description: "Deuxième facteur",
        required: true,
      },
    ],
    returns: { type: "number", description: "Produit de la multiplication" },
    examples: [
      { code: "5 * 3", description: "Multiplication simple", result: "15" },
      {
        code: "attaqueCarte * 2",
        description: "Doubler l'attaque",
        result: "attaqueCarte * 2",
      },
    ],
  },
  {
    nameKey: "division",
    categories: ["mathematics"],
    descriptionKey: "divisionDescription",
    syntax: "calc(a/b)",
    inputs: [
      { name: "a", type: "number", description: "Dividende", required: true },
      {
        name: "b",
        type: "number",
        description: "Diviseur (ne peut pas être 0)",
        required: true,
      },
    ],
    returns: { type: "number", description: "Quotient de la division" },
    examples: [
      { code: "10 / 2", description: "Division simple", result: "5" },
      {
        code: "pointsTotal / nombreJoueurs",
        description: "Calcul de moyenne",
        result: "pointsTotal / nombreJoueurs",
      },
    ],
    notes: ["Attention: Division par zéro provoquera une erreur"],
  },
  {
    nameKey: "modulo",
    categories: ["mathematics"],
    descriptionKey: "moduloDescription",
    syntax: "calc(a%b)",
    inputs: [
      { name: "a", type: "number", description: "Dividende", required: true },
      { name: "b", type: "number", description: "Diviseur", required: true },
    ],
    returns: { type: "number", description: "Reste de la division" },
    examples: [
      { code: "10 % 3", description: "Modulo simple", result: "1" },
      {
        code: "tour % 2 == 0",
        description: "Vérifier si tour est pair",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "minimum",
    categories: ["mathematics"],
    descriptionKey: "minimumDescription",
    syntax: "min(a, b, ...)",
    inputs: [
      {
        name: "a, b, ...",
        type: "number",
        description: "Nombres à comparer",
        required: true,
      },
    ],
    returns: { type: "number", description: "Plus petite valeur" },
    examples: [
      {
        code: "min(5, 3, 8)",
        description: "Minimum de trois nombres",
        result: "3",
      },
      {
        code: "min(vieJoueur, vieMax)",
        description: "Plafonner la vie",
        result: "min(vieJoueur, vieMax)",
      },
    ],
  },
  {
    nameKey: "maximum",
    categories: ["mathematics"],
    descriptionKey: "maximumDescription",
    syntax: "max(a, b, ...)",
    inputs: [
      {
        name: "a, b, ...",
        type: "number",
        description: "Nombres à comparer",
        required: true,
      },
    ],
    returns: { type: "number", description: "Plus grande valeur" },
    examples: [
      {
        code: "max(5, 3, 8)",
        description: "Maximum de trois nombres",
        result: "8",
      },
      {
        code: "max(degats, 0)",
        description: "Éviter les dégâts négatifs",
        result: "max(degats, 0)",
      },
    ],
  },
  {
    nameKey: "arrondir",
    categories: ["mathematics"],
    descriptionKey: "arrondirDescription",
    syntax: "round(a)",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Nombre à arrondir",
        required: true,
      },
    ],
    returns: { type: "number", description: "Nombre arrondi" },
    examples: [
      { code: "round(3.7)", description: "Arrondir 3.7", result: "4" },
      {
        code: "round(attaque * multiplicateur)",
        description: "Arrondir calcul d'attaque",
        result: "round(attaque * multiplicateur)",
      },
    ],
  },
  {
    nameKey: "arrondirInferieur",
    categories: ["mathematics"],
    descriptionKey: "arrondirInferieurDescription",
    syntax: "floor(a)",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Nombre à arrondir",
        required: true,
      },
    ],
    returns: { type: "number", description: "Entier inférieur" },
    examples: [
      {
        code: "floor(3.9)",
        description: "Arrondir 3.9 vers le bas",
        result: "3",
      },
    ],
  },
  {
    nameKey: "arrondirSuperieur",
    categories: ["mathematics"],
    descriptionKey: "arrondirSuperieurDescription",
    syntax: "ceil(a)",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Nombre à arrondir",
        required: true,
      },
    ],
    returns: { type: "number", description: "Entier supérieur" },
    examples: [
      {
        code: "ceil(3.1)",
        description: "Arrondir 3.1 vers le haut",
        result: "4",
      },
    ],
  },

  // COMPARAISON
  {
    nameKey: "egalA",
    categories: ["comparaison"],
    descriptionKey: "egalADescription",
    syntax: "a == b",
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
      {
        code: "vieJoueur == 0",
        description: "Vérifier si le joueur est mort",
        result: "true/false",
      },
      {
        code: "typeCarte == 'Attaque'",
        description: "Vérifier le type de carte",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "differentDe",
    categories: ["comparaison"],
    descriptionKey: "differentDeDescription",
    syntax: "a != b",
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
      {
        code: "joueurActif != null",
        description: "Vérifier qu'il y a un joueur actif",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "superieurA",
    categories: ["comparaison"],
    descriptionKey: "superieurADescription",
    syntax: "a > b",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "number",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a > b, false sinon" },
    examples: [
      {
        code: "pointsVictoire > 100",
        description: "Vérifier condition de victoire",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "inferieurA",
    categories: ["comparaison"],
    descriptionKey: "inferieurADescription",
    syntax: "a < b",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "number",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a < b, false sinon" },
    examples: [
      {
        code: "vieJoueur < 10",
        description: "Vérifier vie basse",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "superieurOuEgal",
    categories: ["comparaison"],
    descriptionKey: "superieurOuEgalDescription",
    syntax: "a >= b",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "number",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a ≥ b, false sinon" },
    examples: [
      {
        code: "niveau >= 5",
        description: "Vérifier niveau minimum",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "inferieurOuEgal",
    categories: ["comparaison"],
    descriptionKey: "inferieurOuEgalDescription",
    syntax: "a <= b",
    inputs: [
      {
        name: "a",
        type: "number",
        description: "Première valeur",
        required: true,
      },
      {
        name: "b",
        type: "number",
        description: "Deuxième valeur",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si a ≤ b, false sinon" },
    examples: [
      {
        code: "nombreCartes <= 10",
        description: "Vérifier limite de cartes",
        result: "true/false",
      },
    ],
  },

  // LOGIQUE
  {
    nameKey: "etLogique",
    categories: ["logic"],
    descriptionKey: "etLogiqueDescription",
    syntax: "a && b",
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
      {
        code: "vieJoueur > 0 && cartesMain > 0",
        description: "Vérifier que le joueur peut jouer",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "ouLogique",
    categories: ["logic"],
    descriptionKey: "ouLogiqueDescription",
    syntax: "a || b",
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
      {
        code: "estAdmin || estModerator",
        description: "Vérifier permissions",
        result: "true/false",
      },
    ],
  },
  {
    nameKey: "nonLogique",
    categories: ["logic"],
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
      {
        code: "!estActif",
        description: "Vérifier si non actif",
        result: "true/false",
      },
    ],
  },

  // TEXTE
  {
    nameKey: "longueurTexte",
    categories: ["value"],
    descriptionKey: "longueurTexteDescription",
    syntax: "length(texte)",
    inputs: [
      {
        name: "texte",
        type: "string",
        description: "Texte à mesurer",
        required: true,
      },
    ],
    returns: { type: "number", description: "Nombre de caractères" },
    examples: [
      {
        code: 'length("Bonjour")',
        description: "Longueur d'un texte",
        result: "7",
      },
      {
        code: "length(nomJoueur)",
        description: "Longueur du nom du joueur",
        result: "length(nomJoueur)",
      },
    ],
  },
  {
    nameKey: "majuscules",
    categories: ["value"],
    descriptionKey: "majusculesDescription",
    syntax: "upper(texte)",
    inputs: [
      {
        name: "texte",
        type: "string",
        description: "Texte à convertir",
        required: true,
      },
    ],
    returns: { type: "string", description: "Texte en majuscules" },
    examples: [
      {
        code: 'upper("bonjour")',
        description: "Mettre en majuscules",
        result: '"BONJOUR"',
      },
    ],
  },
  {
    nameKey: "minuscules",
    categories: ["value"],
    descriptionKey: "minusculesDescription",
    syntax: "lower(texte)",
    inputs: [
      {
        name: "texte",
        type: "string",
        description: "Texte à convertir",
        required: true,
      },
    ],
    returns: { type: "string", description: "Texte en minuscules" },
    examples: [
      {
        code: 'lower("BONJOUR")',
        description: "Mettre en minuscules",
        result: '"bonjour"',
      },
    ],
  },
  {
    nameKey: "sousChaine",
    categories: ["value"],
    descriptionKey: "sousChaineDescription",
    syntax: "substring(texte, debut, fin)",
    inputs: [
      {
        name: "texte",
        type: "string",
        description: "Texte source",
        required: true,
      },
      {
        name: "debut",
        type: "number",
        description: "Index de début (0-based)",
        required: true,
      },
      {
        name: "fin",
        type: "number",
        description: "Index de fin (exclusif)",
        required: false,
      },
    ],
    returns: { type: "string", description: "Portion de texte extraite" },
    examples: [
      {
        code: 'substring("Bonjour", 0, 3)',
        description: "Extraire les 3 premiers caractères",
        result: '"Bon"',
      },
    ],
  },
  {
    nameKey: "contient",
    categories: ["value"],
    descriptionKey: "contientDescription",
    syntax: "contains(texte, recherche)",
    inputs: [
      {
        name: "texte",
        type: "string",
        description: "Texte dans lequel chercher",
        required: true,
      },
      {
        name: "recherche",
        type: "string",
        description: "Texte à rechercher",
        required: true,
      },
    ],
    returns: { type: "boolean", description: "true si trouvé, false sinon" },
    examples: [
      {
        code: 'contains("Bonjour monde", "monde")',
        description: "Rechercher un mot",
        result: "true",
      },
    ],
  },

  // LISTES
  {
    nameKey: "tailleListe",
    categories: ["list"],
    descriptionKey: "tailleListeDescription",
    syntax: "size(liste)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste à compter",
        required: true,
      },
    ],
    returns: { type: "number", description: "Nombre d'éléments" },
    examples: [
      {
        code: "size(cartesMain)",
        description: "Nombre de cartes en main",
        result: "5",
      },
      { code: "size(joueurs)", description: "Nombre de joueurs", result: "4" },
    ],
  },
  {
    nameKey: "premierElement",
    categories: ["list"],
    descriptionKey: "premierElementDescription",
    syntax: "first(liste)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste source",
        required: true,
      },
    ],
    returns: { type: "any", description: "Premier élément" },
    examples: [
      {
        code: "first(cartesDefausse)",
        description: "Carte du dessus de la défausse",
        result: "Carte",
      },
    ],
  },
  {
    nameKey: "dernierElement",
    categories: ["list"],
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
    categories: ["list"],
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
      {
        code: "get(joueurs, 0)",
        description: "Premier joueur",
        result: "Joueur",
      },
    ],
  },
  {
    nameKey: "ajouterAListe",
    categories: ["list"],
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
    examples: [
      {
        code: "push(cartesMain, nouvelleCarte)",
        description: "Ajouter carte en main",
        result: "[...cartesMain, nouvelleCarte]",
      },
    ],
  },
  {
    nameKey: "retirerDeListe",
    categories: ["list"],
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
    examples: [
      {
        code: "pop(cartesDefausse)",
        description: "Retirer la dernière carte de la défausse",
        result: "Carte",
      },
    ],
  },
  {
    nameKey: "filtrerListe",
    categories: ["list"],
    descriptionKey: "filtrerListeDescription",
    syntax: "filter(liste, condition)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste à filtrer",
        required: true,
      },
      {
        name: "condition",
        type: "expression",
        description: "Condition de filtrage",
        required: true,
      },
    ],
    returns: { type: "array", description: "Liste filtrée" },
    examples: [
      {
        code: "filter(cartes, type == 'Attaque')",
        description: "Garder seulement les cartes d'attaque",
        result: "[cartes d'attaque]",
      },
    ],
  },
  {
    nameKey: "melangerListe",
    categories: ["list"],
    descriptionKey: "melangerListeDescription",
    syntax: "shuffle(liste)",
    inputs: [
      {
        name: "liste",
        type: "array",
        description: "Liste à mélanger",
        required: true,
      },
    ],
    returns: { type: "array", description: "Liste mélangée" },
    examples: [
      {
        code: "shuffle(pioche)",
        description: "Mélanger la pioche",
        result: "[cartes mélangées]",
      },
    ],
  },
  {
    nameKey: "sommeListe",
    categories: ["list"],
    descriptionKey: "sommeListeDescription",
    syntax: "sum(liste)",
    inputs: [
      {
        name: "liste",
        type: "number[]",
        description: "Liste de nombres",
        required: true,
      },
    ],
    returns: { type: "number", description: "Somme totale" },
    examples: [
      {
        code: "sum([1, 2, 3, 4])",
        description: "Somme de nombres",
        result: "10",
      },
      {
        code: "sum(pointsJoueurs)",
        description: "Total des points",
        result: "sum(pointsJoueurs)",
      },
    ],
  },

  // JEU DE CARTES
  {
    nameKey: "piocherCarte",
    categories: ["cards"],
    descriptionKey: "piocherCarteDescription",
    syntax: "draw(pioche, destination)",
    inputs: [
      {
        name: "pioche",
        type: "cardList",
        description: "Liste de cartes source",
        required: true,
      },
      {
        name: "destination",
        type: "cardList",
        description: "Liste de cartes cible",
        required: true,
      },
    ],
    returns: { type: "Card", description: "Carte piochée" },
    examples: [
      {
        code: "draw(pioche, mainJoueur)",
        description: "Piocher dans la main",
        result: "Carte",
      },
    ],
  },
  {
    nameKey: "defausserCarte",
    categories: ["cards"],
    descriptionKey: "defausserCarteDescription",
    syntax: "discard(carte, defausse)",
    inputs: [
      {
        name: "carte",
        type: "Card",
        description: "Carte à défausser",
        required: true,
      },
      {
        name: "defausse",
        type: "cardList",
        description: "Pile de défausse",
        required: true,
      },
    ],
    returns: { type: "void", description: "Aucun retour" },
    examples: [
      {
        code: "discard(carteJouee, defausse)",
        description: "Défausser une carte jouée",
        result: "void",
      },
    ],
  },
  {
    nameKey: "jouerCarte",
    categories: ["cards"],
    descriptionKey: "jouerCarteDescription",
    syntax: "playCard(carte, joueur)",
    inputs: [
      {
        name: "carte",
        type: "Card",
        description: "Carte à jouer",
        required: true,
      },
      {
        name: "joueur",
        type: "Player",
        description: "Joueur qui joue",
        required: true,
      },
    ],
    returns: { type: "void", description: "Aucun retour" },
    examples: [
      {
        code: "playCard(carteSelectionnee, joueurActif)",
        description: "Jouer une carte",
        result: "void",
      },
    ],
  },
  {
    nameKey: "chercherCarte",
    categories: ["cards"],
    descriptionKey: "chercherCarteDescription",
    syntax: "findCard(liste, condition)",
    inputs: [
      {
        name: "liste",
        type: "cardList",
        description: "Liste de cartes",
        required: true,
      },
      {
        name: "condition",
        type: "expression",
        description: "Condition de recherche",
        required: true,
      },
    ],
    returns: { type: "Card | null", description: "Carte trouvée ou null" },
    examples: [
      {
        code: "findCard(pioche, nom == 'Dragon')",
        description: "Chercher une carte Dragon",
        result: "Card | null",
      },
    ],
  },

  // JOUEURS
  {
    nameKey: "joueurActif",
    categories: ["players"],
    descriptionKey: "joueurActifDescription",
    syntax: "currentPlayer()",
    inputs: [],
    returns: { type: "Player", description: "Joueur actif" },
    examples: [
      {
        code: "currentPlayer()",
        description: "Obtenir le joueur actif",
        result: "Player",
      },
    ],
  },
  {
    nameKey: "joueurSuivant",
    categories: ["players"],
    descriptionKey: "joueurSuivantDescription",
    syntax: "nextPlayer()",
    inputs: [],
    returns: { type: "Player", description: "Joueur suivant" },
    examples: [
      {
        code: "nextPlayer()",
        description: "Obtenir le joueur suivant",
        result: "Player",
      },
    ],
  },
  {
    nameKey: "nombreDeJoueurs",
    categories: ["players"],
    descriptionKey: "nombreDeJoueursDescription",
    syntax: "playerCount()",
    inputs: [],
    returns: { type: "number", description: "Nombre de joueurs" },
    examples: [
      {
        code: "playerCount()",
        description: "Compter les joueurs",
        result: "4",
      },
    ],
  },
  {
    nameKey: "gagnerPoints",
    categories: ["players"],
    descriptionKey: "gagnerPointsDescription",
    syntax: "addPoints(joueur, points)",
    inputs: [
      {
        name: "joueur",
        type: "Player",
        description: "Joueur cible",
        required: true,
      },
      {
        name: "points",
        type: "number",
        description: "Points à ajouter",
        required: true,
      },
    ],
    returns: { type: "void", description: "Aucun retour" },
    examples: [
      {
        code: "addPoints(currentPlayer(), 10)",
        description: "Ajouter 10 points au joueur actif",
        result: "void",
      },
    ],
  },

  // ALÉATOIRE
  {
    nameKey: "nombreAleatoire",
    categories: ["random"],
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
    examples: [
      {
        code: "random(1, 6)",
        description: "Lancer un dé à 6 faces",
        result: "1-6",
      },
      {
        code: "random(1, 100)",
        description: "Pourcentage aléatoire",
        result: "1-100",
      },
    ],
  },
  {
    nameKey: "choixAleatoire",
    categories: ["random"],
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
    examples: [
      {
        code: "randomChoice(cartesPossibles)",
        description: "Choisir une carte au hasard",
        result: "Card",
      },
    ],
  },

  // CONDITIONS
  {
    nameKey: "siAlorsSinon",
    categories: ["conditions"],
    descriptionKey: "siAlorsSinonDescription",
    syntax: "if(condition, valeurSiVrai, valeurSiFaux)",
    inputs: [
      {
        name: "condition",
        type: "boolean",
        description: "Condition à évaluer",
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
    examples: [
      {
        code: "if(vieJoueur > 0, 'Vivant', 'Mort')",
        description: "Statut du joueur",
        result: "'Vivant' ou 'Mort'",
      },
      {
        code: "if(tour % 2 == 0, 'Pair', 'Impair')",
        description: "Tour pair ou impair",
        result: "'Pair' ou 'Impair'",
      },
    ],
  },
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
