define(["./balance", "./d3.min", "css!./QSenseGauge.css"],
    function(template) {
        return {
            paint: function($element, layout) {

                var width = $element.width();
                var height = $element.height();

                var id = "container_" + layout.qInfo.qId;

                if (document.getElementById(id)) {
                    $("#" + id).empty();
                } else {
                    $element.append($('<div />').attr("id", id).attr("class", "viz").width(width).height(height));
                }



                // input data
                var arraySide1 = [0, 1, 1, 1, 0, 1 ,0]
                var arrayLabel1 = ["Advice", "Waiting Time", "Service", "Explanation", "Atmosphere", "Welcome", "Farewell"]
                Balance.addBoxes(arraySide1, arrayLabel1);

                //recup des données
                var hc = layout.qHyperCube;
                //recup de la zone d'affichage
                var div = document.getElementById(id);

                // kick off
                Balance.render(div);
            };
        };
    }
);