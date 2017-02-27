(function($){
    var $bar = $('#bar');
    var $target = $('.target');
    var $currentStatus = $('.current-status');
    var $currentStatusValue = $('.current-status span');
    var $label = $('#label');
    var $labelValue = $('#label span');
    var currentUSD = 0;
    var targetUSD = 15;

    $.getJSON('http://alex.devel.softservice.org/testapi/', function(data){
        // get initialValue
        var initialValue = data['balance_usd'];
        var interval = setInterval(step, 2000);
        function step(){
            // When bar filled
            if (currentUSD >= initialValue) {
                clearInterval(interval);
                // If we have initial value more then our target
                if ( initialValue >= targetUSD ) {
                    // Change background of target and add text of success
                    $target.addClass('full-bar');
                    $currentStatus.text('We get enough! ($' + initialValue + ')')
                }
                // Change status text to how many we still need
                else {
                    $currentStatusValue.text('$' + Math.round(targetUSD - currentUSD));
                }
                // add label of current initial value under bar
                if (initialValue < targetUSD) {
                    $labelValue.text('$' + Math.round(initialValue));
                    $label.addClass('show')
                }
                // show status text
                $currentStatus.show();
            }
            // Bar progression
            else {
                currentUSD += 0.2;
                var barWidth = currentUSD * (100/targetUSD);
                if (barWidth >= 100) {
                    barWidth = 100
                }
                $bar.css('width', barWidth + '%');
                $label.css('left', barWidth + '%');
            }
        }
   });

})(jQuery);