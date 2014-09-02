/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeOut');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

/**
 * Parallax effect for the header.
 */
var header,
    headerPos,
    grid,
    gridPos,
    nav,
    navShrinkPoint = 300,
    navShrink = false;
    lastPosition = -1;

// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             // IE Fallback, you can even fallback to onscroll
             function(callback){ window.setTimeout(callback, 1000/60) };

// Assign the elements
header = $('header');
grid = $('header .grid-bg');
nav = $('nav');
headerContent = $('header .parallax');

function loop() {
    var top = window.pageYOffset;

    // Avoid calculations if not needed
    if (lastPosition == window.pageYOffset) {
        scroll(loop);
        return false;
    }

    lastPosition = window.pageYOffset;

    headerPos = 50 + (top * 0.075)+'%';
    gridPos   = 50 + (top * 0.25);

    headerContentOpacity = (100 - ((top / 300) * 100)) / 100;

    header.css('background-position-y', headerPos);
    grid.css('transform', 'translate(0, '+gridPos+'px)');
    console.log("grid.css('transform:', 'translate(0, '"+gridPos * 5+"'px)'");


    headerContent.css({
        opacity: headerContentOpacity,
    });

    // Toggle the navShrink class
    if (top > navShrinkPoint && !navShrink) {
        nav.addClass('navbar-shrink');
        navShrink = true;
    }

    if (top < navShrinkPoint && navShrink) {
        nav.removeClass('navbar-shrink');
        navShrink = false;
    }

    // Recall the loop
    scroll(loop)
}

// Call the loop for the first time
loop();

// Apply headroom to the nav element
headroomNav = document.querySelector('nav');
// construct an instance of Headroom, passing the element
var headroom = new Headroom(headroomNav, {
    tolerance: {
        up: 10,
        down: 10
    }
});

// initialise
headroom.init();
