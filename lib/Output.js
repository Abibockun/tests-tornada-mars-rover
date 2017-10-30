'use strict';

class Output {
    constructor(width, height) {
        this.name = 'Output';
        this.outputId = 'output';
        this.outputLog = '';
    }

    print(type, content, separator = "<br>") {
        var outputHTML = document.getElementById(this.outputId).innerHTML;

        outputHTML += '['+type+'] '+content + separator;

        document.getElementById(this.outputId).innerHTML = outputHTML;
    }
};