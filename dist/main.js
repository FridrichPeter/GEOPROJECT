//map class initialize
var map = L.map('map').setView([48.784845, 19.6879869], 8);
map.zoomControl.setPosition('topright');

//adding OSM tilelayers
var orto_sr = L.tileLayer.wms('https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wms/service.svc/get?', {
    layers: '1',
	attribution: '&copy; Geodetický a kartografický ústav Bratislava Všetky práva vyhradené.'
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

var img = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});



//addming marker in the center of map
var singleMarker = L.marker([48.314845, 18.09])
    .bindPopup('48.314845, 18.0879869')
    .openPopup();

//add map scale
L.control.scale({metric: 'True', maxWidth: '200'}).addTo(map);


//coordinate display
map.on('mousemove', function(e){
$('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
});


//geojson load
var marker = L.markerClusterGroup();
var nitra = L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
});
nitra.addTo(marker);
marker.addTo(map);

//leaflet layer control
var baseMaps = {
    'OSM': osm,
    'ESRI-TOPO': topo,
    'ESRI-WORLD-IMAGERY': img,
    'ORTO SR': orto_sr
}

var overlayMaps = {
    'GeoJSON Markers': marker,
    'Single Marker': singleMarker
}

//gpx load 
var gpx = './gpx/hreben_gpx.gpx'; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
    async: true,
    marker_options: {
      startIconUrl: './images/pin-icon-start.png',
      endIconUrl: './images/pin-icon-end.png',
      shadowUrl: './images/pin-shadow.png'
    }
  }).on('loaded', function(e) {
    map.fitBounds(e.target.getBounds());
  }).addTo(map);



//leaflet-elevation
var elevation_options = {

    // Default chart colors: theme lime-theme, magenta-theme, ...
    theme: "lime-theme,",

    // Chart container outside/inside map container
    detached: true,

    // if (detached), the elevation chart container
    elevationDiv: "#elevation-div",

    // if (!detached) autohide chart profile on chart mouseleave
    autohide: true,

    // if (!detached) initial state of chart profile control
    collapsed: true,

    // if (!detached) control position on one of map corners
    position: "topright",

    // Autoupdate map center on chart mouseover.
    followMarker: true,

    // Autoupdate map bounds on chart update.
    autofitBounds: true,

    // Chart distance/elevation units.
    imperial: false,

    // [Lat, Long] vs [Long, Lat] points. (leaflet default: [Lat, Long])
    reverseCoords: false,

    // Acceleration chart profile: true || "summary" || "disabled" || false
    acceleration: false,

    // Slope chart profile: true || "summary" || "disabled" || false
    slope: true,

    // speed chart profile: true || "summary" || "disabled" || false
    speed: false,

    // Time stamp labels.
    time: false,

    // Summary track info style: "line" || "multiline" || false
    summary: 'multiline',

    // Toggle chart ruler filter.
    ruler: true,

    // Toggle chart legend filter.
    legend: true,
  };

var controlElevation = L.control.elevation(elevation_options).addTo(map);

controlElevation.load('./gpx/hreben_gpx.gpx');

L.control.layers(baseMaps, overlayMaps, {collapsed: false, position: 'topleft'}).addTo(map);

