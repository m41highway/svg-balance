(function (window){

    function defineBalance(){
        var Balance = {};
        var boxes = [];


        /**
         * Default parameter
         */
        var W = 500; // width of SVG
        var H = 500; // width of SVG
        var backgroundColor = "#F2FFDF"; // light green 
        var pivotColor = "grey";
        var pivotLineColor = "#C9F0D6";
        var levelColor = "grey";
        var levelInclination = "5";
        var boxWidth = W * 6 / 25; // 120
        var boxHeight = H / 10;
        var space = boxWidth / 2; // the space remaining on each side of the level
        var zoomRatio = 1 * W / 500;
        var labelInden = 60 * zoomRatio;
        var textDisplacement = 20 * zoomRatio;
        var fontFamily = "sans-serif";
        var fontSize =  H / 25 + "px";  //"20px"
        var fontColor = "black";        
        var wordColor = [  
            {"label": "Advice", "color": "red"},
            {"label": "Waiting Time", "color": "blue"},
            {"label": "Service", "color": "yellow"},
            {"label": "Explanation", "color": "green"},
            {"label": "Atmosphere", "color": "purple"},
            {"label": "Welcome", "color": "pink"},
            {"label": "Farewell", "color": "orange"}            
        ];

        /**
         * configure Svg canvas size
         */
        Balance.setSvgSize = function(width, height) {
            W = width;
            H = height;
            boxWidth = W * 6 / 25;
            boxHeight = H / 10;
            fontSize =  H / 25 + "px";
            zoomRatio = 1 * W / 500;
            labelInden = 60 * zoomRatio;
            textDisplacement = 20 * zoomRatio;   

            return this;         
        }

        /**
         * configure background color
         */
        Balance.setBg = function (color) {
            backgroundColor = color;

            return this;
        }

        /**
         * configure pivot color
         */
        Balance.setPivotColor = function (color) {
            pivotColor = color;

            return this;
        }

        /**
         * configure pivot line color
         */
        Balance.setPivotLineColor = function (color) {
            pivotLineColor = color;

            return this;
        }


        /**
         * configureFontFamily
         */
        Balance.configureFontFamily = function (font) {
            fontFamily = font;

            return Balance;
        }

        /**
         * configure level color
         */
        Balance.setLevelColor = function (color) {
            levelColor = color;

            return this;
        }

        /**
         * configure level inclination
         */
        Balance.setInclination = function (angle) {
            levelInclination = angle;

            return Balance;
        }

        /**
         * configure word color
         */
        Balance.setWordColor = function (definition) {
            wordColor = definition;

            return Balance;
        }

        var getCenter = function () {
            return {
                "X": W / 2,
                "Y": H * 4 / 5
            }
        }

        var getColor = function (word) {
            var entry = wordColor.find(function (d) {
                return d.label === word
            })

            // if can't match, return default black color
            if (!entry) return "black" 

            return entry.color
        }



        /**
         * addBoxes
         */
        Balance.addBoxes = function (sides, labels) {
            sides.forEach(function (entry, index) {
                boxes.push({
                    "side": entry,
                    "label": labels[index]
                })
            })            
        }

        /**
         * getAverage
         */
        Balance.getAverage = function (boxes) {
            return (
                (boxes.filter(function(d){ 
                    return d.side === 0
                }).length + boxes.filter(function(d){ 
                    return d.side === 1
                }).length ) / 2
            )
        }


        /**
         * setAngle
         */
        Balance.setAngle = function (boxes) {
            
            var difference = boxes.filter(function(d){ 
                    return d.side === 0
                }).length - boxes.filter(function(d){ 
                    return d.side === 1
                }).length;
            var angle = "0"
            if (difference > 0 ) {
                angle = "-" + levelInclination;
            } else if (difference < 0) {
                angle = levelInclination
            } else {
                angle = "0"
            }
            return rotateString = "rotate(" + angle + " " + getCenter().X + " " + getCenter().Y +")";
        }


        /**
         * return a svgContainer
         */
        Balance.createContainer = function () {            
            return ( d3.select("body").append("svg")
                .attr("width", W)
                .attr("height", H)
                .style("background-color",backgroundColor)
            )            
        }

        /**
         * Draw the pivot
         */
        Balance.drawPivot = function (svgContainer) {
            var displacement = 10;
            var X = getCenter().X;
            var Y = getCenter().Y;
            var extend = 50 * zoomRatio;
            var x1 = X;
            var y1 = Y + displacement;
            var x2 = X + extend;
            var y2 = Y + displacement + extend;
            var x3 = X - extend;
            var y3 = Y + displacement + extend;
            
            svgContainer.append("svg:polyline")
                .attr("points", x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3)
                .style("stroke", pivotLineColor)
                .attr("fill", pivotColor)
        }

        /**
         * Create group
         */
        Balance.createGroup = function (svgContainer, rotateString) {
            return (
                svgContainer.append("svg:g") 
                    .attr("transform", rotateString)
            )
        }

        /**
         * Draw level
         */
        Balance.drawLevel = function (group) {
            var X = getCenter().X;
            var Y = getCenter().Y;
            
            // Draw the level    
            group.append("svg:line")
                    .style("stroke", levelColor)
                    .attr("x1", X - (W * 0.8 * 0.5 ))
                    .attr("y1", Y)
                    .attr("x2", X + (W * 0.8 * 0.5 ))
                    .attr("y2", Y)
                    .attr("stroke-width", 20)
        }

        
        /**
         * Draw rectangle
         * 
         */
        Balance.drawBoxes = function (g) {
            var X = getCenter().X;
            var Y = getCenter().Y;

            var rects = g.selectAll("rect")
                .data(boxes)
                .enter()
                .append("rect")

            var leftY = Y - 10 
            var rightY = Y - 10  
            var r = rects.attr("x", function (d){ 
                    return d.side === 0 ? X - space - boxWidth : X + space            
                })
                .attr("y", function (d) {
                    if (d.side === 0) {                    
                        leftY = leftY - boxHeight;
                        return leftY
                    } else if (d.side === 1) {
                        rightY = rightY - boxHeight;
                        return rightY
                    }
                })
                .attr("width", boxWidth)   
                .attr("height", boxHeight) 
                .attr("rx", 10 * zoomRatio)
                .attr("ry", 10 * zoomRatio)
                .attr("fill", function (d){ return getColor(d.label)})
        }

        /**
         * Draw labels
         */
        Balance.drawLabels = function (g) {
            var X = getCenter().X;
            var Y = getCenter().Y;
            var texts = g.selectAll("text")
                            .data(boxes)
                            .enter()
                            .append("text");
            var leftY = Y + textDisplacement // 420
            var rightY = Y + textDisplacement // 420
            var t = texts.attr("x", function (d) { 
                            return d.side === 0 ? X - space - boxWidth + labelInden : X + space + labelInden
                        } )
                        .attr("y", function (d) {
                            if (d.side === 0) {                    
                                leftY = leftY - boxHeight;
                                return leftY
                            } else if (d.side === 1) {
                                rightY = rightY - boxHeight;
                                return rightY
                            }
                        })
                        .text(function (d) {
                            return d.label;
                        })
                        .attr("font-family", fontFamily)
                        .attr("font-size", fontSize)
                        .style("text-anchor", "middle")                        
                        .attr("fill", fontColor); 
        }

        /**
         * Display average number
         */
        Balance.displayAverage = function (svgContainer, boxes) {
            var X = getCenter().X;
            var Y = getCenter().Y;
            var verticalDisplacement = 50 * zoomRatio;
            var horizontalDisplayment = 15 * zoomRatio;
            var average = (boxes.filter(function(d){ 
                return d.side === 0
            }).length + boxes.filter(function(d){ 
                return d.side === 1
            }).length ) / 2

            svgContainer.append("svg:text")
            .attr("x", X - horizontalDisplayment)
            .attr("y", Y + verticalDisplacement)                
            .attr("font-family", fontFamily)
            .attr("font-size", fontSize)
            .attr("fill", fontColor) 
            .text(average);
        }


        /**
         * Visualize it
         */
        Balance.visualize = function () {

            var svgContainer = this.createContainer();

            this.drawPivot(svgContainer);

            var group = this.createGroup(svgContainer, this.setAngle(boxes) );

            this.drawLevel(group);

            this.drawBoxes(group);

            this.drawLabels(group);

            this.displayAverage(svgContainer, boxes);

        }
        return Balance;
    }

    if (typeof (Balance) === 'undefined') {
        window.Balance = defineBalance();
    }

})(window);