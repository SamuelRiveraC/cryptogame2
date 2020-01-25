<template>
  <div id="app">
    <div class="feed">
      <div class="header">
        <g-link to="/">
          <p class="logo">Coins<span>2</span>Trade</p> {{ $static.metadata.siteName }}
        </g-link>
      </div>

      <slot />

      <div class="footer">
        <g-image class="background_img" src="/IMG/Background_crypto_img.png" />
        <p class="trademark">2018 <a href="#">Samuelriverac</a> & <a href="#">JDesign</a></p>      
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
</script>

<style>

</style>
