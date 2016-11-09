# svg-balance
<h2>A javascript library to render a balance diagram in SVG based on the provided data</h2>

<h3>How to use?</h3>
<h4>Setup dependencies</h4>
<h5>Include the javascript libraries d3.min.js and balance.js in the html page</h5>
<h5>When the balance.js loaded, the 'Balance' object will be instantiated</h5>
<h4>Data to render</h4>
<h5>Setup an array to store the name of the boxes</h5>
<h5>Setup the second array to store which side the boxes go; 0 for "LEFT" and 1 for "RIGHT"</h5>
<h4>Render</h4>
<h5>Call the 'Balance.visualize()' function to show the result</h5>
<h4>Customize the chart</h4>
<h5>Balance.js allow you to customize:</h5>
<h6>The canvas size - .setSvgSize(700, 700) </h6>
<h6>The background color - .setBg("cyan")</h6>
<h6>The pivot color - .setPivotColor("red")</h6>
<h6>The pivot line color - .setPivotLineColor("blue") </h6>
<h6>The level color - .setLevelColor("black")</h6>
<h6>The inclination of the level - .setInclination("15")</h6>
<h6>the colors for the word box -
    .setWordColor(
        [  
            {"label": "Advice", "color": "orange"},
            {"label": "Waiting Time", "color": "green"},
            {"label": "Service", "color": "yellow"},
            {"label": "Explanation", "color": "brown"},
            {"label": "Atmosphere", "color": "purple"},
            {"label": "Welcome", "color": "pink"},
            {"label": "Farewell", "color": "pink"}            
        ]
    )
</h6>



