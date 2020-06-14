function calculateFitness() {
    var currentRecord = Infinity;
    for ( let i = 0; i < population.length; i++ ) {
        var d = calcDistance( cities, population[ i ] );
        if ( d < recordDistance ) {
            recordDistance = d;
            bestEver = population[ i ];
            console.log( recordDistance );
        }

        if ( d < currentRecord ) {
            currentRecord = d;
            currentBest = population[ i ];
        }

        fitness[ i ] = 1 / ( d + 1 );
    }
}

function normalizeFitness() {
    let sum = 0;
    for ( let i = 0; i < fitness.length; i++ ) {
        sum += fitness[ i ];
    }
    for ( let i = 0; i < fitness.length; i++ ) {
        fitness[ i ] = fitness[ i ] / sum;
    }
}

function nextGeneration() {
    let newPopulation = [];
    for ( let i = 0; i < population.length; i++ ) {
        var orderA = pickOne( population, fitness );
        var orderB = pickOne( population, fitness );
        var order = crossOver( orderA, orderB );
        mutate( order, 0.01 );
        newPopulation[ i ] = order;
    }
    population = newPopulation;
}

function pickOne( list, prob ) {
    let index = 0;
    let r = random( 1 );
    while ( r > 0 ) {
        r = r - prob[ index ];
        index++;
    }
    index--;
    return list[ index ].slice();
}

function crossOver( orderA, orderB ) {
    let start = floor( random( orderA.length ) );
    let end = floor( random( start + 1, orderA.length ) );
    let neworder = orderA.slice( start, end );

    let left = totalCities - neworder.length;
    for ( let i = 0; i < orderB.length; i++ ) {
        let city = orderB[ i ];
        if ( !neworder.includes( city ) ) {
            neworder.push( city );
        }
    }
    return neworder;
}

function mutate( order, mutationRate ) {
    for ( let i = 0; i < population.length; i++ ) {
        if ( random( 1 ) < mutationRate ) {
            var indexA = floor( random( order.length ) );
            var indexB = ( indexA + 1 ) % totalCities;
            swap( order, indexA, indexB );
        }
    }
}
/*
function mutate( order, mutationRate ) {
    var indexA = floor( random( order.length ) );
    var indexB = floor( random( order.length ) );
    swap( order, indexA, indexB );
}
*/