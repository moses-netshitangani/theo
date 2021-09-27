import { asnCountChoropleth } from "./Viz.js";

let countryPath;

// spinner loader settings
const opts = {
    lines: 9, // The number of lines to draw
    length: 9, // The length of each line
    width: 5, // The line thickness
    radius: 14, // The radius of the inner circle
    color: '#c10e19', // #rgb or #rrggbb or array of colors
    speed: 1.9, // Rounds per second
    trail: 40, // Afterglow percentage
    className: 'spinner', // The CSS class to assign to the spinner
};

// create spinner
let target = d3.select("body").node();

// trigger loader
let spinner = new Spinner(opts).spin(target);

// create tooltip
let tooltip = d3.select("body").append("div").style("position", "absolute").style("z-index", "10").style("visibility", "hidden").attr("class", "tooltip");

// select element
let measureSelect = d3.select('#dimensions');

let width = 960;
let height = 720;

let projection = d3.geoMercator()
    .scale(300)
    .translate([width / 3, height / 2]);

let path = d3.geoPath()
    .projection(projection);

// use Susie Lu's d3-legend plugin
// http://d3-legend.susielu.com/
let d3legend = d3.legendColor()
    .shapeWidth(width / 10)
    .cells(9)
    .orient("horizontal")
    .labelOffset(3)
    .ascending(true)
    .labelAlign("middle")
    .shapePadding(2);

let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);


let countryObj = {};

function createMap(error, africa, data) {

    if (error) throw error;

    // stop spin.js loader
    spinner.stop();

    let centered;

    // define zoom function
    function zoomed() {
        group.attr("transform", d3.event.transform);
    }

    // When clicked, zoom in
    function clicked(d) {
        var x, y, k;

        // Compute centroid of the selected path
        if (d && centered !== d) {
            // if (d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            // k = zoom.scaleExtent()[1];
            k = 5;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        // Manually Zoom
        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(k)
                .translate(-x, -y));
    }

    let zoom = d3.zoom()
        .scaleExtent([1, 15])
        .on("zoom", zoomed);

    svg.style("pointer-events", "all")
        .call(zoom);

    let group = svg.append("g")
        .attr("class", "continent");


    countryPath = group.selectAll(".countries")
        .data(topojson.feature(africa, africa.objects.collection).features)
        .enter()
        .append('path')
        .attr("class", "country-border")
        .on("click", clicked)
        .attr("d", path);
    setResponsiveSVG();



}



// Many browsers -- IE particularly -- will not auto-size inline SVG
// IE applies default width and height sizing
// padding-bottom hack on a container solves IE inconsistencies in size
// https://css-tricks.com/scale-svg/#article-header-id-10
function setResponsiveSVG() {
    let width = +d3.select('svg').attr('width');
    let height = +d3.select('svg').attr('height');
    let calcString = +(height / width) * 100 + "%";

    let svgElement = d3.select('svg');
    let svgParent = d3.select(d3.select('svg').node().parentNode);

    svgElement
        .attr('class', 'scaling-svg')
        .attr('preserveAspectRatio', 'xMinYMin')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('width', null)
        .attr('height', null);

    svgParent.style('padding-bottom', calcString);
}

d3.queue()
    .defer(d3.json, "./../../data/africa.topojson")
    .defer(d3.csv, "./../../data/asn-count.csv")
    .await(createMap);


export function getMap() { 
    return countryPath;
};