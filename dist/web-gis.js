//full screen map view
var mapId = document.getElementById('map');
function fullScreenView() {
    if  (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        mapId.requestFullscreen();
    }
}

//print map function
$('.print-map').click(function() {
    window.print();
});

//leaflet browser print function
L.control.browserPrint({position: 'topright'}).addTo(map);

//Leaflet search
L.Control.geocoder().addTo(map);

//zoom to layer
$('.zoom-to-layer').click(function(){
    map.setView([48.314845, 18.0879869], 13);

});

//leaflet measure function
L.control.measure({ 
    primaryLengthUnit: 'kilometers', 
    secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: 'hectares'
    }).addTo(map);