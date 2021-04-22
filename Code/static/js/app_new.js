console.log("app_new.js running");
function displayMetadata(id) {
    console.log("calling displayMetadata id", id);

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var dataArray = metadata.filter(sample_id => sample_id.id == id);
        var result = dataArray[0];
        console.log(result);
        var demoData = d3.select("selDataset");

        var metadata_id = result.id;
    //     // console.log(metadata_id);
        var ethnicity = result.ethnicity;
        var gender = result.gender;
        var age = result.age;
        var location = result.location;
        var bbtype = result.bbtype;
        var wfreq = result.wfreq;
    //     // console.log(location);
    //     // var id = filtered_data.map(id);
    
        buildTable(metadata_id,ethnicity, gender, age, location, bbtype, wfreq);
    //     // // console.log(id);
    //     // // console.log(metadata);

        function buildTable(metadata_id, ethnicity, gender, age, location, bbtype, wfreq) {
        var table = d3.select("#sample-metadata");
        var tbody = table.select("tbody");
        var trow;
        trow = tbody.append("tr");
        trow.append("tr").text(`id: ${metadata_id}`);
        trow.append("tr").text(`ethnicity: ${ethnicity}`);
        trow.append("tr").text(`gender: ${gender}`);
        trow.append("tr").text(`age: ${age}`);
        trow.append("tr").text(`location: ${location}`);
        trow.append("tr").text(`bbtype: ${bbtype}`);
        trow.append("tr").text(`wfreq: ${wfreq}`);
        
        };
    });

    // 
};

function createBargraph(id) {
    console.log("calling createBargraph", id);
    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultsArray = samples.filter(d => d.id == id);
        var results = resultsArray[0];
        var otu_ids = results.otu_ids;
        var text = results.otu_lables;
        
        var sample_values = results.sample_values;

        var yticks = otu_ids.slice(0,10).map(outID => `OTU ${otu_ids}`);

        var barData = [{
            x: sample_values.slice(0,10).reverse(),
            y:yticks,
            type:"bar",
            // text: text.slice(0,10).reverse(),
            orientation: "h"
        }];

        var barLayout = {
            title: "Top 10 Bacteria found",
            margin: { t: 30, l: 150}
        };
        Plotly.newPlot("bar", barData, barLayout);

    });

};

function createBubbleGraph(id) {
    console.log("calling createBubbleGraph", id);

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(d => d.id == id);
        var results = resultsArray[0];

        var otu_lables = results.otu_lables;
        var otu_ids = results.otu_ids;
        var sample_values = results.sample_values;

        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_lables,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        var bubbleLayout = {
            title: "Bacteria Culters per Sample",
            margin: {t: 0},
            hovermode: "closest",
            xaxis: {title: "OTU_ID"},
            margin: {t: 30}
        };

        Plotly.newPlot("bubble", bubbleData. bubbleLayout);
    });
};

function optionChanged(id) {
    console.log("calling optionChanged", id);
    createBargraph(id);
    createBubbleGraph(id);
    displayMetadata(id);
};

function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var data_names = data.names;
        data_names.forEach((samples) => {

            selector.append("option").text(samples).property('value', samples);
        });
        var selectedId = data_names[0];
        createBargraph(selectedId);
        createBubbleGraph(selectedId);
        displayMetadata(selectedId);
    });
};

init();