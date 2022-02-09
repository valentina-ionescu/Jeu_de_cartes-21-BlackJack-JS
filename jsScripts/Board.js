class Board {

    
    constructor(el) {
        this._elForm = el;
        this._elQty = this._elForm.qtyPlayers;
        this._elSubmit = this._elForm.querySelector('button');

        this._playersNames = ['BadKarma', 'Casanova', 'HairyPoppins', 'YellowSnowman', 'AnonyMouse', 'FluffyCookie','Babushka', 'FartinLutherKing ', 'iNeed2p', 'Avocadorable', 'fatBatman', 'FreddyMercurysCat'];
        this._cardShuffleSound = new Audio();
        this._cardShuffleSound.src = "audio/shuffling-cards.mp3";
        this._elPlayersWrapper = document.querySelector('[data-js-players-wrapper]');
        this._elGameCounterWrapper = document.querySelector('[data-js-game-counter]');

        this._elMain = document.querySelector('[data-js-main]'); 


        this.init();
    }
    



    init = () => {
        this._elSubmit.addEventListener('click', this.addPlayer)
        this._elSubmit.addEventListener('click', this.gameCounter)

    }


    addPlayer = (e) => {
        e.preventDefault();

        this._elMain.classList.add('bck_inactive'); // enleve le fond de la page d'accueil
        this._cardShuffleSound.play();
       


        let qtyPlayers = this._elQty.value;
       

        if (qtyPlayers > 0) {

            for (let i = 0, l = qtyPlayers; i < l; i++) {
              let randomName = Math.floor(Math.random() * this._playersNames.length);   
                this._elForm.classList.add('hidden');
                


                this._elPlayersWrapper.innerHTML += `
                                         <div class="player_space_wrapper inactivePlayer" data-js-player="${i + 1}">
                                        
                                            <div class="player_space" data-js-pspace> 
                                            <picture class="hidden" data-js-winner> <img class="winner_confetti" src="images/gif/Fireworks.gif" alt=""> </picture>
                                                <h2>Joueur ${i + 1} : <span class="player_name" data-js-player-name>${ this._playersNames[randomName]}</span></h2> 
                                                <div class="players_cards">
                                                    <ul data-js-cards>
                                
                                                    </ul>
                                                 </div>
                                                <h3 >Total: <span data-js-total > </span></h3>
                                              
                                                <div class="play_buttons">
                                                    <button data-js-play>Jouer!</button>
                                                    <button data-js-stop>Stop!</button>
                                                </div>

                                            </div>
                                            <h4 class="hidden" data-js-status></h4>
                                             </div>
                                            
                `;
            }
        }

        this.callPlayerBehavior();  
    }


    callPlayerBehavior = () => {

        let elPlayers = this._elPlayersWrapper.querySelectorAll('[data-js-player]');

        elPlayers[0].classList.remove('inactivePlayer');


        for (let i = 0, l = elPlayers.length; i < l; i++) {
            new Player(elPlayers[i]);
        }

    }











// Game Counter
/*
    gameCounter = (e) => {

        e.preventDefault();
let sessiongameCount;
        if (!sessiongameCount) {
            sessionStorage.setItem ('Parties', );
            sessionStorage.getItem('Parties') ;
console.log(sessiongameCount);
        } else{
          //  sessionStorage.gameCount = (sessionStorage.gameCount)+1;
        }

        //this._elGameCounterWrapper.innerHTML =  + sessionStorage.gameCount ;
    }
*/

}