( function(  ) {

    'use strict';

    const defaults = {
        menuSpeedAnimate:             600,
        pageNavigationSpeedAnimate:   1500,
        btnClassMenu:                 'btn-menu',
        stickyMenu:                   false,
        stickyMenuClassName:          'fixed',
        slidingLine:                  false,
        slidingLineClassName:         'sliding-line',
        slidingLineClassNameActive:   'active',
        slidingLineColor:             '#ffffff',
        slidingLineHeight:            '3px',
        slidingLineSpeedAnimate:      200,
        winMobWidth:                  500,
        trackedClassName:             'tracked'
    };

    class Tools {
        static getMaxOfArray( arr ) {

            return Math.max.apply( null, arr );

        }

        static getKeyByValue( obj, value ) {

            for ( let prop in obj ) {
                if ( obj.hasOwnProperty( prop ) ) {
                    if ( obj[ prop ] === value ) {
                        return prop;
                    }
                }
            }

        }
    }

    class SimpleMenu {

        constructor( options ) {
            options = options || { };
            this._config = Object.assign({ }, defaults, options);

        }

        _prepareClasses( ) {

        }

        _prepareSimpleMenuStyles( ) {

        }

        _scrollSpy( ) {

        }



        start( ) {

            let conf = this._config;

            this._prepareClasses();
            this.initSimpleMenu();
            this._prepareSimpleMenuStyles();

            conf.stickyMenu && this.initStickyMenu( );
            conf.slidingLine && this.initSlidingLine( );

        }

        initSimpleMenu( ) {

        }

        initStickyMenu( ) {

        }

        initSlidingLine( ) {

        }
    }




} )( );