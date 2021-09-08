"use strict";

const fs = require("fs");
const imageSize = require("image-size");
const Size = require("./size.js");

const dataKey = Symbol.for("data");

class Image {
    constructor(data) {
        Object.defineProperty(this, dataKey, {
            value: data,
            enumerable: false,
            writable: false
        });

        const dimensions = imageSize(data);

        Object.defineProperty(this, "size", {
            value: new Size(dimensions.width, dimensions.height),
            enumerable: true,
            writable: false
        });
    }
}

module.exports = {
    fromFile: function (filePath) {
        try {
            return new Image(fs.readFileSync(filePath));
        } catch {
            return null;
        }
    },

    fromData: function (data) {
        try {
            return new Image(data[dataKey]);
        } catch {
            return null;
        }
    }
};