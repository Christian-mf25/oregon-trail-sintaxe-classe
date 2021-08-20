class Traveler{
	constructor(name){
		this.name      = name
		this._food      = 1
		this.isHealthy = true
	}
	
	get food(){
		return this._food
	}

	set food(value){
		this._food += value
	}

	hunt = () =>{
		this._food += 2
		return `${this.name} ficou com ${this.food} de comida.`
	}

	eat = () =>{
		if(this.food === 1){
			this._food -= 1
			return `${this.name} comeu o ultimo mantimento, melhor procurar alimento`
		}
		if(this.food > 0){
			this._food -= 1
			this.isHealthy = true
			return `Restou ${this.food} de comida em seu inventário`
		}
		if(this.food <= 0){
			this.isHealthy = false
		}
		return `${this.name} está sem comida e ficou doente por estar sem nutrientes`

	}
}

class Wagon{
	constructor(capacity){
		this.capacity = capacity
		this.travelers = []
	}

	getAvailableSeatCount(){
		return `Tem ${this.capacity} assentos livres.`
	}

	join (traveler){
		if(this.capacity > 0){
			this.capacity -= 1
			this.travelers.push(traveler)
			return `${traveler.name} entrou na carroça e sobrou ${this.capacity} assentos livres`
		}
		return `Não tem assento livre para ${traveler.name}`
	}

	shouldQuarantine(){
		for(let i = 0; i < this.travelers.length; i++){
			let traveler = this.travelers[i]
			if(traveler.isHealthy !== true){
				return `Ficar de quarentena  até ${traveler.name} ficar saudável novamente!`
			}
		}
		return `Todos estão sauáveis, melhor seguir viagem.`
	}

	totalFood(){
		let result = this.travelers.reduce((acc, item) =>{
			return acc + item.food
		},0)
		return `Há um total de ${result} mantimentos na carroça.`
	}

}

// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');


console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);
