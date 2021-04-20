
// Filter data to single individual and build graph around that

// create default graph

var sample_data = "samples.json";

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
};

// dropdown
d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged() {
    // d3.event.preventDefault();
    var sample_data = "samples.json";
    // d3.json(sample_data).then(function(data) {
    //     var samples = d3.select(data.samples);

    //     console.log(samples);
    // });
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

};

// horizontal Bar group top 10 OTU
d3.json(sample_data).then(function(data) {
    var prime_sample = data.samples[0].filter({sample_values});
    console.log(prime_sample);
    
    // var sample_values = prime;
    // console.log(sample_values);
    Plotly.newPlot("bar");
});

// demographic Data
d3.json(sample_data).then(function(data) {
    console.log(data.metadata);
    //  console.log(data.metadata);
    
    // var metadata = d3.select(data.metadata[]);
    var id = data.metadata[0].id;
    var ethnicity = data.metadata[0].ethnicity;
    var gender = data.metadata[0].gender;
    var age = data.metadata[0].age;
    var location = data.metadata[0].location;
    var bbtype = data.metadata[0].bbtype;
    var wfreq = data.metadata[0].wfreq;
    console.log(location);
    // var id = filtered_data.map(id);
    
    buildTable(id,ethnicity, gender, age, location, bbtype, wfreq);
    // console.log(id);
    // console.log(metadata);

    function buildTable(id, ethnicity, gender, age, location, bbtype, wfreq) {
        var table = d3.select("#sample-metadata");
        var tbody = table.select("tbody");
        var trow;
        trow = tbody.append("tr");
        trow.append("tr").text(`id: ${id}`);
        trow.append("tr").text(`ethnicity: ${ethnicity}`);
        trow.append("tr").text(`gender: ${gender}`);
        trow.append("tr").text(`age: ${age}`);
        trow.append("tr").text(`location: ${location}`);
        trow.append("tr").text(`bbtype: ${bbtype}`);
        trow.append("tr").text(`wfreq: ${wfreq}`);
        
      };
    

});