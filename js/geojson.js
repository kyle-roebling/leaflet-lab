
// function to create map instance

function createMap (){

// create map object
 var map = L.map('mapid', {
     center: [20,0],
     zoom: 2
 }); 
    
// load tile layer
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    
// call getData
getData(map);
 
}

// add popups to features
function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};





//function to retrieve the data and place it on the map
function getData(map){
     // load the data
     $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
              //create marker options
            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            
             //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                //filter: function(feature){
                   //return feature.properties.Pop_2015 > 20; 
                //},
                onEachFeature: onEachFeature,
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                }
            }).addTo(map);
        }
    });
};
 
$(document).ready(createMap);