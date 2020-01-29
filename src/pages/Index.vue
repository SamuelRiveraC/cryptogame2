<template>
  <Layout>
    <ul class="main_menu">
      <li>
        <g-link :to="{path:'/play', query: { game: 'new'}}">
          New Game
        </g-link>
      </li>
      <li :class="{  main_menu__disabled : !savegame}" >
        <g-link :to="{path:'/play', query: { game: 'load'}}">
          Load Game
        </g-link>
      </li>
      <li>
        <g-link :to="{path:'/instructions'}">
          Instructions
        </g-link>
      </li>
    </ul>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home page'
  },
  mounted () {
    if (this.readCookie('timeIndex') === null || this.readCookie('dateInMs') === null) {
      console.log('NO SAVEGAME AT HOME')
    } else {
      this.savegame = true
    }
  },
  data () {
    return {
      savegame: false
    }
  },
  methods:{
    readCookie(name) {
      var key = name + "=";
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
          return cookie.substring(key.length, cookie.length);
        }
      }
      return null;
    },  
  }
}
</script>