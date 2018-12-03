var populationQtde = 100;
var population = new Array(100);
var totalDistanceList = new Array(100);
var dist = new Array;


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


init();

function init(){
    createFirstPopulation();
    calculateDistance();
    calculateTotalDistance()
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
}

function createFirstPopulation(){
    var base = [];
    for (let i = 0; i < nodes.length; i++) {
        base[i] = i;
    }
    for (let i = 0; i < populationQtde; i++) {
        population[i] = {nodes:[], totalDistance:-1};

        population[i].nodes = shuffle(nodes).slice(0);        
    }

    console.log(population)
}


function calculateTotalDistance(){
    for (let i = 0; i < population.length; i++) {
        var totalDistance=0;
        for (let x = 0; x < nodes.length-1; x++) {
            totalDistance += dist[population[i].nodes[x].index][population[i].nodes[x+1].index]
        }
        population[i].totalDistance = totalDistance;
    }
    console.log(population);
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
    console.log(dist);
}
