import "./style.css";
import "../../assets/text.css";
import GameCreationEnvironnementHeader from "../../components/GameCreationEnvironnementHeader/GameCreationEnvironnementHeader";
import GameCreationEnvironnementNavigation from "../../components/GameCreationEnvironnementNavigation/GameCreationEnvironnementNavigation";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Dashboard from "../subpages/Dashboard/Dashboard";
import EditGame from "../subpages/EditGame/EditGame";
import { useApi } from "../../hooks/useApi";
import { useGameContext } from "../../context/GameContext";

export default function GameCreationEnvironnementqswGameCreationEnvironnement() {
  const { token } = useUserContext();
  const navigate = useNavigate();
  const { subpage, id } = useParams();
  const { result, loading, error, fetchData } = useApi();
  const [playerHasEdit, setPlayerHasEdit] = useState(false);
  const {saveNewGameInStorage} = useGameContext()
  const [gameImageUploaded,setGameImageUploaded]=useState();
  const [gameImageUploadedUrl,setGameImageUploadedUrl]=useState();
  const [game, setGame] = useState({
    id: 2,
    name: "poker", 
    description: null,
    notes: [
      {
        auteur: "Utilisateur 1",
        commentaire:
          "J'ai passé 30 minutes à chercher la Reine et le Valet... Le concept de 'cartes de 0 à 12' est une insulte à l'histoire du jeu.",
        date: "Il y a 2 heures",
      },
      {
        auteur: "Utilisateur 2",
        commentaire:
          "Je ne comprends pas. Je voulais poser un Uno et tout le monde m'a regardé bizarrement. Ce jeu est trop compliqué pour moi.",
        date: "Il y a 3 heures",
      },
      {
        auteur: "Utilisateur 3",
        commentaire:
          "Pourquoi 12 ? C'est le score maximal que je suis censé avoir ou le nombre de fois où je peux piocher ? Les règles ne sont pas claires sur l'objectif.",
        date: "Il y a 2 jours",
      },
    ],
    joueursAccueillis: 0,
    gamesEnded: 0,
    metadata: {
      type: ["Strategy", "luckk", "smart"],
      lastEdit: "01/02/2025 12:20",
      editionHistory: [
        {
          id: 1,
          evenement: "Dragon de feu",
          action: "Carte créée",
          date_relative: "Il y a 2 heures",
        },
        {
          id: 2,
          evenement: "Deck Arcane",
          action: "Jeu modifié",
          date_relative: "Il y a 5 heures",
        },
        {
          id: 3,
          evenement: "vs. Joueur123",
          action: "Partie terminée",
          date_relative: "Hier",
        },
        {
          id: 4,
          evenement: "Règles du jeu",
          action: "Mise à jour des conditions de victoire",
          date_relative: "Hier",
        },
        {
          id: 5,
          evenement: "Guerrier de Glace",
          action: "Équilibrage des statistiques",
          date_relative: "Il y a 2 jours",
        },
        {
          id: 6,
          evenement: "Deck Débutant",
          action: "Suppression de la carte 'Doublon'",
          date_relative: "Il y a 2 jours",
        },
        {
          id: 7,
          evenement: "Configuration",
          action: "Changement du temps de tour (30s)",
          date_relative: "Il y a 3 jours",
        },
        {
          id: 8,
          evenement: "vs. IA_Expert",
          action: "Partie abandonnée",
          date_relative: "Il y a 4 jours",
        },
        {
          id: 9,
          evenement: "Sortilège de Foudre",
          action: "Nouvel artwork ajouté",
          date_relative: "Il y a 5 jours",
        },
        {
          id: 10,
          evenement: "Initialisation",
          action: "Création du profil développeur",
          date_relative: "Il y a 1 semaine",
        },
      ],
    },

    globalValue: {
      smallBlind: { type: "number", value: 1 },
      allPlayersHasPlayed: { type: "boolean", value: false }, // default  calculated value
      currentBet: { type: "number", value: 0 }, // value of the highter mise
      state: { type: "string", value: "waitingPlayers" },

      deck: {
        type: "cardList",
        value: [
          1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
        ],
      },

      discardDeck: {
        type: "cardList",
        value: [5, 2, 3, 4],
      },
      groupPot: {
        type: "gainObject",
        value: {
          gain: {
            type: "gainObject",
            value: {
              1: {
                value: 0,
              },
            },
          },
        },
      },
      gain: {
        type: "gainObject",
        value: {
          1: {
            value: 0,
          },
        },
      },
      boardCard: { type: "cardList", value: [] }, // ex : [ tas1 [x,x,x,] , tas2 [x,x,]]   ex poker : [[1],[2],[3],[4],[5]]
      winners: { type: "playerList", value: [] },
    },
    globalValuesOfPlayer: {
      currentBet: {
        type: "number",
        value: 0,
      },

      attachedEventForTour: {
        type: "array",
        value: [],
      },
      gain: {
        type: "object",
        value: {
          1: {
            value: 0,
          },
        },
      },
    },
    params: {
      globalGame: {
        jeuSolo: false,
        playersCanJoin: false,
        minPlayer: 2,
        maxPlayer: 5,
      },
      rendering: {
        menu: {
          template: 1,
          backgroundImage: null,
        },
        game: {
          template: 1,
          backgroundImage: null,
        },
      },
      tours: {
        activation: true,
        sens: "incrementation", // or decrementation
        startNumber: 0,
        maxTour: 3,

        actionOnlyAtPlayerTour: true,
        // all 10min , allPlayerPlayedAtSameTime
        endOfTour: ["allPlayersHasPlayed/endOfTour"], // allPlayersHasPlayed default event 301
        actions: [
          {
            name: "miser",
            return: "currentPlayer",
            type: "askPlayer",
            appearAtPlayerTurn: true,
            condition:
              "comp({currentPlayer#gain#1};isSuperiorNumber;{currentBet})",
            withValue: [
              // Suivre la mise
              {
                id: 11,
                player: "{currentPlayer}",
              },
            ],
          },
          {
            name: "suivre",
            appearAtPlayerTurn: true,
            condition:
              "exp(comp({currentPlayer#currentBet};isNotEqualNumber;{currentBet})&&comp({currentPlayer#gain#1};isSuperiorNumber;calc({currentBet}-{currentPlayer#currentBet})))",

            return: "{currentPlayer}",
            withValue: [
              // Suivre la mise
              {
                id: 14,
                player: "{currentPlayer}",
                inputNumber: "calc({currentBet}-{currentPlayer#currentBet})",
              },
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },
            ],
          },
          {
            name: "Check",
            appearAtPlayerTurn: true,
            condition:
              "comp({currentPlayer#currentBet};isEqualNumber;{currentBet})",

            return: "currentPlayer",
            withValue: [
              // Suivre la mise
              //  Player status switch to played
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },
            ],
          },
          {
            name: "Tapis",
            appearAtPlayerTurn: true,
            condition:
              "exp(comp({currentPlayer#currentBet};isInferiorOrEqual;{currentBet})&&comp({currentPlayer#gain#1};isSuperiorNumber;0))",

            return: "currentPlayer",
            withValue: [
              // Suivre la mise
              {
                id: 14,
                type: "withValueEvent",
                player: "{currentPlayer}",
                inputNumber: "{currentPlayer#gain#1}",
              },
              {
                id: 3,
                inputNumber: "{currentPlayer#currentBet}",
              },

              //  Player status switch to played
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },

              // Change all Other Player to "not played"
              {
                id: 8,
                inputBool: true,
              },
            ],
          },
        ],
        actionsAtEnd: 0,
      },
      manche: {
        actionsAtStart: [],
        actionsAtEnd: 0,
        maxManche: null,
      },
      cards: {
        activeHandDeck: true, // card in player's hand
        activPersonalHandDeck: true, // deck in player's hand
        activPersonalHandDiscard: true, // discard deck in player's hand
        activeDiscardDeck: false,
        discard: {
          quantity: {
            min: null, // calculate value
            max: null, //calculate value
          },
        },
        pickOnDeck: {
          quantity: {
            min: null, // calculate value
            max: null, // calculate value
          },
        },
        activeCardAsGain: true,
        handDeck: {
          activation: true,
          visibility: "nobody",
        },
        cardBoard: {
          // plateau de pile de carte
        },
      },
      gain: {
        groupPot: true,
      },
    },
    events: {
      demons: [
        // la partie se lance apres que tous les demons se soient activés si etat != start
        {
          // pas besoin d'une liste de conditions , on met une comp "or" si plusieurs conditions d'exec
          condition:
            "exp(comp({tour};isEqualNumber;4)&&allPlayersHasPlayed/endOfTour)",
          events: [13, 15, 16, 302],
          // 13 récupération des mises
          // 15 lancer la verification des cartes
          // 16 reset global bet
          // 302 change manche
        },
      ],
      events: [
        // default events
        {
          id: 300,
          name: "WIN",
          condition: null,
          event: {
            for: ["{currentPlayer}"],
            give: {},
            attachedEventForTour: null,
            action: "WIN",
            value: null,
          },
        },

        {
          id: 7,
          name: "Se coucher", // pas besoin de donner la mise
          // si il a miser elle est dans "current bet" et sera récupéré
          // sinon elle est dans la petite blind ou grosse blinde et deja dans "current bet" du joueur
          condition: null,
          event: {
            for: "{currentPlayer}",
            give: null,
            action: "skipPlayerTour",
            value: null,
          },
        },
        {
          // Change all player status if current bet is not global current bet
          id: 8,
          name: "change play status to all player when player bet",
          condition: null,
          boucle: "{allPlayersInGame}",
          event: {
            condition:
              "exp(exp(comp({playerBoucle#attachedEventForTour};notContain;<<skipPlayerTour>>)&&comp({playerBoucle};differentPlayer;{currentPlayer}))&&comp({playerBoucle#currentBet};isInferiorNumber;{currentBet}))",
            for: "{playerBoucle#hasPlayed}",
            action: "updateGlobalValue",
            value: "false",
          },
        },
      ],
    },
    assets: {
      cards: {
        // --- PIQUES (Spades) ---
        1: {
          id: 1,
          value: 1,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        2: {
          id: 2,
          value: 2,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        3: {
          id: 3,
          value: 3,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        4: {
          id: 4,
          value: 4,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        5: {
          id: 5,
          value: 5,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        6: {
          id: 6,
          value: 6,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        7: {
          id: 7,
          value: 7,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        8: {
          id: 8,
          value: 8,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
        9: {
          id: 9,
          value: 9,
          type: "french_standard",
          addedAttributs: { couleur: "pique" },
        },
      },
      gains: [
        {
          id: 1,
          nom: "jetons",
          value: null,
          value_numérique: 1,
          quantite: null, // in fini
        },
      ],
      roles: [
        {
          nom: "dealer",
          attribution: "{startPlayer}",
        },
      ],
    },
  });

  function saveGame(){

  }
  useEffect(() => {
    async function getData() {
      const resultGames = await fetchData(
        "api/game/" + { id } + "/dashboard",
        null,
        {
          token: token,
        }
      );
    }
    if (token) {
      //   getData();
    } else {
      navigate("/login");
    }
  }, [token, id]);

  

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return   <div className={" gameCreationEnvironnementPage"}>
      <GameCreationEnvironnementHeader name="Skyjo" />
      <div className="content">
        <GameCreationEnvironnementNavigation
          playerHasEdit={playerHasEdit}
          currentPage={subpage}
          saveGame={saveNewGameInStorage}
        />
        {(() => {
          switch (subpage) {
            case "dashboard":
              return (
                <Dashboard
                  gameData={{
                    cardsCount: Object.keys(game.assets.cards).length,
                    rolesCount: game.assets.roles.length,
                    gainsCount: game.assets.gains.length,
                    editionHistory: game.metadata.editionHistory,
                    notes: game.notes,
                  }}
                />
              );

            case "edit":
              return (
                <EditGame
                  setPlayerHasEdit={setPlayerHasEdit}
                  playerHasEdit={playerHasEdit}
                  gameData={{
                    name: game.name,
                    image: gameImageUploadedUrl ? gameImageUploadedUrl : game.image  ? game.image : "/src/assets/images/template-game.png"
                  }}
                  setGame={setGame}
                  setGameImageUploaded={setGameImageUploaded}
                  setGameImageUploadedUrl={setGameImageUploadedUrl}
                />
              );
            case "won":
              return "";
            case "lost":
              return "";
            default:
              return null;
          }
        })()}
      </div>
    </div>
  
}
