'use strict';

/**
 * Mars Rover Class
 */
class MarsRover {
    /**
     * MarsRover Constructor
     *
     * @param {object} plateau
     * @param {int} x
     * @param {int} y
     * @param {string} orientation
     */
    constructor(plateau, x, y, orientation) {
        this.roverBackgroundColor = 'red';
        this.xPosition = x;
        this.yPosition = y;
        this.plateau = plateau;
        this.element = '';
        this.orientation = this.plateau.orientationOrder[this.plateau.findOrientationIndex(orientation)];
    }

    /**
     * Applying Rover Command
     *
     * @param {object} command
     * @param {string} moveTrigger
     * @returns {boolean}
     */
    applyCommand(command, moveTrigger = 'M') {
        let i = 0;
        while (i < command.length) {
            let commandPart = command[i].toUpperCase();
            if (moveTrigger !== commandPart) {
                this.rotateCamera(commandPart);
            } else {
                this.move();
            }
            i++;
        }
        return true;
    }

    /**
     * Rotate Camera
     *
     * @param {string} command
     */
    rotateCamera(command) {
        let nextOrientationIndex = 1;
        let currentOrientationIndex = this.plateau.findOrientationIndex(this.orientation);

        if ('L' === command) {
            if (currentOrientationIndex === 0) {
                nextOrientationIndex = this.plateau.orientationOrder.length - 1;
            } else {
                nextOrientationIndex = currentOrientationIndex - 1;
            }
        } else {
            if (currentOrientationIndex === this.plateau.orientationOrder.length - 1) {
                nextOrientationIndex = 0;
            } else {
                nextOrientationIndex = currentOrientationIndex + 1;
            }
        }
        this.element.firstChild.className = 'camera camera-' + this.plateau.orientationOrder[nextOrientationIndex];
        this.orientation = this.plateau.orientationOrder[nextOrientationIndex];
    }

    /**
     * Commit Move to the next Facing grid
     */
    move() {
        let coordinates = this.getRoverCoordinates();

        if (coordinates.length !== 2) {
            alert('System Error. Wrong coordinate parsing!');
            return false;
        }
        let
            newX = coordinates[1],
            newY = coordinates[0],
            newId = this.plateau.gridIdPrefix;

        switch (this.plateau.orientationOrder[this.getCurrentOrientationIndex()]) {
            case 'N':
                newY++;
                break;
            case 'E':
                newX++;
                break;
            case 'S':
                newY--;
                break;
            case 'W':
                newX--;
                break;
        }
        newId += newY + '_' + newX;
        let newElement = document.getElementById(newId);

        if (null === newElement) {
            return false;
        }
        this.element.style.backgroundColor = 'transparent';
        let currentCamera = this.element.childNodes[0];
        newElement.appendChild(currentCamera);
        newElement.style.backgroundColor = this.roverBackgroundColor;
        this.element = newElement;
        this.xPosition = newX;
        this.yPosition = newY;

        return true;
    }

    /**
     * Returns Current Orientation Index
     *
     * @returns {number}
     */
    getCurrentOrientationIndex() {
        let currentOrientationIndex = 0;
        let currentClass = this.element.firstChild.className;

        let i = 0;
        while(i < this.plateau.orientationOrder.length) {
            if (currentClass.lastIndexOf(this.plateau.orientationOrder[i]) > 12) {
                currentOrientationIndex = i;
                break;
            }
            i++;
        }

        return currentOrientationIndex;
    }

    /**
     * Parse and return Rover Current Coordinates
     *
     * @returns {*}
     */
    getRoverCoordinates() {
        let currentElementId = this.element.id.replace(this.plateau.gridIdPrefix, '');
        return currentElementId.split('_');
    }
}