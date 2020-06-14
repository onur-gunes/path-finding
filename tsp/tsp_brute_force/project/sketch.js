var cities = [];
var totalCities = 8;

var order = [];

var recordDistance;
var bestEver;

function setup() {
    createCanvas( 400, 300 );
    for ( let i = 0; i < totalCities; i++ ) {
        var v = createVector( random( width ), random( height ) );
        cities[ i ] = v;
        order[ i ] = i;
    }

    let d = calcDistance( cities );
    recordDistance = d;
    bestEver = cities.slice();
}

function draw() {
    background( 0 );
    fill( 255 );
    for ( let i = 0; i < totalCities; i++ ) {
        ellipse( cities[ i ].x, cities[ i ].y, 8, 8 );
    }

    stroke( 255 );
    strokeWeight( 1 );
    noFill();
    beginShape();
    for ( let i = 0; i < totalCities; i++ ) {
        vertex( cities[ i ].x, cities[ i ].y );
    }
    endShape();

    stroke( 255, 0, 255 );
    strokeWeight( 2 );
    noFill();
    beginShape();
    for ( let i = 0; i < totalCities; i++ ) {
        vertex( bestEver[ i ].x, bestEver[ i ].y );
    }
    endShape();

    let i = floor( random( cities.length ) );
    let j = floor( random( cities.length ) );
    swap( cities, i, j );

    let d = calcDistance( cities );
    if ( d < recordDistance ) {
        recordDistance = d;
        bestEver = cities.slice();
        console.log( recordDistance );
    }
}

function swap( a, i, j ) {
    let temp = a[ i ];
    a[ i ] = a[ j ];
    a[ j ] = temp;
}

function calcDistance( points ) {
    let sum = 0;
    for ( let i = 0; i < points.length - 1; i++ ) {
        sum += dist( points[ i ].x, points[ i ].y, points[ i + 1 ].x, points[ i + 1 ].y );
    }
    return sum;
}