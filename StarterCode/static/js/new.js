//Test subject Id no menu and default plots
function getName() {
    //Select dropdown menu id and assign it to a variable
    var dropdownMenu = d3.select(`#selectDataset`);
    //Read names from json and append to dropdown menu
    d3.json('data/samples.json')
        .then(subject => subject.names
        .forEach(name => dropdownMenu
            .append('option')
            .text(name)
            .property('value'),

            //Initialize page with default metadata and plots
            getMetadata(subject.name[0]),
            getBar(subject.names[0]),
            getBubble(subject.names[0]),
            getGauge(subject.names[0])

        ),
        );

};

function optionChanged(id) {
    getMetadata(id)
    getBar(id)
    getBubble(id)
    getGauge(id)

};

function getMetadata(id) {
    //Read Metadata from json file for each subject and assign it to a variable
    d3.json("data/samples.json")
        .then (data => {
            var subjectData = dta.getMetadata
            .filter(subject => subject.id.toString() === id[0]);

            //Select demographic info id and assign it to a variable
            var subjectMetadata = d3.select('#sample-metadata')
            //Clear metadata before displaying newly selected data
            subjectMetadata.html("");
            //PUsh data into demographic info card
            Object.defineProperties(subjectData)
                .forEach(([key, value]) => subjectMetadata
                .append('p')
                .text(`${key}: ${value}`),
                );
                
        });
};

getName();

//Bar chart
function getBar(id) {

    d3.json('data/samples.json')
        .then (data=> {
        var sortedSample = data.samples
        .filter(sample => sample.id === id)[0];
        console.log(sortedSample);
        //Trace for bar chart that displays each sample top 10 OTU values
        var barTrace = {
            x: sortedSample.sample_values.slice(0,10).reverse(),
            y: sortedSample.otu_ids.slice(0,10).map(otuid => `OTU ${otuid}`).reverse(),
            text: sortedSample.otu_labels.slice(0,10).reverse(),
            hoverlabel: {font: {size: 12}},
            marker: {
                color: 'blue',
                opacity: 1,
            },
            type: 'bar',
            orientation: 'h'
        };
        //Data
        var data = [barTrace];
        //Layout
        var layout = {
            title: {
                text: `Top 10 OTU for Test Subject No. ${id}`,
                font: {
                    family: 'Arial',
                    size: 24,
                    color: 'black'
                },

            },
            height: 600,
            width: 630,
            xaxis: {
                tickwidth: 10,
                tickcolor: 'black',
                tickfont: {family: 'Arial', color: 'darkgrey'},
                title: {
                    text: "Value",
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'darkgrey'
                    },
                },
            },
            yaxis: {
                tickwidth: 10,
                tickcolor: 'black',
                tickfont: {family: 'Arial', color: 'darkgrey'},
                title: {
                    text: "Bacteria ID",
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'darkgrey'
                    },
                },
            },
        };
        Plotly.newPLot('bar', data, layout); 
        });
}; 

//Bubble chart
function getBubble(id) {
    //Read data from json file for each sample, assign it to a variable, and plot it
    d3.json('data/samples.json')
        .then(data => {
            var 
        })
}