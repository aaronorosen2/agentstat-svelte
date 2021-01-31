<script>
    export let agent

    function initMap(node){
        let coordinates = agent["agent_lists"].map(a => ({lat: a.latitude, lng: a.longitude, address: a.address_text, status: a.status}))
        
        let map = new google.maps.Map(node, {
            zoom: 8,
            center: coordinates[0]
        });

        for(let v of coordinates){
            let imagePath
            if (v.status == 'Sold') {
                imagePath = '/images/map-green-dot.png';
            } else {
                imagePath = '/images/map-red-dot.png';
            }
            let image = {
                url: imagePath,
                scaledSize: new google.maps.Size(15, 15),
            };

            let marker = new google.maps.Marker({
                position: v,
                map: map,
                icon: image,
            });

            attachSecretMessage(marker ,map, v.address)
        }

    }

    function attachSecretMessage(marker, map, address) {
        let infowindow = new google.maps.InfoWindow({
            content: address
        });

        marker.addListener('click', function() {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            infowindow.open(map, marker);
        });
    }
</script>

<div id="map" use:initMap></div>

<style>
    #map{
        margin: 2rem 0;
        height: 500px;
        position: relative;
        overflow: hidden;
    }
</style>