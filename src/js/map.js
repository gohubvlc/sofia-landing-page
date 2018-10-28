$(document)
    .ready(function () {
        // Mapbox token
        mapboxgl.accessToken = 'pk.eyJ1IjoiZXJndW0iLCJhIjoiN2NlMThmYjEzYmYzMTRjMzBhNGIwOGRhNTIwYzFkMWQifQ.T-90-9' +
                'PzPm5KRj4raWiFdA';
        // Mapbox config
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v10',
            bearing: 27,
            pitch: 45,
            center: [
                -119.31208, 37.39770
            ],
            zoom: 8.2
        });
        // Json alerts
        // var geojson = {
        //     type: 'FeatureCollection',
        //     features: [
        //         {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-119.51185, 37.57664]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'Washington, D.C.'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-119.17428, 37.88528]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'San Francisco, California'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-119.00248, 37.59999]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'San Francisco, California'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-72.14170, 7.48949]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'San Cristobal, Venezuela'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-72.16141, 7.52473]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'San Cristobal, Venezuela'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-0.49851, 39.66243]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'Sierra Calderona, Valencia (España)'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-0.45933, 39.67511]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'Sierra Calderona, Valencia (España)'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-0.51255, 39.69446]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'Sierra Calderona, Valencia (España)'
        //             }
        //         }, {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-0.45725, 39.70299]
        //             },
        //             properties: {
        //                 title: 'Fire alert ¿🔥?',
        //                 description: 'Sierra Calderona, Valencia (España)'
        //             }
        //         }
        //     ]
        // };
        // Confirmed fires
        var geojson;
        var geojson2;

    
        // Fly camera
        var index = 0;
        var flyPoints = [1, 4, 6];
        var time = 10;

       

        function initFly() {
            map.flyTo({
                center: [
                    geojson.features[flyPoints[index]].geometry.coordinates[0],
                    geojson.features[flyPoints[index]].geometry.coordinates[1]
                ]
            
            });
            index++;
            if (index >= flyPoints.length) {
                index = 0;
            }
        }

       // 



        $.ajax({ 
            type: 'GET', 
            url: 'http://sofianasachallenge.azurewebsites.net/sofia/firepoints/get', 
            data: { get_param: 'value' }, 
            dataType: 'json',
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.withCredentials = true;
            },
            success: function (result) { 
                console.log(result);
                geojson = result;
                geojson
                .features
                .forEach(function (marker) {
    
                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker';
    
                    // make a marker for each feature and add to the map
                    new mapboxgl
                        .Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({offset: 25}) // add popups
                            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                        .addTo(map);
                });

                setInterval(initFly, time * 1000);
                initFly();
            }
        });



        $.ajax({ 
            type: 'GET', 
            url: 'http://sofianasachallenge.azurewebsites.net/sofia/firepoints/nasa/get/39.495387,-0.475974', 
            data: { get_param: 'value' }, 
            dataType: 'json',
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.withCredentials = true;
            },
            success: function (result) { 
                console.log(result);
                geojson2 = result;
                geojson2
                .features
                .forEach(function (marker) {
    
                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker2';
    
                    // make a marker for each feature and add to the map
                    new mapboxgl
                        .Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({offset: 25}) // add popups
                            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                        .addTo(map);
                }); 
            }
        });


        
    });
