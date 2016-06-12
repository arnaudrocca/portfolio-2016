import 'TweenMax'
import 'scrollTo'
import Scene from './scene/scene'
import Curve from './lib/curve'

class App {

    /**
     * @constructor
     */
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();
        this.timer = 0;

        this.scene = new Scene(this.width, this.height);
        this.curves = new Array();

        for (let i = 0; i < 20; i++) {
            this.curves[i] = new Curve();
            this.scene.add(this.curves[i]);
        }

        const home = document.body.querySelector('.home_experiment');
        home.appendChild(this.scene.renderer.view);

        this.homeWorks = document.body.querySelector('.home_works');

        const workClass = document.getElementsByClassName('work');
        this.works = new Array();

        for (let i = 0; i < workClass.length; i++) {
            this.works.push(workClass[i]);
        }

        this.addListeners();

    }

    /**
     * @method
     * @name onClick
     * @description Triggered when the user clicks
     * @param {object} e - event
     */
    onClick(e) {

        const event = e || window.e;

        switch (event.target.className) {
            case 'about_title':
                document.body.querySelector('.about').classList.add('active');
                window.addEventListener('keydown', this.onKeyDown.bind(this));
                break;

            case 'about_cross':
                document.body.querySelector('.about').classList.remove('active');
                window.removeEventListener('keydown', this.onKeyDown);
                break;

            case 'home_works_title':
                TweenMax.to(window, 1.2, {scrollTo: {y: this.height}, ease: Quint.easeOut});
                break;

            default:
                break;
        }

    }

    /**
     * @method
     * @name onScroll
     * @description Triggered when the user scrolls
     */
    onScroll() {

        if (this.width >= 612) {
            for (let work of this.works) {
                if (work.getBoundingClientRect().top <= this.height / 1.5 && work.getBoundingClientRect().bottom >= this.height / 2) {
                    work.classList.add('active');
                } else {
                    work.classList.remove('active');
                }
            }
        }

        if (this.homeWorks.getBoundingClientRect().bottom <= this.height / 1.2) {
            this.homeWorks.classList.add('hide');
        } else {
            this.homeWorks.classList.remove('hide');
        }

    }

    /**
     * @method
     * @name resize
     * @description Triggered when the window is resized
     */
    resize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        for (let curve of this.curves){
            curve.resize(this.width, this.height);
        }

        this.scene.resize(this.width, this.height);

        if (this.width < 612) {
            for (let work of this.works) {
                work.classList.add('active');
            }
        }

    }

    /**
     * @method
     * @name onKeyDown
     * @description Triggered a key is pressed
     * @param {object} key
     */
    onKeyDown(key) {

        if (key.keyCode == 27) {
            document.body.querySelector('.about').classList.remove('active');
        }

    }

    /**
    * @method
    * @name addListeners
    */
    addListeners() {

        window.addEventListener('click', this.onClick.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.resize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));

    }

    /**
    * @method
    * @name update
    * @description Triggered on every TweenMax tick
    */
    update() {

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        this.timer += this.DELTA_TIME / 1000;

        for (let i in this.curves) {
            this.curves[i].update(this.timer + i / 10, i);
        }

        this.scene.render();

    }

}

export default App
