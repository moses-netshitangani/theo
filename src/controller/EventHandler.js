import { asnCountChoropleth } from "./Viz.js";
import { getMap } from "./MapAfrica.js";


document.querySelector("#asnByCountry").addEventListener("click", asnByCountry);
document.querySelector("#setViewContinental").addEventListener("click", setViewContinental);
document.querySelector("#setViewNational").addEventListener("click", setViewNational);
document.querySelector("#setViewIXP").addEventListener("click", setViewIXP);
document.querySelector("#resetViz").addEventListener("click", resetViz);
document.querySelector("#refetchData").addEventListener("click", refetchData);

function asnByCountry() {
    // generate choropleth map of ASN allocations by country.
    asnCountChoropleth(getMap());
}

function setViewContinental() {
    setView('Continental');
}

function setViewNational() {
    setView('National');
}

function setViewIXP() {
    setView('IXP');
}

function setView(view) {
    // set the view of the viz. Continental / National / IXP
    alert(view);
}

function resetViz() {
    // clear filters and reset the visualisation.
    alert("clear filters and reset the visualisation.");
}

function refetchData() {
    // call data get modules to refetch data from sources
    alert("call data get modules to refetch data from sources");
}