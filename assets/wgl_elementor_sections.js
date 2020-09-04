( function( $, window ) {
    'use strict';
    $(window).on('elementor/frontend/init', function (){

        function WglSectionParallax( $scope ){
            $scope.WglSectionParallaxInit();
            $scope.WglSectionShapeDividerInit();
        }

        window.elementorFrontend.hooks.addAction( 'frontend/element_ready/section', WglSectionParallax);

    });

    // Add Wgl Parallax Section
    $.fn.WglSectionParallaxInit = function( options ){
        var defaults = {};
        
        return this.each(function( ) {

            var self = $(this),
            wglParallax = {
                editorMode: window.elementorFrontend.isEditMode(),
                itemId: $(this).data('id'),
                options: false,
                globalVars: 'add_background_animation',
                backEndVars: null,
                items: [],
            };

            var init = function() {
                setParallaxItem();
            },
            setParallaxItem = function(){
                var settings;

                var checkEnabledParallax = parallaxEffectEnabled();

                if(!checkEnabledParallax){
                    return;
                }

                if ( ! wglParallax.editorMode ) {
                    settings = buildFrontParallax();
                } else {
                    settings = buildBackendParallax();
                }

                if ( ! settings ) {
                    return;
                }

                build( settings );
                hideMobile();

            },
            parallaxEffectEnabled = function(){
                var settings = {};

                if ( ! wglParallax.editorMode ) {
                    settings = wgl_parallax_settings[0][wglParallax.itemId];
                    
                    if(!settings){
                        return;
                    }
                    
                    if(!settings.hasOwnProperty(wglParallax.globalVars) || !settings[wglParallax.globalVars]){
                        return;
                    }
                }else{      
                    if(!window.elementor.elements){
                        return;
                    }

                    if(!window.elementor.elements.models){
                        return;
                    }
 
                    window.elementor.elements.models.forEach(function( value ){
                        if ( wglParallax.itemId == value.id ) {
                            wglParallax.backEndVars = value.attributes.settings.attributes;
                        }
                    });

                    if(!wglParallax.backEndVars){
                        return;
                    }

                    if(!wglParallax.backEndVars.hasOwnProperty(wglParallax.globalVars) || !wglParallax.backEndVars[wglParallax.globalVars]){
                        return;
                    } 

                    settings = wglParallax.backEndVars;
                }

                return settings;
            },
            buildFrontParallax = function() {
                var settings = wgl_parallax_settings[0][wglParallax.itemId];
                settings = settings['items_parallax']; 
                return settings;
            },
            buildBackendParallax = function() {

                if(!window.elementor.elements.models){
                    return;
                }

                var arr = [];

                if ( ! wglParallax.backEndVars.hasOwnProperty( 'items_parallax' ) ) {
                    return false;
                }

                wglParallax.backEndVars[ 'items_parallax' ].models.forEach(function( value ){
                    arr.push( value.attributes );
                });

                return arr;
            },
            appendElement = function( settings ) {
                var node_str = '';

                if(settings.image_bg.url){
                    node_str  = '<div data-item-id="' + settings._id + '" class="extended-parallax elementor-repeater-item-' + settings._id + '">'; 
                    node_str += '<img  src="' + settings.image_bg.url + '"/>';
                    node_str += '</div>';                    
                }

                if( !$(self).find( '.elementor-repeater-item-'+settings._id ).length > 0 ){
                    $(self).append(node_str);                  
                }

                wglParallax.items.push(settings);
    
                var item = jQuery(self).find('.extended-parallax');
                if (item.length !== 0 ) {
                    item.each( function() {
                        if(settings._id == jQuery(this).data('itemId')){
                            if(settings.image_effect == 'mouse'){
                                if(!jQuery(this).closest('.elementor-section').hasClass('wgl-parallax-mouse')){
                                    jQuery(this).closest('.elementor-section').addClass('wgl-parallax-mouse');
                                }
                                
                                jQuery(this).wrapInner('<div class="wgl-parallax-layer layer" data-depth="' + settings.parallax_factor + '"></div>');                                
                            }else if( settings.image_effect == 'scroll' ){
                                if( wglParallax.editorMode ){
                                    jQuery(this).paroller({  
                                        factor: settings.parallax_factor,       
                                        type: 'foreground',     // background, foreground  
                                        direction: settings.parallax_dir, // vertical, horizontal  
                                            
                                    });  
                                    jQuery(this).css({'transform' : 'unset'});
                                }else{
                                    jQuery(this).paroller({  
                                        factor: settings.parallax_factor,         
                                        type: 'foreground',     // background, foreground  
                                        direction: settings.parallax_dir, // vertical, horizontal  
                                        
                                    });  
                                }                                
                            }else if( settings.image_effect == 'css_animation' ){
                                var self = $(this);
                                
                                if(self.is_visible()){
                                     self.addClass( settings.animation_name );
                                }
                                jQuery(window).on('resize scroll', function() {
                                    if(self.is_visible()){
                                      self.addClass( settings.animation_name );
                                    }
                                });
                            }
                        }
                    });

                    if(settings.image_effect == 'mouse'){
                        jQuery('.wgl-parallax-mouse').each(function(){
                            var scene = jQuery(this).get(0);
                            var parallaxInstance = new Parallax(scene, { hoverOnly: true, selector: '.wgl-parallax-layer', pointerEvents: true }); 
                        });                          
                    }
                }
            },
            hideMobile = function(){
                if(wglParallax.items){
                    $.each( wglParallax.items, function( index, value ) {        
                        if(value.hide_on_mobile){
                            if (jQuery(window).width() <= value.hide_mobile_resolution) {
                                jQuery('.extended-parallax[data-item-id="'+ value._id +'"]').css({ 'opacity' : '0', 'visibility' : 'hidden' });
                            }else{
                                jQuery('.extended-parallax[data-item-id="'+ value._id +'"]').css({ 'opacity' : '1',  'visibility' : 'visible' });
                            }                            
                        }
                    });  
                }
            },
            build = function( settings ) {
                $.each( settings, function( index, value ) {
                    appendElement(value);
                });


            };

            /*Init*/
            init();

            jQuery( window ).resize(
                function() {
                    hideMobile();
                }
            );
        });   
    };

    // Add Wgl Shape Divider
    $.fn.WglSectionShapeDividerInit = function( options ){
        var defaults = {};
        
        return this.each(function( ) {

            var self = $(this),
            wglShapeDivider = {
                editorMode: window.elementorFrontend.isEditMode(),
                itemId: $(this).data('id'),
                options: false,
                globalVars: 'add_shape_divider',
                backEndVars: [],
                items: [],
            };

            var init = function() {
                setShapeDividerItem();
            },
            setShapeDividerItem = function(){
                var settings;

                var checkEnabledParallax = ShapeDividerEnabled();

                if(!checkEnabledParallax){
                    return;
                }

                if ( ! wglShapeDivider.editorMode ) {
                    settings = buildFrontShapeDivider();
                } else {
                    settings = buildBackendShapeDivider();
                }

                if ( ! settings ) {
                    return;
                }

                build( settings );

            },
            ShapeDividerEnabled = function(){
                var settings = {};

                if ( ! wglShapeDivider.editorMode ) {
                    settings = wgl_parallax_settings[0][wglShapeDivider.itemId];
                    
                    if(!settings){
                        return;
                    }
                    
                }else{      
                    if(!window.elementor.elements){
                        return;
                    }

                    if(!window.elementor.elements.models){
                        return;
                    }

                    window.elementor.elements.models.forEach(function( value ){
                        if ( wglShapeDivider.itemId == value.id ) {
                            wglShapeDivider.backEndVars[wglShapeDivider.itemId] = value.attributes.settings.attributes;
                            settings = value.attributes.settings.attributes;
                        }
                    } );
                }

                return settings;
            },
            buildFrontShapeDivider = function() {
                var settings = wgl_parallax_settings[0];
                return settings;
            },
            
            buildBackendShapeDivider = function() {

                if(!window.elementor.elements.models){
                    return;
                }

                var arr = [];

                arr = wglShapeDivider.backEndVars;

                return arr;
            },
            
            getSvgURL = function(fileName) {
                var svgURL = wgl_parallax_settings.svgURL + fileName + '.svg';

                return svgURL;
            },

            appendElement = function(settings ) {

                var $item = settings[$(self).data('id')];

                if(!$item){
                    return;
                }

                var node_str = '',
                svgURL = '';
                
                if( $item.wgl_shape_divider_top !== '' ){
                    
                    svgURL = getSvgURL( $item.wgl_shape_divider_top );
                    
                    node_str  = '<div class="wgl-divider wgl-elementor-shape wgl-elementor-shape-top"></div>'; 
                    $(self).prepend(node_str); 
                    
                    jQuery.get(svgURL, function (data) {
                        $(self).find('.wgl-divider.wgl-elementor-shape-top').empty().append(data.childNodes[0]);
                    });                 
                }    

                if( $item.wgl_shape_divider_bottom  !== ''  ){

                    svgURL = getSvgURL( $item.wgl_shape_divider_bottom );

                    node_str  = '<div class="wgl-divider wgl-elementor-shape wgl-elementor-shape-bottom"></div>'; 
                    $(self).prepend(node_str); 

                    jQuery.get(svgURL, function (data) {
                        $(self).find('.wgl-divider.wgl-elementor-shape-bottom').empty().append(data.childNodes[0]);
                    });  
                }                        
            },
            
            build = function( settings ) {
                appendElement(settings);
            };

            /*Init*/
            init();

        });   
    };

}( jQuery, window ) );

