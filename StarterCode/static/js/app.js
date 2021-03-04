d3.json("samples.json").then(function(data) {
console.log(data.metadata)

//Get id number for drop-down
d3 
.select("#selDataset")
.selectAll("option")
.data(data.names)
.enter()
.append("option")
.text(function(name){
    return name
})

changeData()
d3
.select("#selDataset")
.on("change", changeData)
function changeData() {
    var nameValue = d3.select("#selDataset").property("value")
    // console.log(data.metadata)
    var filterMetaData = data.metadata.filter(meta => meta.id == nameValue);
    var filterSampleData = data.samples.filter(sample => sample.id == nameValue);
    
    // console.log(filterMetaData[0])
    // console.log(filterSampleData[0])
    
    //fill out table
  d3.select("#meta-id span").html(`${filterMetaData[0].id}`)
  d3.select("#meta-ethnicity span").html(`${filterMetaData[0].ethnicity}`)
  d3.select("#meta-gender span").html(`${filterMetaData[0].gender}`)
  d3.select("#meta-age span").html(`${filterMetaData[0].age}`)
  d3.select("#meta-location span").html(`${filterMetaData[0].location}`)
  d3.select("#meta-bbtype span").html(`${filterMetaData[0].bbtype}`)
  d3.select("#meta-wfreq span").html(`${filterMetaData[0].wfreq}`) 
  buildPlot(filterSampleData[0]) 
  buildBubblePlot(filterSampleData[0]) 
    }
  
// // // //bar chart 

function buildPlot(filterSampleData) {
  // data is coming from function above this one buildPlot(filterSampleData[0])
  console.log(filterSampleData)

  var barTrace = {
    x: filterSampleData.sample_values.slice(0,10).reverse(),
    y: filterSampleData.otu_ids.slice(0,10).map(otuid => `OTU ${otuid}`).reverse(),
    text: filterSampleData.otu_labels.slice(0,10).reverse(),
        hoverlabel: {font: {size: 12}},
        marker: {
            color: 'blue',
            opacity: 1,
        },
      type: 'bar',
      orientation: 'h'
  }
  // console.log(barTrace)
var data = [barTrace];

var layout = {
      title: "Top 10 OTU",
      yaxis: { tickmode: "linear" },
      margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 40
  }}
// Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);

}
// function greeting(name) {
//   // console.log("My name is", name)
//   var reverse = name.split("").reverse().join("")
//   console.log(reverse)
// }

// greeting("Kelly")
// greeting("Philip")

function buildBubblePlot(filterSampleData){

  console.log(filterSampleData)

  var bubbleTrace = {
    x: filterSampleData.otu_ids,
    y: filterSampleData.sample_values,
    text: filterSampleData.otu_labels,
    mode: "markers",
    marker: {
                  size: filterSampleData.sample_values,
                  color: filterSampleData.otu_ids, 
                  colorscale: "Earth"},
    type: "scatter"

    
  }
var bubbleData = [bubbleTrace];
var bubbleLayout = {
  title: `Test Subject ${filterSampleData.id} Belly Button Biodiversity`,
  margin: {
    l: 50,
    r: 100,
    t: 30,
    b: 40
  }
}
// Plot the chart to a div tag with id "bubble"
Plotly.newPlot("bubble", bubbleData, bubbleLayout);

}

  });
