(function($){
    $.getJSON('http://alex.devel.softservice.org/testapi/', function(data){
        var balanceUSD = data['balance_usd'];
        var $bar = $('#bar');
        var $target = $('.target');
        var $currentStatusBox = $('.current-status');
        var $currentStatus = $('.current-status span');
        var $label = $('#label');
        var currentUSD = 0;
        var targetUsd = 15;
        var interval = setInterval(step, 2000);
        function step(){
            if (currentUSD >= balanceUSD) {
                clearInterval(interval);
                if ( balanceUSD >= targetUsd ) {
                    $target.addClass('full-bar');
                    $currentStatusBox.text('We get enough! ($' + balanceUSD + ')');
                } else {
                    $currentStatus.text('$' + Math.round(targetUsd - currentUSD));
                }
                if (balanceUSD < targetUsd) {
                    $('#label span').text('$' + balanceUSD);
                    $label.addClass('show');
                }
                $currentStatusBox.show();
            } else {
                currentUSD += 0.2;
                var barWidth = currentUSD * (100/targetUsd);
                if (barWidth >= 100) {
                    barWidth = 100
                }
                $bar.css('width', barWidth + '%');
                $label.css('left', barWidth + '%');
            }
        }
   });
})(jQuery);