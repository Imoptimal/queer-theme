<?php
/**
 * Queer OOP
 *
 * @link https://wordpress.org
 *
 * @package Queer
 */

// Prevent direct access to the file for security
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'Queer_Theme_Setup' ) ) :

    class Queer_Theme_Setup {

        /**
         * Constructor: Hooks all core theme actions.
         */
        public function __construct() {
            add_action( 'after_setup_theme', array( $this, 'theme_setup' ) );
            add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
            add_shortcode( 'current_year', array( $this, 'get_current_year' ) );
            add_filter( 'render_block', array( $this, 'append_developer_credits' ), 10, 2 );
        }

        /**
         * Core theme configuration and support rules.
         */
        public function theme_setup() : void {
            // Enable FSE
            add_theme_support( 'block-templates' );
            // Enable block editor styles to match backend with frontend layout
            add_theme_support( 'editor-styles' );
            // Load translation text-domain for internationalization
            load_theme_textdomain( 'my-custom-theme', get_template_directory() . '/languages' );
        }

        /**
         * Handles enqueueing frontend scripts and stylesheets.
         */
        public function enqueue_assets() : void {
             // Enqueue the main style.css file from the theme root
            wp_enqueue_style( 
                'queer-main-styles',                  
                get_stylesheet_uri(),                      
                array(),                                    
                wp_get_theme()->get( 'Version' )
            );
            // Enqueue Custom Frontend JavaScript File
            wp_enqueue_script(
                'queer-frontend-js',                                    
                get_template_directory_uri() . '/assets/js/frontend.js',
                array(),                                                        
                wp_get_theme()->get( 'Version' ),                               
                array(
                    'strategy'  => 'defer',                                     
                    'in_footer' => true,                                        
                )
            );
        }

        /**
         * Prints current year in the footer dinamically
         */
        public function get_current_year() : string {
            return date( 'Y' );
        }

         /**
         * Adds "Made by Imoptimal" at the bottom of the page (in footer)
         */
        public function append_developer_credits( string $block_content, array $block ) : string {
            if ( isset( $block['attrs']['slug'] ) && 'footer' === $block['attrs']['slug'] ) {
                $developer_html = '<p class="has-text-align-center developer-credits" style="font-size: 0.85rem; opacity: 0.8; margin-top: 0.5rem;">';
                $developer_html .= 'Made by <a href="https://imoptimal.com" target="_blank" rel="nofollow">Imoptimal</a>';
                $developer_html .= '</p>';
                $block_content = str_replace( '</footer>', $developer_html . '</footer>', $block_content );
            }

            return $block_content;
        }
    }

    // Initialize the theme class instance
    new Queer_Theme_Setup();

endif;