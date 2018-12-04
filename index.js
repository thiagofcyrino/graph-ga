var populationQtde = 100;
var population = new Array(populationQtde);
var totalDistanceList = new Array(populationQtde);
var dist = new Array;
var localBest = new Array;
var globalBest = new Array;

var numberOfGenerations = 100;
var crossOverPer = 0.9;
var mutateChancePer = 0.01;

var nodes= [{name: "N", index:0}, 
            {name: "F", index:1}, 
            {name: "K", index:2},
            {name: "L", index:3}, 
            {name: "E", index:4}, 
            {name: "G", index:5},
            {name: "H", index:6}
        ];

var links= [
            {source: 0, target: 1, weight: 47},
            {source: 0, target: 2, weight: 60},
            {source: 1, target: 2, weight: 70},
            {source: 1, target: 4, weight: 10},            
            {source: 1, target: 3, weight: 10},
            {source: 1, target: 6, weight: 30},
            {source: 2, target: 4, weight: 10},
            {source: 2, target: 6, weight: 73},
            {source: 2, target: 5, weight: 90},
            {source: 3, target: 4, weight: 5 },
            {source: 3, target: 6, weight: 40},
            {source: 4, target: 6, weight: 60},
            {source: 4, target: 5, weight: 40},
            {source: 4, target: 5, weight: 40},
            {source: 5, target: 6, weight: 80}
        ];

     function sortPopulation ( a,b){
        if( a.totalDistance < b.totalDistance)
            return -1;
        else if( a.totalDistance > b.totalDistance)
            return 1;
        else   
            return 0;
    }
init();

function randomInteger(min, max){
    return Math.floor(Math.random() * (+max - +min)) + +min;    
}

function crossOver(indivA, indivB, gen = 0) {
  
   
    var newItem = {nodes: new Array(nodes.length), totalDistance:-1, generation:gen};
    var start = randomInteger(0,2);
    var end = randomInteger(3,5);

    newItem.nodes = indivA.nodes.slice(start,end);
    
    for (let i = 0; i < indivB.nodes.length; i++) {
        node = indivB.nodes[i];
        if(!newItem.nodes.includes(node)){
            newItem.nodes.push(node);
        }        
    }

    newItem.totalDistance = calculateTotalDistanceOfItem(newItem);

    return newItem;
}

function mutate(newItem) {
    
    if(Math.random() < mutateChancePer){
        console.log("MUTATE!!!")
        var start = randomInteger(0,newItem.nodes.length-1);
        newItem.nodes = shuffle(newItem.nodes, start,start+1);
    }    
    return newItem;
}

function init(){
    createFirstPopulation();
    calculateDistance();
    calculateTotalDistance();
    population = population.sort(sortPopulation);

    localBest = population.slice(0,1)[0];
    globalBest= population.slice(0,1)[0];

    
    for (let i = 0; i < numberOfGenerations; i++) {
        var crossOverQtde = populationQtde * crossOverPer;
        var newPopulation = [];

       for (let x = 0; x < crossOverQtde; x++) {
            var indexA = randomInteger(0,populationQtde/2);
            var indexB = randomInteger(indexA,populationQtde);
            var newNode = crossOver(population[indexA],population[indexB], i+1)
            newNode = mutate(newNode);
            newPopulation.push(newNode);
       }

       for (let x = 0; x < populationQtde - crossOverQtde; x++) {        
        newPopulation.push(population[x]);
   }
        
        population = newPopulation.slice();

        population = population.sort(sortPopulation);
        
        localBest = population.slice(0,1)[0];


        if(localBest.totalDistance< globalBest.totalDistance)
            globalBest = localBest;
        console.log(localBest.totalDistance + " /G GG -  " + globalBest.totalDistance);
        
    }

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function shuffle(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
}

function createFirstPopulation(){
    var base = [];
    for (let i = 0; i < nodes.length; i++) {
        base[i] = i;
    }
    for (let i = 0; i < populationQtde; i++) {
        population[i] = {nodes:[], totalDistance:-1};

        population[i].nodes = shuffleArray(nodes).slice(0);        
    }
}


function calculateTotalDistance(){
    for (let i = 0; i < population.length; i++) {        
        population[i].totalDistance = calculateTotalDistanceOfItem(population[i]);
    }
    
}

function calculateTotalDistanceOfItem(indiv){
    //console.log(indiv);
        var totalDistance=0;
        for (let x = 0; x < nodes.length-1; x++) {
            
            totalDistance += dist[indiv.nodes[x].index][indiv.nodes[x+1].index]
        }
        
    
    return totalDistance;
}

function calculateDistance(){
    for (let i = 0; i < nodes.length; i++) {
        dist[i] = new Array;
        for (let j = 0; j < nodes.length; j++) {
            
            if(i == j)
                dist[i][j] = 0
            else
                dist[i][j] = Infinity;
        }    
    }
    for (let i = 0; i < links.length; i++) {
        dist[links[i].source][[links[i].target]] = links[i].weight;
        dist[links[i].target][[links[i].source]] = links[i].weight;
    }
}
