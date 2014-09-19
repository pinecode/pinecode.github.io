$(function() {

    validateForm = function(data) {
        var messages = [],
            list;

        if (data.name == '') {
            messages.push('Please include a name we can use when getting back to you!');
        }

        if (data.email == '' && data.phone == '') {
            messages.push('An email address or phone number is required.');
        }

        if (messages.length > 0) {
            list = $('<ol></ol>');

            $.each(messages, function(i, message) {
                list.append($('<li>'+message+'</li>'));
            });

            // Success message
            $('#form-info').html("<div class='alert alert-danger'>");
            $('#form-info > .alert').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#form-info > .alert')
                .append("<p><strong>It looks like there's a problem with the form:</strong></p>");
            $('#form-info > .alert')
                .append(list);
            $('#form-info > .alert')
                .append('</div>');

            $('#form-info').show(200);

            return false;
        }

        return true;
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

        // If this returns false, we won't bother posting.
        valid = validateForm(data);

        if (!valid) {
            return;
        }

        $.post(
            url,
            data,
            null,
            'json'
        )
        .done(function() {
            ga('send', 'event', 'interaction', 'contact', 'get in touch', 1);

            // Success message
            $('#form-info').html("<div class='alert alert-success'>");
            $('#form-info > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#form-info > .alert-success')
                .append("Thank you "+firstName+"! Your message is sent and we'll get back to you soon.");
            $('#form-info > .alert-success')
                .append('</div>');

            $('#form-info').show(200);

            //clear all fields
            form.trigger('reset');
            form.slideUp(250);
        })
        .fail(function(jqXHR, status, error) {
            // Fail message
            $('#form-info').html("<div class='alert alert-danger'>");
            $('#form-info > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#form-info > .alert-danger').append('Sorry ' + firstName + ", it seems that the mail service isn't responding... Please try again later!");
            $('#form-info > .alert-danger').append('</div>');
        })
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#form-info').hide(200, function() {
        $(this).html('');
    });
});
