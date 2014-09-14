$(function() {

    validateForm = function(data) {
        messages = [];

        if (data.name == '' || data.name == undefined) {
            console.log('lol');
        }

        return;
    }

    $('#contactForm').submit(function(event) {
        event.preventDefault();
        var form = $(this),
            url = form.attr('action'),
            data = {
                name: $("input#name", form).val(),
                phone: $("input#phone", form).val(),
                email: $("input#email", form).val(),
                message: $("textarea#message", form).val()
            },
            firstName = data.name;

        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
            firstName = name.split(' ').slice(0, -1).join(' ');
        }

        // If this fails,
        validateForm(data);

        $.post(
            url,
            data,
            null,
            'json'
        )
        .done(function() {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>Thank you "+firstName+"! Your message is sent and we'll get back to you soon.</strong>");
            $('#success > .alert-success')
                .append('</div>');

            $('#success').show(200);

            //clear all fields
            $('#contactForm').trigger('reset');
        })
        .fail(function(jqXHR, status, error) {
            console.log(jqXHR, status, error);
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that the mail service isn't responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');
        })
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').hide(200, function() {
        $(this).html('');
    });
});
