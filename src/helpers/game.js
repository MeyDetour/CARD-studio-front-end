export default function applyDefaultGameSettings(game) {
    if (!game){ 
        game = {};
    }



    game.isPublic =  true;

    game.params={
        globalGame :{
                maxPlayers : 5,
                minPlayers :  2,
                soloMode : false,
                playersCanJoin: true,
                allowSpectator :true
        },
        tours:{
            activation : true,
            maxTour : 0,
            sens:"incrementation",
            firstPlayer:"",
            firstPlayerValue:""
            ,
            firstPlayerExpression:"",
            startNumber:"",
            timerActivation:false,
            duration:0,
            actionOnlyAtPlayerTour:false,
            actions:[]
        },
        roles:{
            activation : true,
        },
        gains:{
            activation : true,
        },
        rendering:{
            game:{
                displayHandDeck:true,
                displayMiddleCards:false,
                displayCountAdversaryHandDeck:false,
                displayStatistics:false,
                displayChat:true,
                displayHistory:true,
                displayTimer:false
            },
            playerHand:{
                overlapping:false,
                template:""
            }
            ,middleCards:{
                template:""
            }
        },

        cards:{
            radius : 0,
            ratio : 0,
            ratioValue : 0,
            assetsCardsTemplate:null,
            addedAttributs:{},
            hand:{
                activation : true,
                renderAllHandCards: false,
            },
            deck:{
                activation : true,
                renderTheNextDeckCard : false,
            },
            discard:{
                activation : true,
                renderTheLastDiscardedCard: false,
                displayInTheMiddle: false,
            }
        }
     
    }
    game.globalValue={}
    game.globalValueStatic={}
    game.playerGlobalValue={}
    game.events={
        events:[],
        triggers:[],
        win:{
            applyOnAllPlayers:true,
            manyPlayersCanBeWinner:false,
            condition:null,
             allElementOfBoucleMustSatisyCondition:null,
             displayPoints:{
                activation:false,
                pointsToDisplayFor:"",
                elementToDisplay:""
             }
        }

    }
    game.assets={
            roles:{},
            gains:{},
            cards:{},
        }
    }