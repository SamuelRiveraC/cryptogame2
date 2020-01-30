<template>
  <div class="app">
    <div class="header">
      <g-link to="/">
        <p class="logo">Coins<span>2</span>Trade</p> 
        <span>{{ $static.metadata.siteName }}</span>
      </g-link>
    </div>

    <transition name="fade" appear>
      <slot /> <!-- the content -->
    </transition>

    <div class="footer">
      {{new Date().getFullYear()}} <a href="#">Samuelriverac</a>
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

<style>
.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
}
</style>