<template>
  <Layout>
    <div class="main_menu">
          <p class="main_menu_text">
            <g-link :to="{path:'/play', query: { game: 'new'}}">
              <span>New Game</span>
            </g-link>
          </p>
          <p class="main_menu_text">
            <g-link :to="{path:'/play', query: { game: 'load'}}">
              Load Game
            </g-link>
          </p>
          <p class="main_menu_text">
            <g-link :to="{path:'/instructions'}">
              Instructions
            </g-link>
          </p>
          <!--
          <p class="main_menu_text">
            <g-link to="/leaderboard">
              Leaderboard
            </g-link>
          </p> 
          -->  
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Homepage!'
  },
  mounted () { //stay at mounted not created what's happening?
    if (this.readCookie('timeIndex') === null || this.readCookie('dateInMs') === null) {
      console.error('NO SAVEGAME AT HOME')
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