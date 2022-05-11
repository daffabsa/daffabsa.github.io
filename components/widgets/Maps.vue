
<script>
export default {};
</script>

<template>
  <div class="card" style="height: 480px; width: 100%">
    <div class="card-body">
      <div id="map-wrap" style="height: 100%">
        <iframe
          src="http://pdambanyumas.net/gis/"
          frameborder="0"
          style="width: 100%; height: 100%"
        ></iframe>
        <!-- <client-only>
          <l-map
            :zoom="15"
            :center="[-8.6730163, 115.1542327]"
            style="z-index: 1"
          >
            <l-tile-layer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-marker :lat-lng="[-8.6730163, 115.1542327]"></l-marker>
          </l-map>
        </client-only> -->
      </div>
    </div>
  </div>
</template>
