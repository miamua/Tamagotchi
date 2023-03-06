'use strict';

class Pet{
    constructor(name, animalType, tiredness, hunger, loneliness, happiness, comment, commentColor){
       this.name = name;
       this.type = animalType;
       this.tiredness = 50;
       this.hunger = 50;
       this.loneliness = 50;
       this.happiness = 50;
       this.comment = "";
       this.commentColor = "";
    
    }

    nap(){
        if(this.tiredness > 0){
            this.tiredness = this.tiredness + 30;
            this.happiness = this.happiness - 10;
            this.hunger = this.hunger - 20;
            this.loneliness = this.loneliness - 10;
            this.comment = `You took a nap with ${this.name}`;
            this.commentColor = "black";
        }else{
            this.comment = `${this.name} doesn't want to sleep anymore!`;
            this.commentColor = "red";
        }
        
        this.checkMinMax();
        this.die();
        console.log(`
        ${this.name}'s tiredness: ${this.tiredness}
        ${this.name}'s hunger: ${this.hunger}
        ${this.name}'s loneliness: ${this.loneliness}
        ${this.name}'s happiness: ${this.happiness}
        `);
        
    };

    play(){
        
        if(this.tiredness >10){
            this.tiredness = this.tiredness - 20;
            this.happiness = this.happiness + 30;
            this.hunger = this.hunger - 30;
            this.loneliness = this.loneliness + 10;
            this.checkMinMax();
            this.comment = `You played with ${this.name} 😏`;
            this.commentColor = "black";
            this.die();
            console.log(`
            ${this.name}'s tiredness: ${this.tiredness}
            ${this.name}'s hunger: ${this.hunger}
            ${this.name}'s loneliness: ${this.loneliness}
            ${this.name}'s happiness: ${this.happiness}
            `);
        }else{
            this.comment = `${this.name} is too tired to play 😪`;
            this.commentColor = "red";
            console.log(`${this.name} is too tired to play 😪`);
            console.log(`
            ${this.name}'s tiredness: ${this.tiredness}
            ${this.name}'s hunger: ${this.hunger}
            ${this.name}'s loneliness: ${this.loneliness}
            ${this.name}'s happiness: ${this.happiness}
            `);
        }
         
    };

    eat(){
        if(this.hunger >= 100){
            this.comment = `${this.name} is full, can't eat anymore!`;
            this.commentColor = "red";
        }else{
            this.tiredness = this.tiredness - 10;
            this.hunger = this.hunger + 40;
            this.loneliness = this.loneliness + 10;
            this.happiness = this.happiness + 10;
            this.comment = `You feeded ${this.name} 🍕🍔🍟🍣🥧🍦🧁🍰`;
            this.commentColor = "black";


            
        }
        this.checkMinMax();
        this.die();
        console.log(`
        ${this.name}'s tiredness: ${this.tiredness}
        ${this.name}'s hunger: ${this.hunger}
        ${this.name}'s loneliness: ${this.loneliness}
        ${this.name}'s happiness: ${this.happiness}
        `);
        
    };

    checkMinMax(){
        if (this.tiredness > 100) this.tiredness = 100;
        if (this.hunger > 100) this.hunger = 100;
        if (this.happiness > 100) this.happiness = 100;
        if (this.loneliness > 100) this.loneliness = 100;
        if (this.tiredness < 0) this.tiredness = 0;
        if (this.hunger < 0) this.hunger = 0;
        if (this.happiness < 0) this.happiness = 0;
        if (this.loneliness < 0) this.loneliness = 0;
    };

    die(){
        if(this.hunger <= 0){
            this.comment = `You killed ${this.name}!!`;
            this.commentColor = "red";
            this.type = "dead";
            document.body.style.pointerEvents="none";
            window.setTimeout( () => {
                window.location.reload();},2000); 
        }
    }

};

let petInfoDiv = document.querySelector("#petInfo");


let pets = [];
let showPetInfo  = () =>{
    petInfoDiv.innerHTML ="";
    
    pets.forEach((pet) => {
        let comment = document.createElement("p");
        comment.setAttribute("id","pet-comment");
        comment.innerText = `${pet.comment}`;
        comment.style.color = `${pet.commentColor}`;
       
        let petPicDiv = document.createElement("div");
        petPicDiv.setAttribute("class", "petPics");
        if(pet.type === "dog"){
            petPicDiv.innerHTML = `<img src="img/dog3.gif" alt="dog pic">`
        }else if(pet.type === "cat"){
            petPicDiv.innerHTML = `<img src="img/cat.gif" alt="cat pic">`
        }else if(pet.type === "rabbit"){
            petPicDiv.innerHTML = `<img src="img/rabbit.gif" alt="rabbit pic">`
        }else if(pet.type === "dead" ){
            petPicDiv.innerHTML = `<img src="img/dead.gif" alt="rabbit pic">`
        }
        
        let petDiv = document.createElement("div");
        petDiv.setAttribute("id","petDiv");
        petDiv.innerHTML= `
        <h3>${pet.name}</h3>
        <label for="tiredness">Tiredness:</label>
        <progress class="progressbar" id="tiredness" value="${pet.tiredness}" max="100"> 50</progress>
        <br/>

        <label for="hunger">Hunger:</label>
        <progress class="progressbar" id="hunger" value="${pet.hunger}" max="100"> 50</progress>
        <br/>

        <label for="loneliness">Loneliness:</label>
        <progress class="progressbar" id="loneliness" value="${pet.loneliness}" max="100"> 50</progress>
        <br/>

        <label for="happiness">Happiness:</label>
        <progress class="progressbar" id="happiness" value="${pet.happiness}" max="100"> ${pet.happiness}</progress>
        <br/>

        `;
        

        let actionsBtnDiv = document.createElement("div");
        actionsBtnDiv.setAttribute("id","actionsBtnDiv");
        let napBtn = document.createElement("button");
        let feedBtn = document.createElement("button");
        let playBtn = document.createElement("button"); 
        napBtn.innerHTML = "Nap";
        feedBtn.innerHTML = "Feed";
        playBtn.innerHTML = "Play";

        petInfoDiv.append(petDiv);
        if(pet.tiredness <= 40){
           document.getElementById('tiredness').className = ' redBar';
        }
        if(pet.hunger <= 40){
            document.getElementById('hunger').className = ' redBar';
        }
        if(pet.loneliness <=40 ){
            document.getElementById('loneliness').className = ' redBar';
        }if(pet.happiness <=40 ){
            document.getElementById('happiness').className = ' redBar';
        }
        

        petDiv.append(comment);
        petDiv.append(petPicDiv);
        actionsBtnDiv.append(napBtn, feedBtn, playBtn);
        petInfoDiv.append(actionsBtnDiv);
        
        napBtn.addEventListener("click", () => {
            pet.nap();
            showPetInfo();
            
        });

        feedBtn.addEventListener("click", () => {
            pet.eat();
            showPetInfo();
        });

        playBtn.addEventListener("click", () => {
            pet.play();
            showPetInfo();   
        });

    });
    
        
       
};


let createPet = () => {
    let petName = document.querySelector("#name").value;
    let petType = document.querySelector("#animalType").value;
    let newPet = new Pet(petName, petType);
    pets.push(newPet);
    console.log(pets);

    showPetInfo();

};


let addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    createPet();
}
);



/*
time() {
    this.tiredness += 10;
    this.hunger += 10;
    this.happiness -= 10;
    this.checkLimits();
    this.renderAnimal();
    setInterval(() => {
      this.time();
    }, 2000);
  }

*/



