<?php

/**
 * Plugin Base Sub-Class
 *
 * Peter's Plugins Foundation 04
 *
 * @package    PPF04
 * @author     Peter Raschendorfer
 * @license    GPL2+
 */
 
if ( !class_exists( 'PPF04_SubClass' ) ) {
  
  
  abstract class PPF04_SubClass extends PPF04_Class {
    
    /**
     * reference to core class
     *
     * @since  PPF01
     * @var    object
     * @access protected
     * was private prior to PPF04
     */
    protected $_core;
    
    
    /**
     * reference to settings class
     *
     * @since  PPF01
     * @var    object
     * @access protected
     * was private prior to PPF04
     */
    protected $_settings;
    
    
    /**
	   * Init the Class 
     *
     * @since PPF01
     * @access public
     */
    public function __construct( $_core, $_settings = false ) {
      
      parent::__construct();
      
      $this->_core = $_core;
      $this->_settings = $_settings;
      
      $this->init();
      
    }
    
    
    /**
     * Sub-Class init
     *
     * force to be defined
     *
     * @since PPF01
     */
    abstract public function init();
    
    
    /**
	   * get core class
     *
     * @since  PPF01
     * @access public
     * @return object
     */
    public function core() {
      
      return $this->_core;
      
    }
    
    
    /**
	   * get settings class
     *
     * @since  PPF01
     * @access public
     * @return object
     */
    public function settings() {
      
      return $this->_settings;
      
    }
    
  }
  
}