class Game {

    highestScore = 0;
    gameCounter = 1;

    constructor(el) {
        this._el = el;
        this._players = document.querySelectorAll('[ data-js-player]');
        this._playersStoped = document.querySelectorAll('.playerStop');
        this._playersLost = document.querySelectorAll('.playerLost');
        this._newGameButton = document.querySelector('[data-js-new-game]');
        this._gameCounterWrampper = document.querySelector('[data-js-game-counter]');

        this._newForm = document.querySelector('[data-js-form]');
        this._elMain = document.querySelector('[data-js-main]');
        this._gameSession = sessionStorage.getItem('numberOfGames');

        this._winnSound = new Audio();
        this._winnSound.src = "audio/applause.mp3";
        this._cardShuffleSound = new Audio();
        this._cardShuffleSound.src = "audio/button_click.mp3";


        this.init();

        console.log(this._gameCounterWrampper);

    }


    init = () => { // initialiser les comportements des boutons

        this._newGameButton.addEventListener('click', this.newGame);

    }

    nextPlayer = (currentPlayer) => {

        this._players[currentPlayer].classList.add('inactivePlayer'); // ---->> Ajouter classe "inactivePlayer" pour tous les joueurs, et on les enleves seulements si le joueur n'est pas Busted ou n'a pas encore arretee de jouer

        // On verifie si le jeu n'est pas encore fini
        this.checkEndOfGame();

        // Fonction pour recommencer le cycle - des qu'on sort de la boucle - retourner a l'index [0]
        this.findNextPlayer(currentPlayer + 1);

    }


    findNextPlayer = (indexPlayer) => {

        let isFound = false;
        //Boucler pour ajouter ou enlever la classe "inactivePlayer", selon le cas, pour pouvoir activer le joueur suivant et desactiver le joueur courrant, des que le bouton "jouer" est appuiee.

        for (let i = indexPlayer; i < this._players.length; i++) {

            // si le joueur n'a pas le statut "Lost" ou "Stop" alors active-le pour jouer 
            if (!this._players[i].classList.contains('playerStop') && !this._players[i].classList.contains('playerLost') && !isFound) {

                this._players[i].classList.remove('inactivePlayer');
                isFound = true;
            }
        }

        if (!isFound && indexPlayer > this._players.length - 1) {
            // console.log(indexPlayer);
            this.findNextPlayer(0);
        }
    }


    checkEndOfGame = () => {

        let playersStoped = document.querySelectorAll('.playerStop').length;
        let playersLost = document.querySelectorAll('.playerLost').length;


        if ((playersStoped + playersLost) == this._players.length) {



            this.getHighestScore();

            this._newGameButton.style.display = 'block';
            document.querySelector('[data-js-counter-wrapper]').classList.remove('hidden');

            // compter No de parties jouees - Sessions
            //this.gameCounter++;
             this.gamesPlayed();

            //  let insertCounter = sessionStorage.getItem.nbGames;
            //  this._gameCounterWrampper.innerHTML =  insertCounter;

            // 

            return true;

        } else {

            return false;
        }

    }





    gamesPlayed = () => {
        let nbGames = 0;
        if (!sessionStorage.getItem('numberOfGames')) {
            sessionStorage.setItem('numberOfGames', 1);
            nbGames = 1; 
            console.log(nbGames);
        } else {
            let numberOfGames = parseInt(sessionStorage.getItem('numberOfGames')) + 1;
            sessionStorage.setItem('numberOfGames', numberOfGames);
            nbGames += numberOfGames;
        }


           
            // sessionStorage.setItem(nbGames, gameCounter);

            // let insertCounter = sessionStorage.getItem('numberOfGames');
            this._gameCounterWrampper.classList.remove('hidden');
            this._gameCounterWrampper.innerHTML = nbGames;

            // this.count++
            // sessionStorage.nbGames = this.count;
            //parseInt(sessionStorage.getItem.noGames

    

    }





    getHighestScore = () => {
        let playersStoped = document.querySelectorAll('.playerStop');
        let congrats = '';
        let bestPlayer = [];

        playersStoped.forEach(playerWhoStopped => {
            console.log(playerWhoStopped);
            let winner = playerWhoStopped.querySelector('[data-js-player-name]').textContent;
            let score = playerWhoStopped.querySelector('[data-js-total]').textContent;
            console.log(parseInt(score));

            if (parseInt(score) > this.highestScore) {
                this.highestScore = parseInt(score);

                congrats = 'Felicitations ' + 'Joueur ' + playerWhoStopped.dataset.jsPlayer + ': ' + winner + '. Vous avez gagné!';

                this._winnSound.play();

                bestPlayer = playerWhoStopped;
            }
        });

        // Ajouter des styles aux gagnants
        bestPlayer.querySelector('[data-js-winner]').classList.remove('hidden');// ajouter de l'animation (feux d'artifices) au gagnant

        bestPlayer.style.opacity = '0.8';

        document.querySelector('[data-js-congrats]').innerHTML = congrats;

        return this.highestScore;

    }



    newGame = () => {
        this._cardShuffleSound.play();


        this._newGameButton.style.display = 'none';
        this._el.remove();
        document.querySelector('[data-js-congrats]').classList.add('hidden');
        this._newForm.classList.remove('hidden');
        this._elMain.classList.remove('bck_inactive'); // ajoute le fond de la page d'accueil
        document.querySelector('[data-js-counter-wrapper]').classList.add('hidden');

    }


}