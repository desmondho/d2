$(document).ready( function() {
    jQuery.extend({
          parseQuerystring: function() {
              var nvpair = {};
              var qs = window.location.search.replace('?', '');
              var pairs = qs.split('&');
              $.each(pairs, function(i, v) {
                  var pair = v.split('=');
                  nvpair[pair[0]] = pair[1];
              });
              return nvpair;
          }
      });
      var qs = $.parseQuerystring();
      
      
       var lon = -98.5;
        var lat = 35.3;
        var zoom = 6;
        var map, layer;

$(function(){
        
        
        options = {
		spericalMercator: true,
		projection: new OpenLayers.Projection("EPSG:900913"),
		maxResolution: 156543.0339,
		maxZoomLevels: 18,
		fractionalZoom: true,
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
		units: "m",
		//maxExtent : new OpenLayers.Bounds([ -9803292.13,-5205054.49, 547896.95, 15497748.74 ])
		maxExtent: new OpenLayers.Bounds([ -19803292.13, -3405054.49, 547896.95, 15497748.74 ])
		}
	
            map = new OpenLayers.Map( 'map', options );
           layer = new OpenLayers.Layer.Google(
			"Google Streets", // the default
			{numZoomLevels: 20});
           
           // layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", 
           //         "http://vmap0.tiles.osgeo.org/wms/vmap0",
           //         {layers: 'basic'} );
            map.addLayer(layer);
            center = new OpenLayers.LonLat(-98.5, 35);
	center = center.transform(options.displayProjection, options.projection);
	map.setCenter(center, 7);
            
            //map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
            /*asdasd*/
           // function drawFeature (url) {
	
	//drawLayer.removeAllFeatures();
	$.getJSON('http://test.oklahomawatersurvey.org/mongo/db_find/ows/watersheds/{"spec":{"properties.HUC":"'+qs.huc+'"}}', function (fdata) {
		
		var in_options = {'internalProjection': map.projection, 'externalProjection': map.projection};
	var geojson_format = new OpenLayers.Format.GeoJSON(in_options);
		var pre = '{"type": "FeatureCollection","features":'
		var geosjon_str = pre + JSON.stringify(fdata) + '}'
		var features = geojson_format.read(geosjon_str, "FeatureCollection");
		if (features.constructor != Array) {
			features = [features];
		}
		//drawLayer.addFeatures(features);
var geojson_format = new OpenLayers.Format.GeoJSON();
           var vector_layer = new OpenLayers.Layer.Vector(); 
           map.addLayer(vector_layer);
           //vector_layer.addFeatures(geojson_format.read(features));
           vector_layer.addFeatures(features);
	});

//}
            
            
          /*  var featurecollection = {
              "type": "FeatureCollection", 
              "features": [
                {"geometry": 
                        {
                            "type": "Polygon", 
                            "coordinates": 
                                [[
                	[
                        -10733907.774387589,
                        4438986.2902676752
                    ],
                    [
                        -10732954.909185665,
                        4438985.6830259496
                    ],
                    [
                        -10731516.234224254,
                        4438992.4096969059
                    ],
                    [
                        -10731112.954876151,
                        4438993.7678704029
                    ],
                    [
                        -10730531.711797144,
                        4438995.698711684
                    ],
                    [
                        -10720508.94282618,
                        4438979.2464272957
                    ],
                    [
                        -10720181.850344216,
                        4438975.7627689568
                    ],
                    [
                        -10719499.085758857,
                        4438971.9629116971
                    ],
                    [
                        -10718997.321926823,
                        4438977.8390656225
                    ],
                    [
                        -10717752.436433582,
                        4438995.6647534678
                    ],
                    [
                        -10733907.774387589,
                        4438986.2902676752
                    ]
                    ]]
                        }
                    
                }, 
                
              ]
           };
           var geojson_format = new OpenLayers.Format.GeoJSON();
           var vector_layer = new OpenLayers.Layer.Vector(); 
           map.addLayer(vector_layer);
           vector_layer.addFeatures(geojson_format.read(features));*/

        })
        
        })