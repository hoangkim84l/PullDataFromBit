<?php
/**
 * Your code here.
 *
 */
/*Add custom js code*/
//add new class when user not login
add_action('wp_footer', 'check_footer_bar');
function check_footer_bar()
{
  global $wp;
  ?>
    <div id="img-foo-bar">
        <p>
            <img src="wp-content/uploads/2020/04/stripe.png" alt="" class="img-footerbar" height="50">
            <img src="wp-content/uploads/2020/04/mpesa.png" alt="" class="img-footerbar" height="50">
        </p>
    </div>
<script type='text/javascript'>
  jQuery(document).ready(function() {
      var imgFooter = document.getElementById("img-foo-bar");
      jQuery(".wf-float-right").append(imgFooter);
  });
</script>
<?php
}