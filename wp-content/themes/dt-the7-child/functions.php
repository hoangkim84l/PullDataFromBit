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
      });
    </script>
<?php
}