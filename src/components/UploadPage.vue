<template>
    <div>
    <Map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 400px">


      <TileLayer id="osm">
        <OsmSource/>
      </TileLayer>
    </Map>

  </div>
</template>

<script>


    import { Map, TileLayer, OsmSource } from 'vuelayers'
    import 'vuelayers/lib/style.css' // needs css-loader


    export default {
        'name': 'UploadPage',
        components: {
            Map,
            TileLayer,
            OsmSource,
        }
      
    }
</script>