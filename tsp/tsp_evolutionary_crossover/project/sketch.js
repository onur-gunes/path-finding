var cities = [];
var totalCities = 16;

var popSize = 500;
var population = [];
var fitness = [];

var recordDistance = Infinity;
var bestEver;
var currentBest;

function setup() {
    createCanvas( 800, 800 );
    var order = [];
    for ( let i = 0; i < totalCities; i++ ) {
        var v = createVector( random( width ), random( height / 2 ) );
        cities[ i ] = v;
        order[ i ] = i;
    }

    for ( let i = 0; i < popSize; i++ ) {
        population[ i ] = shuffle( order );
    }


}


function draw() {
    background( 0 );

    calculateFitness();
    normalizeFitness();
    nextGeneration();

    stroke( 255 );
    strokeWeight( 4 );
    noFill();
    beginShape();
    for ( let i = 0; i < bestEver.length; i++ ) {
        let n = bestEver[ i ];
        vertex( cities[ n ].x, cities[ n ].y );
        ellipse( cities[ n ].x, cities[ n ].y, 16, 16 );
    }
    endShape();
    stroke( 255 );
    line( cities[ bestEver[ 0 ] ].x, cities[ bestEver[ 0 ] ].y, cities[ bestEver[ bestEver.length - 1 ] ].x, cities[ bestEver[ bestEver.length - 1 ] ].y );


    translate( 0, height / 2 );
    stroke( 255 );
    strokeWeight( 4 );
    noFill();
    beginShape();
    for ( let i = 0; i < currentBest.length; i++ ) {
        let n = currentBest[ i ];
        vertex( cities[ n ].x, cities[ n ].y );
        ellipse( cities[ n ].x, cities[ n ].y, 16, 16 );
    }
    endShape();

}


// function shuffle( a, num ) {
//     for ( let i = 0; i < num; i++ ) {
//         var indexA = floor( random( a.length ) );
//         var indexB = floor( random( a.length ) );
//         swap( a, indexA, indexB );
//     }
// }

function swap( a, i, j ) {
    let temp = a[ i ];
    a[ i ] = a[ j ];
    a[ j ] = temp;
}

function calcDistance( points, order ) {
    let sum = 0;
    for ( let i = 0; i < order.length - 1; i++ ) {
        let cityAIndex = order[ i ];
        let cityA = points[ cityAIndex ];
        let cityBIndex = order[ i + 1 ];
        let cityB = points[ cityBIndex ];

        sum += dist( cityA.x, cityA.y, cityB.x, cityB.y );
    }
    sum += dist( points[ order[ 0 ] ].x, points[ order[ 0 ] ].y, points[ order[ order.length - 1 ] ].x, points[ order[ order.length - 1 ] ].y );
    return sum;
}