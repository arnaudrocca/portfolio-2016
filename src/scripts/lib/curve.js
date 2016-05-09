import { Graphics } from 'pixi.js'

class Curve extends Graphics {

    /**
     * @constructor
     */
    constructor() {

        super();

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.setSize();

    }

    /**
	 * @method
	 * @name setSize
	 */
    setSize() {

        this.centerX = this.windowWidth / 2;
        this.centerY = this.windowHeight / 2;

        this.points = {
            start: {
                x: -this.windowWidth / 10,
                y: this.centerY
            },
            control1: {
                x: this.centerX,
                y: this.centerY
            },
            control2: {
                x: this.centerX,
                y: this.centerY
            },
            end: {
                x: this.windowWidth * 11 / 10,
                y: this.centerY
            }
        }

    }

    /**
	 * @method
	 * @name resize
	 * @description Resize the scene according to screen size
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
    resize(newWidth, newHeight) {

        this.windowWidth = newWidth;
        this.windowHeight = newHeight;

        this.setSize();

    }

    /**
     * @method
     * @name update
     * @description Triggered on every TweenMax tick
     * @param {number} timer
     * @param {number} id
     */
    update(timer, id) {

        this.clear();

        this.strengthX = this.windowWidth / 5;
        this.strengthY = Math.min(this.windowWidth, this.windowHeight) / 2;

        // CONTROL 1
        this.points.control1.x = this.centerX + Math.sin(timer) * this.strengthX;
        this.points.control1.y = this.centerY + Math.cos(timer) * this.strengthY;
        // CONTROL 2
        this.points.control2.x = this.centerX + Math.sin(timer) * this.strengthX;
        this.points.control2.y = this.centerY - Math.cos(timer) * this.strengthY;

        // CURVE
        this.lineStyle(3, 0x3333FF, (id / 10));
        this.moveTo(this.points.start.x, this.points.start.y); // START
        this.bezierCurveTo(
            this.points.control1.x, this.points.control1.y, // CONTROL 1
            this.points.control2.x, this.points.control2.y, // CONTROL 2
            this.points.end.x, this.points.end.y); // END

    }

}

export default Curve
