<?php
/**
 * Your code here.
 *
 */
/*Add custom js code*/
add_action('wp_footer', 'check_footer_bar');
function check_footer_bar()
{
  $hURL =  get_home_url();
  ?>
    <div id="img-foo-bar">
        <p>
            <img src="<?php echo $hURL ?>/wp-content/uploads/2020/04/stripe.png" alt="" class="img-footerbar" height="50">
            <img src="<?php echo $hURL ?>/wp-content/uploads/2020/04/mpesa.png" alt="" class="img-footerbar" height="50">
        </p>
    </div>
    <script type='text/javascript'>
      jQuery(document).ready(function() {
        var fileName = location.pathname.split("/");
        var imgFooter = document.getElementById("img-foo-bar");
        jQuery(".wf-float-right").append(imgFooter);
        
        jQuery( "h1:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "h2:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "h3:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "h4:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "h5:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "h6:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "span:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "p:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        jQuery( "a:contains('M-PayG')" ).css( "text-transform", "uppercase" );
        var span = jQuery("#main");
        span.html(span.html().replace(/M-PayG/, '<span style="text-transform: uppercase">$&</span>'));
      });
    </script>
<?php
}