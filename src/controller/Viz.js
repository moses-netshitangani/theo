export function asnCountChoropleth(topoCountry) {
    // scale
    const colorScale = d3.scaleLinear()
        .domain([0, 50])
        .range(["white", "blue"]);


    // colouring the map to create choropleth with asn-count.csv
    const src = "./../../data/asn-count.csv";

    d3.csv(src,
        (data) => {
            // select map
            topoCountry.style("fill", (tpc) => {
                // iterate through topo map and csv data
                data.forEach((d) => {
                    if (tpc.properties.name === d.Country) {
                        tpc.properties.asnCount = d['ASN Count'];
                    }
                });

                return colorScale(tpc.properties.asnCount || 0)

            });

        }
    );

}