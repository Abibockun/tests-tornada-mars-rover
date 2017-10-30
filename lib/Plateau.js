'use strict';

/**
 * Plateau Class
 */
class Plateau {
    /**
     * Plateau Constructor
     *
     * @param {int} width
     * @param {int} height
     */
    constructor(width, height) {
        this.plateauId = 'plateau';
        this.gridItemClass = 'grid';
        this.gridIdPrefix = 'grid-';
        this.gridItemSize = 50; // Size in px
        this.gridItemBorderSize = 1; // Size in px
        this.width = width;
        this.height = height;
        this.orientationOrder = ['N', 'E', 'S', 'W'];
    }

    /**
     * Drawing Plateau Grid
     */
    drawGrid() {
        let plateauHTML = '';
        let currentX = 0;
        let currentY = 0;
        for(let yi = this.height; yi >= 1 ; yi--) {
            currentX = 0;
            for(let xi = 1; xi <= this.width ; xi++) {
                plateauHTML +=
                    '<div ' +
                    'id="'+this.gridIdPrefix+yi+'_'+xi+'" ' +
                    'class="'+this.gridItemClass+'" ' +
                    'style="top:'+currentY+'px;left:'+currentX+'px;"></div>';

                currentX += this.gridItemSize + this.gridItemBorderSize;
            }
            currentY += this.gridItemSize + this.gridItemBorderSize;
        }

        let actualHeight = this.height * this.gridItemSize + this.height * this.gridItemBorderSize;
        document.getElementById(this.plateauId).style.height = actualHeight+'px';

        let actualWidth = this.width * this.gridItemSize + this.width * this.gridItemBorderSize;
        document.getElementById(this.plateauId).style.width = actualWidth+'px';

        document.getElementById(this.plateauId).innerHTML = plateauHTML;
    }

    /**
     * Finds Orientation Index
     *
     * @param {string} orientation
     * @returns {number}
     */
    findOrientationIndex(orientation) {
        let currentOrientationIndex = 0;
        let i = 0;
        while(i < this.orientationOrder.length) {
            if (this.orientationOrder[i] === orientation.toUpperCase()) {
                return i;
            }
            i++;
        }
        return currentOrientationIndex;
    }

    /**
     * Deploy Rover to the Plateau
     *
     * @param rover
     * @param counter
     * @returns {*}
     */
    addRover(rover, counter) {
        this.counter = counter;
        let coordinateId = this.gridIdPrefix + rover.yPosition.toString() + '_' + rover.xPosition.toString();
        let roverElement = document.getElementById(coordinateId);

        if (null === roverElement) {
            return false;
        }

        let camera = document.createElement('span');
        camera.className = 'camera camera-'+rover.orientation.toUpperCase();
        camera.setAttribute('id', this.gridIdPrefix + this.counter);
        roverElement.appendChild(camera);
        roverElement.style.backgroundColor = rover.roverBackgroundColor;
        rover.element = roverElement;

        return rover.element;
    }
}