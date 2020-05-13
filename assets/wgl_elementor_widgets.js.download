(function( $ ) {
    "use strict";

    jQuery(window).on('elementor/frontend/init', function (){
        if ( window.elementorFrontend.isEditMode() ) {
            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-blog.default',
                function( $scope ){ 
                    labida_parallax_video();
                    labida_blog_masonry_init();
                    labida_carousel_slick(); 
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-blog-hero.default',
                function( $scope ){ 
                    labida_parallax_video();
                	labida_blog_masonry_init();
                	labida_carousel_slick(); 
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-carousel.default',
                function( $scope ){ 
                    labida_carousel_slick();  
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-portfolio.default',
                function( $scope ){ 
                    labida_isotope();
                    labida_carousel_slick();  
                    labida_scroll_animation();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-events.default',
                function( $scope ){ 
                    labida_isotope();
                	labida_carousel_slick();  
                    labida_scroll_animation();
                    labida_events_masonry_init();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-progress-bar.default',
                function( $scope ){ 
                    labida_progress_bars_init();  
                }
            ); 

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-testimonials.default',
                function( $scope ){ 
                	labida_carousel_slick();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-toggle-accordion.default',
                function( $scope ){ 
                    labida_accordion_init();  
                }
            ); 

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-team.default',
                function( $scope ){ 
                    labida_isotope();
                    labida_carousel_slick();  
                    labida_scroll_animation();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-tabs.default',
                function( $scope ){ 
                    labida_tabs_init();  
                }
            ); 

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-clients.default',
                function( $scope ){ 
                	labida_carousel_slick();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-image-layers.default',
                function( $scope ){ 
                	labida_img_layers();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-video-popup.default',
                function( $scope ){ 
                    labida_videobox_init();  
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-countdown.default',
                function( $scope ){ 
                	labida_countdown_init();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-time-line-vertical.default',
                function( $scope ){ 
                	labida_init_timeline_appear();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-striped-services.default',
                function( $scope ){ 
                	labida_striped_services_init();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-image-comparison.default',
                function( $scope ){ 
                	labida_image_comparison();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-counter.default',
                function( $scope ){ 
                	labida_counter_init();  
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-header-menu.default',
                function( $scope ){ 
                    labida_menu_lavalamp(); 
                    labida_ajax_mega_menu();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-header-search.default',
                function( $scope ){ 
                    labida_search_init(); 
                }
            );            
            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-header-side_panel.default',
                function( $scope ){ 
                    labida_side_panel_init(); 
                }
            );

        }
    });

})( jQuery );

