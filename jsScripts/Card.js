//  - Cartes recuperees de  ---  https://code.google.com/archive/p/vector-playing-cards/downloads

class Card {
    constructor(el) {
        this._elCard = el;
        this._suits = ["clubs", "diamonds", "hearts", "spades"];
        this._figures = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
        this._cardValue = 0;
        
    }



    //Creer des cartes et afficher/lier avec les images des cartes

    showRandomCard = () => {

        let randomSuit = Math.floor(Math.random() * this._suits.length);
        let randomFigure = Math.floor(Math.random() * this._figures.length);      
  
        
        this._cardValue = parseInt(this._figures[randomFigure]);

            if (this._figures[randomFigure] == "ace") 
            
            this._cardValue = 11;

            if (this._figures[randomFigure] == "jack" || this._figures[randomFigure] == "queen" ||this._figures[randomFigure] == "king") {
                
                this._cardValue= 10;

            }
           

// Associer les figures du random avec les images de cartes .png
        let card = this._figures[randomFigure] + "_of_" + this._suits[randomSuit] + ".png";


        return card;

    }

    get cardValue() {
        return this._cardValue;
    }
     




}
