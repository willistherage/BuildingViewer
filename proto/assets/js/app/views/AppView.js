var BuildingAppView = BaseView.extend({
	
	//----------------------------------------
    // VARIABLES
    //----------------------------------------

    $container: null,
    stage: null,
    renderer: null,
    defaultWidth: 800,
    defaultHeight: 600,
    stats: null,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();
        
        _.bindAll(this, 'init', 'addListeners', 'removeListeners', 'onKeyPress', 'onUpdate', 'onResize');

        // Initializing animation frame
        AnimationFrame.init();

        // Grabbing reference to the container
        this.$container = $('#container');
        
        // Initializing 3D Scene
        
        this.stats = new Stats();
        this.stats.setMode( 2 );
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';

        document.body.appendChild( this.stats.domElement );

        this.addListeners();
	},

    //----------------------------------------
    // PRIVATE METHODS
    //----------------------------------------

    addListeners: function()
    {
        $(window).bind('resize', this.onResize);
        this.onResize();

        AnimationFrame.addListener(this.onUpdate);

        if (document.attachEvent)
        {
            document.attachEvent("onkeydown", this.onKeyPress);
        }
         else if (document.addEventListener)
        {
            document.addEventListener("keydown", this.onKeyPress, false);
        }

    },

    removeListeners: function()
    {
        $(window).unbind('resize', this.onResize);

        AnimationFrame.removeListener(this.onUpdate);

        if (document.detachEvent)
        {
            document.detachEvent("onkeydown", this.onKeyPress);
        }
         else if (document.removeEventListener)
        {
            document.removeEventListener("keydown", this.onKeyPress);
        }
    },

    //----------------------------------------
    // EVENT HANDLERS
    //----------------------------------------

    onKeyPress: function(event)
    {
        switch(event.keyCode)
        {
            case 32: //Space
                this.saveImage();
                break;
            case 38: //Up Arrow
                this.curves.incrementColor(1);
                break;
            case 40: //Down Arrow
                this.curves.incrementColor(-1);
                break;
            case 37: //Left Arrow
                //this.curves.shiftColors(-1);
                break;
            case 39: //Right Arrow
                //this.curves.shiftColors(1);
                break;
            default:
                break;
        }
    },

    onUpdate: function(delta, time)
    {
        this.stats.begin();
        this.stats.end();
    },

    onResize: function(event)
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

});