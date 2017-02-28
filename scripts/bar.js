(function($){
    var $bar = $('#bar');
    var $target = $('.target');
    var $currentStatus = $('.current-status');
    var $currentStatusValue = $('.current-status span');
    var $label = $('#label');
    var $labelValue = $('#label span');
    var currentValue = 0;
    var targetValue = 15;

    $.getJSON('http://alex.devel.softservice.org/testapi/', function(data){
        // get initialValue
        var initialValue = data['balance_usd'];
        var interval = setInterval(step, 2000);
        function step(){
            // When bar filled
            if (currentValue >= initialValue) {
                clearInterval(interval);
                // If we have initial value more then our target
                if ( initialValue >= targetValue ) {
                    // Change background of target and add text of success
                    $target.addClass('full-bar');
                    $currentStatus.text('We get enough! ($' + initialValue + ')')
                }
                // Change status text to how many we still need
                else {
                    $currentStatusValue.text('$' + Math.round(targetValue - currentValue));
                }
                // add label of current initial value under bar
                if (initialValue < targetValue) {
                    $labelValue.text('$' + Math.round(initialValue));
                    $label.addClass('show')
                }
                // show status text
                $currentStatus.show();
            }
            // Bar progression
            else {
                currentValue += 0.2;
                var barWidth = currentValue * (100/targetValue);
                if (barWidth >= 100) {
                    barWidth = 100
                }
                $bar.css('width', barWidth + '%');
                $label.css('left', barWidth + '%');
            }
        }
   });

})(jQuery);