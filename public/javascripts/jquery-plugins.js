(function() {
    if ( !window.$ || !$ || !$.fn) {
        return;
    }

    /**
     * Implement the functionality as a jQuery plugin.
     * @param {string} message The message to be displayed.
     * @param {string} messageType The type of message (error or success)
     */
    $.fn.controlMessage = function(message, messageType) {
        var $span = this
                    .parentsUntil(null, '.form-group')
                    .find('.error-message');

        // console.log('This', this);
        // console.log('Span', $span, $span[0]);

        // If no arguments are supplied, interpret it as 
        // clearing the message.
        if ( arguments.length === 0 ) {
           $span
               .removeClass('error')
               .removeClass('success')
               .html('');
        } else {
           $span
               .addClass(messageType)
               .html(message);
        }
        
        // Return `this`; the jQuery object
        return this;
    };
})();