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
function greeting(name) {
  // console.log("My name is", name)
  var reverse = name.split("").reverse().join("")
  console.log(reverse)
}

greeting("Kelly")
greeting("Philip")

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
//     d3.json('data/samples.json')
//         .then (data=> {
//         var filterSampleData = data.samples
//         .filter(sample => sample.id == nameValue)
//         console.log(filterSampleData)
    

//     var barTrace = {
//         x: filterSampleData.sample_values.slice(0,10).reverse(),
//         y: filterSampleData.otu_ids.slice(0,10).map(otuid => `OTU ${otuid}`).reverse(),
//         text: filterSampleData.otu_labels.slice(0,10).reverse(),
//         hoverlabel: {font: {size: 12}},
//         marker: {
//             color: 'blue',
//             opacity: 1,
//         },
//         type: 'bar',
//         orientation: 'h'
        // }

    // Grab values from the data json object to build the plots
    // var sampleValues = data.samples[0].filterSampleData.slice(0,10).reverse();
    // var sampleValues = filterSampleData[0].sample_values.slice(0,10).reverse();
    // console.log(sampleValues)

    // // // Labels for chart
    // // var otuIDs = data.samples[0].otu_ids;
    // var otuIDs = filterSampleData.otu_ids;
    // console.log(otuIDs)

     // Hovertext for chart
    // var otuLabels = data.samples[0].otu_labels.slice(0,10);
    // console.log(otuLabels)

      // Top ten IDs
    // var topID = (data.samples[0].otu_ids.slice(0,10)).reverse();

    // // Make labels
    // var labels = topID.map(d => "" + d);
    // console.log(`OTU IDs: ${labels}`)
    
    // var trace1 = {
    //     x: sampleValues,
    //     y: otuIDs,
    //     // text: otuLabels,
    //     marker: {
    //     color: 'blue'}, 
    //     type:"bar",
    //     orientation: "h",

    //     };  
    //     // Create the data array for our plot
    // var data = [trace1];

    // // Define our plot layout
    // var layout = {
    //     title: "Top 10 OTU",
    //     yaxis: { tickmode: "linear" },
    //     margin: {
    //         l: 100,
    //         r: 100,
    //         t: 100,
    //         b: 40
    // }
    // };
    // // Plot the chart to a div tag with id "bar"
    // Plotly.newPlot("bar", data, layout);

    // };

  });




    

   

  



// // Bubble chart

//     var trace2 = {
//         x: otuIDs,
//         y: sampleValues,
//         text: otuLabels,
//         mode: "markers",
//         marker: {
//             size: sampleValues,
//             color: otuIDs, 
//             colorscale: "Earth"},
//         type: "scatter"

//         };

//     var data2 = [trace2];

//     var layoutb = {
//         xaxis: {title: "OTU ID"},
//         height: 600,
//         width: 1000
//     };

//     Plotly.newPlot("bubble", data2, layoutb);

    

// function Meta(sample) {
//     //select the Panel with id #sample-metadata
//     d3.json(`/metadata/${sample}`).then((data) => {
//         var Panel = d3.select("#sample-metadata");
//         // clear any existing metadata
//         Panel.html("");
//         //use `Object.entries` to add each key and value pair to panel
//         //inside the loop use d3 to append new tags for each key-value in metadata
//         Object.entries(data).forEach(([key,value]) => {
//             Panel.append("h6").text(`${key}:${value}`);
//         });
//     });

// // function init() {
// //     var selector = d3.select("selDataset")};
// )};