$(document).ready(function() {
    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('.input-group-prepend i').addClass("fa-eye-slash");
            $('.input-group-prepend i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('.input-group-prepend i').removeClass("fa-eye-slash");
            $('.input-group-prepend i').addClass("fa-eye");
        }
    });
});