/*
 * EaselJS TextArc for drawing curved text
 *
 * Copyright (c) 2014 Periscopic
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * This plugin was based on:
 * - https://github.com/lucor/easeljs-textarc
 * Which was inspired by:
 * - http://www.html5canvastutorials.com/labs/html5-canvas-text-along-arc-path
 * - http://tympanus.net/codrops/2012/01/24/arctext-js-curving-text-with-css3-and-jquery
 * - https://github.com/CreateJS/EaselJS/blob/master/examples/TextLink.html
 *
 */

/*
    TextArc api:
    var text = new createjs.TextArc(textString, textFont, textColor, radiusOfCurveCircle, angleOfCurveCenterPoint = - Math.PI / 2);
*/

define(["createjs"], function(createjs) {

    // define a new TextArc class that extends Text.
    var TextArc = function(text, font, color, radius, angle) {
        // default angle is 90deg
        if (angle === undefined) angle = - Math.PI / 2;
        this.initialize(text, font, color, radius, angle);
    }

    TextArc.prototype = new createjs.Text(); // extend Text.

    // save base class initialize method
    TextArc.prototype.Text_initialize = TextArc.prototype.initialize;

    // overwrite initialize
    TextArc.prototype.initialize = function(text, font, color, radius, angle) {
        this.Text_initialize(text, font, color);
        this.textAlign = "center"; // this makes letter positioning math easier
        this.radius = radius;
        this.angle = angle;
    }

    // use the same approach with drawTextLine:
    TextArc.prototype.Text_drawTextLine = TextArc.prototype._drawTextLine;

    //Override _drawTextLine method
    TextArc.prototype._drawTextLine = function(ctx, text, y) {
        var wordWidth = ctx.measureText(text).width,
            arcAngle = wordWidth / this.radius,
            ang = -arcAngle / 2; // 2PI * (w / (2r * PI))

        ctx.save();
        // angle = 0 will curve text around circle as if its center was at 0 radians
        ctx.rotate(this.angle + Math.PI / 2);
        var letter, letterWidth;
        for (var i = 0; i < text.length; i++) {
            letter = text[i];
            letterWidth = ctx.measureText(letter).width;
            ang += (letterWidth / wordWidth) * arcAngle * 0.5;

            ctx.save();
            ctx.translate(0, this.radius);
            ctx.rotate(ang);
            ctx.translate(0, -this.radius);
            this.Text_drawTextLine(ctx, text[i], y);
            ctx.restore();

            ang += (letterWidth / wordWidth) * arcAngle * 0.5;
        }
        ctx.restore();
    }

    createjs.TextArc = TextArc;

    return createjs;
});