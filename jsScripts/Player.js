class Player extends Game {

    constructor(el) {
        super();
        this._el = el;
        this._playerNumber = this._el.dataset.jsPlayer; // le numero du joueur ex; Joueur 1 
        this._elPlayerSpace = this._el.querySelector('[data-js-pspace]');
        this._elPlayerName = this._el.querySelector('[data-js-player-name]');
        this._elPlayerCardsWrapper = this._el.querySelector('[data-js-cards]');
        this._elScoreWrapper = this._el.querySelector('[data-js-total]');
        this._elPlay = this._el.querySelector('[data-js-play]');
        this._elStop = this._el.querySelector('[data-js-stop]');
        this._playerScore = 0;
        //this._isGameOver = this.checkEndOfGame();

        // console.log( this._isGameOver);


        //audio -a migrer vers Class Game
        this._cardFlipSound = new Audio();
        this._cardFlipSound.src = "audio/Card-flip.mp3";
        this._stopSound = new Audio();
        this._stopSound.src = "audio/button-stop2.mp3";
        this._stopSound.volume = 0.1;
        this._failSound = new Audio();
        this._failSound.src = "audio/lost.mp3";

        this.init();


    }


    init = () => { // initialiser les comportements des boutons

        this._elPlay.addEventListener('click', this.Play);
        this._elStop.addEventListener('click', this.Stop);

    }


    Play = (e) => {
        e.preventDefault();



        this._cardFlipSound.play();

        this._el.classList.remove('inactive');

        let playerNewCard = new Card();

        // Injecte les images des cartes de jeu 
        this._elPlayerCardsWrapper.innerHTML += `<li><picture class="card_image"><img  src="images/Cards/${playerNewCard.showRandomCard()}"} /></picture></li> `;

        //mise a jour du pointage
        this._playerScore += playerNewCard.cardValue;

        //injecter le pointage du joueur, dans son espace-joueur
        this._elScoreWrapper.innerHTML = this._playerScore;



        // console.log(this._endOfGame);

        // conditions a migrer dans la classe Game 





        if (this._playerScore > 21) {

            this._el.querySelector('[data-js-status]').classList.remove('hidden');
            this._el.querySelector('[data-js-status]').innerHTML = 'Joueur ' + this._playerNumber + ': ' + this._elPlayerName.textContent + ' a perdu!';
            this._el.classList.add('playerLost');

            this._failSound.play();
        } else {
           
        // appelle la fonction de la class Game - pour gerer la fin du jeu et le pointage + gagnants 
            this.checkEndOfGame();

        }

        this.nextPlayer(this._playerNumber - 1); // appelle la fonction qui passe au joueur suivant - (dans la classe Game)
    }



    Stop = () => {

        this._stopSound.play();

        this._el.classList.add('playerStop');

        this.nextPlayer(this._playerNumber - 1);//l'index du joueur en cours

    }




}