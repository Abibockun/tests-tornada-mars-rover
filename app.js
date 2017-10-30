/**
 * Initialize Application Configuration
 *
 * @type {{output: Output, inputSeparator: string, roverMaxCount: number, roverCounter: number, plateau: {}}}
 */
let app = {
    output: new Output(),
    inputSeparator: " ",
    roverMaxCount: 5,
    roverCounter: 0,
    plateau: null
};

window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('step-2').style.display = 'none';
}, true);

document.getElementById('initPlateauForm').onsubmit = function(e) {
    e.preventDefault();
    let plateauSize = document.getElementById('plateauSize').value.trim().split(app.inputSeparator);

    if (plateauSize.length !== 2 ) {
        app.output.print('ERROR', 'Please provide proper Plateau Size: "X'+app.inputSeparator+'Y" coordinates!');
        return false;
    }

    if ( !validateCoordinate(plateauSize[0]) || !validateCoordinate(plateauSize[1]) ) {
        app.output.print('ERROR', 'Please provide proper Plateau Size in Integer values!');
        return false;
    }

    app.plateau = new Plateau(
        parseCoordinate(plateauSize[0]),
        parseCoordinate(plateauSize[1])
    );

    app.plateau.drawGrid();

    app.output.print('INFO', "Created Plateau. Size: " + app.plateau.width + ' x ' + app.plateau.height);

    // Show/Hide Elements from the page.
    document.getElementById('step-2').style.display = 'block';
    document.getElementById('step-1').style.display = 'none';
};

document.getElementById('placeRoverForm').onsubmit = function(e) {
    e.preventDefault();

    if (app.roverMaxCount <= app.roverCounter) {
        app.output.print('INFO', "Max amount of Rovers exceeded! Please refresh.");
        document.getElementById('step-2').style.display = 'none';
        return false;
    }

    let roverPosition = document.getElementById('roverPosition').value.trim().split(app.inputSeparator);
    if (roverPosition.length !== 3 ) {
        app.output.print('ERROR', 'Please provide proper Rover position and orientation: "X'+app.inputSeparator+'Y'+app.inputSeparator+'O" !');
        return false;
    }
    if (
        !validateCoordinate(roverPosition[0]) ||
        !validateCoordinate(roverPosition[1]) ||
        roverPosition[2].length > 1
    ) {
        app.output.print('ERROR', 'Please provide proper MarsRover Positions!');
        return false;
    }

    let rover = new MarsRover(app.plateau,
        parseCoordinate(roverPosition[0]),
        parseCoordinate(roverPosition[1]),
        roverPosition[2],
        app.roverCounter
    );

    if (!app.plateau.addRover(rover, app.roverCounter)) {
        app.output.print('ERROR', 'Cannot Deploy Rover!');
        return false;
    }

    app.roverCounter++;

    app.output.print('INFO',
        'Placed Rover with ID: ' + app.roverCounter +
        ' Position: ' + rover.xPosition +
        ' x ' + rover.yPosition +
        ' orientation: ' + rover.orientation);

    let roverCommand = document.getElementById('roverCommand').value.trim().toUpperCase(); //.split(app.inputSeparator);
    if (roverCommand.length <= 0 ) {
        app.output.print('ERROR', 'Please provide proper Rover Command!');
        return false;
    }

    rover.applyCommand(roverCommand);

    app.output.print('INFO', 'Applied Rover Command. "' + document.getElementById('roverCommand').value.trim() +
        '" Position: ' + rover.xPosition +
        ' x ' + rover.yPosition +
        ' orientation: '+rover.orientation);

    document.getElementById('placeRoverForm').reset();
};

// Create Utils
/**
 * Validate Coordinate
 *
 * @param {string} coordinate
 * @returns {boolean}
 */
function validateCoordinate(coordinate) {
    let test = Math.abs(parseInt(coordinate));
    return Number.isInteger(test) && test > 0;

}

/**
 * Parse Coordinate
 *
 * @param {string} coordinate
 * @returns {number}
 */
function parseCoordinate(coordinate) {
    return Math.abs(parseInt(coordinate));
}