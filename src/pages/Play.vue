<template>
  <Layout>
    <div class="container-fluid">

      
      <div class="row mb-5">
        <div v-for="coin in coins" :key="coin" @click="updateChart(coin)" :class="coinStyle(coin)">
          <div class="row">
            <div class="col-12 col-md-4 text-center">
              <g-image src="~/assets/IMG/BTC_Miniature.png" />
            </div>
            <div class="col-12 col-md-8">
              <span> You Got: </span>
              <br>
              <span> {{ have[coin] }}   {{coin.toUpperCase()}}</span>
              <br>
              <span> Price:  </span> <span> ${{conversion[coin]}} </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-2 text-center">
          <p class="h4">USD in Cash: <br> ${{have['usd'].toFixed(2)}}</p>
        </div>
        <div class="col-3 text-center">
          <p class="h4">USD in Crypto: <br> ${{usdCrypto}} </p>
        </div>
        <div class="col-2 text-center">
          <p class="h4">Date: <br> {{dateInText}}</p>
        </div>

        <div class="col-5 row player px-0">
          <div class="col player-button" @click="stopTimer()">
            <g-image src="~/assets/IMG/Pause_game_button.png" />
          </div>
          <div class="col player-button" @click="nextTimer()">
            <g-image src="~/assets/IMG/Forward_day_game_button.png" />
          </div>
          <div class="col player-button" @click="startTimer(1000)">
            <g-image src="~/assets/IMG/Play_game_button.png" />
          </div>
          <div class="col player-button" @click="startTimer(500)">
            <g-image src="~/assets/IMG/Forward_game_button.png" />
          </div>
          <div class="col player-button" @click="startTimer(100)">
            <g-image src="~/assets/IMG/Fast_forward_game_button.png" />
          </div>
        </div>
      </div>
      <div class="row"> 
        <div class="col-12">
           <Chart :chart-data="datacollection" :options="options"></Chart>
        </div>
      </div>
      <div class="row">
        <div class="col mr-4">
          <div class="row">
            <div class="col">
              <p class="h2">Buy</p>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>1 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('1' ,actualCoin)">
                <span>${{priceCoin(1,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>10 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('10' ,actualCoin)">
                <span>${{priceCoin(10,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>25 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('25' ,actualCoin)">
                <span>${{priceCoin(25,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>50 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('50' ,actualCoin)">
                <span>${{priceCoin(50,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
          </div>        
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>100 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('100' ,actualCoin)">
                <span>${{priceCoin(100,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>200 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('200' ,actualCoin)">
                <span>${{priceCoin(200,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
          </div>     
        </div>
        <div class="col ml-4">
          <div class="row">
            <div class="col">
              <p class="h2">Sell</p>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>1 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('1' ,actualCoin)">
                <span> ${{priceCoin(1,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>10 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('10' ,actualCoin)">
                <span> ${{priceCoin(10,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>25 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('25' ,actualCoin)">
                <span> ${{priceCoin(25,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>50 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('50' ,actualCoin)">
                <span> ${{priceCoin(50,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
          </div>        
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>100 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('100' ,actualCoin)">
                <span> $ {{priceCoin(100,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>200 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('200' ,actualCoin)">
                <span> $ {{priceCoin(200,actualCoin).toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </div>
  </Layout>
</template>

<script>
import Chart from '~/components/Chart.vue'
import dataCoin from '~/data/dataCoin.json'

export default {
  metaInfo: {
    title: 'Play'
  },
  components: {
    Chart
  },
  data () {
    return {
      //TICKING RELATED DATA
      coins:['btc','dash','eth','bch',],
      actualCoin: 'btc', //'btc','eth','bch','dash'

      // CASH RELATED DATA
      have: {
        usd:  100,
        btc:  0.00000, 
        eth:  0.00000, 
        bch:  0.00000, 
        dash: 0.00000,
      },
      conversion: {
        btc:  0.05, 
        eth:  0.00, 
        bch:  0.00, 
        dash: 0.00,
      },
      unlocked:{
        btc:  true, 
        eth:  false, 
        bch:  false, 
        dash: false,
      },
      //TIME RELATED DATA
      timer: null,
      timeIndex: 0, //***Save
      dateInMs: 1278547200000 + (0*86400000), //***Save      
      dateInText: '9/10/2013',

      // GRAPHS RELATED DATA
      dates: [],

      dataCoin: dataCoin,

      datacollection: {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [{
          label: 'BTC',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'yellow',
          pointBackgroundColor: 'yellow',
          pointBorderColor: 'yellow',
          borderWidth: 2,
          data: [0.1,0.2,0.3,0.1,0.05,0.1,0.3,0.4,0.7,0.9]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: true,
              color: "rgba(255,255,255,0.5)"
            }
          }],
          xAxes: [{
            gridLines: {
              display: true,
              color: "rgba(255,255,255,0.5)"
            }
          }]
        }
      }
    }
  },
  mounted () { 
    window.addEventListener('beforeunload', function(event) { //stay at mounted not created what's happening?
      window.setTimeout(function () { 
        window.location = '/';
      }, 0); 
      window.onbeforeunload = null   
    })

    if (this.$route.query.game == "new") {
      this.newGame()
    } else if (this.$route.query.game == "load") {
      this.loadGame()
    }
    let time = new Date(this.dateInMs)
    this.dateInText = time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()
  },
  computed: {
    usdCrypto () {
      let amount = 0
      for (var i = this.coins.length - 1; i >= 0; i--) {
        amount +=   this.have[this.coins[i]]*this.conversion[this.coins[i]]
      }

      return amount.toFixed(2);

      return ((this.have['btc']*this.conversion['btc'])+(this.have['eth']*this.conversion['eth'])+(this.have['bch']*this.conversion['bch'])+(this.have['dash']*this.conversion['dash'])).toFixed(2)
    },
    labels () {
      let labels = []
      for (var i = 1; i < 11; i++) {
        let time = new Date(this.dateInMs+(86400000*i))
        labels.push(time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear())
      }
      return labels
    },
    coinRange () {
      let coin = []
      let offset = 0
      if (this.actualCoin === 'eth' || this.actualCoin === 'bch') {
        offset = this.dataCoin.btc.length - this.dataCoin.eth.length
      } else if (this.actualCoin === 'dash') {
        offset = this.dataCoin.btc.length - this.dataCoin.dash.length
      }
      for (var i = 0+this.timeIndex-offset; i < 10+this.timeIndex-offset; i++) {
        coin.push(this.dataCoin[this.actualCoin][i])      
      }
      return coin
    }
  },
  methods: {
    //SAVE GAME METHODS
    coinStyle(coin) {
      return "col coin "+(this.actualCoin == coin ? 'coin__selected ' : '')+(!this.unlocked[coin] ? 'coin__disabled' : '') 
    },
    createCookie(key, value, date) {
      var expiration = new Date(date).toUTCString();
      var cookie = escape(key) + "=" + escape(value) + ";expires=" + expiration + ";";
      document.cookie = cookie;
    },
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
    newGame () {
      this.createCookie('haveUsd', this.have['usd'],-1)
      this.createCookie('haveBtc', this.have['btc'],-1)
      this.createCookie('haveEth', this.have['eth'],-1)
      this.createCookie('haveBch', this.have['bch'],-1)
      this.createCookie('haveDash', this.have['dash'],-1)
      this.createCookie('timeIndex', this.timeIndex,-1)
      this.createCookie('dateInMs', this.dateInMs, -1)
      this.updateChart('')
      this.saveGame()
    },
    saveGame () {
      let expirationDate = new Date()
      expirationDate.setMonth(expirationDate.getMonth()+1)
      expirationDate = expirationDate.getTime()
      this.createCookie('haveUsd', this.have['usd'],  expirationDate   )
      this.createCookie('haveBtc', this.have['btc'],  expirationDate   )
      this.createCookie('haveEth', this.have['eth'],  expirationDate   )
      this.createCookie('haveBch', this.have['bch'],  expirationDate   )
      this.createCookie('haveDash', this.have['dash'],  expirationDate   )
      this.createCookie('timeIndex', this.timeIndex,  expirationDate   )
      this.createCookie('dateInMs', this.dateInMs,   expirationDate  )
    },
    loadGame() {
      if (this.readCookie('dateInMs') === null) {
        console.error("NO SAVEGAME AVAILABLE")
      }
      this.have['usd']  = parseFloat(this.readCookie('haveUsd'))
      this.have['btc']  = parseFloat(this.readCookie('haveBtc'))
      this.have['eth']  = parseFloat(this.readCookie('haveEth'))
      this.have['bch']  = parseFloat(this.readCookie('haveBch'))
      this.have['dash'] = parseFloat(this.readCookie('haveDash'))
      this.timeIndex = parseInt(this.readCookie('timeIndex'))
      this.dateInMs = parseInt(this.readCookie('dateInMs'))
      let time = new Date(this.dateInMs)
      this.dateInText = time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()
      this.updateChart('')      
    },
    //BUY - SELLING METHODS
    buy (amount,coin) {

      if (this.have['usd'] >= amount * this.conversion[coin]) {
        this.have[coin] += Math.floor( (parseInt(amount)) * 100000) / 100000
        this.have['usd'] -= parseInt(amount) * this.conversion[coin]
      }

      /*
      if (coin === 'btc' && this.have['usd'] >= amount * this.conversion['btc']) {
        this.have['btc'] += Math.floor( (parseInt(amount)) * 100000) / 100000
        this.have['usd'] -= parseInt(amount) * this.conversion['btc']
      } else if (coin === 'eth' && this.have['usd'] >= amount * this.conversion['eth']) {
        this.have['eth'] += Math.floor( (parseInt(amount)) * 100000) / 100000 
        this.have['usd'] -= parseInt(amount) * this.conversion['eth']       
      } else if (coin === 'bch' && this.have['usd'] >= amount * this.conversion['bch']) {
        this.have['bch'] += Math.floor( (parseInt(amount)) * 100000) / 100000
        this.have['usd'] -= parseInt(amount) * this.usdBch
      } else if (coin === 'dash' && this.have['usd'] >= amount * this.conversion['dash']) {
        this.have['dash'] += Math.floor( (parseInt(amount)) * 100000) / 100000
        this.have['usd'] -= parseInt(amount) * this.conversion['dash']
      }
      */       
    },
    sell (amount,coin) {

      if (this.have[coin] >= amount) {
        this.have[coin] -= parseInt(amount)
        this.have['usd'] += Math.floor( (parseInt(amount)* this.conversion[coin]) * 100000) / 100000
      }


      /*
      if (this.have['btc'] >= amount && coin === 'btc') {
        this.have['btc'] -= parseInt(amount)
        this.have['usd'] += Math.floor( (parseInt(amount)* this.conversion['btc']) * 100000) / 100000
      } else if (this.have['eth'] >= amount && coin === 'eth') {
        this.have['eth'] -= parseInt(amount)
        this.have['usd'] += Math.floor( (parseInt(amount)* this.conversion['eth']) * 100000) / 100000
      } else if (this.have['bch'] >= amount && coin === 'bch') {
        this.have['bch'] -= parseInt(amount)
        this.have['usd'] += Math.floor( (parseInt(amount)* this.usdBch) * 100000) / 100000
      } else if (this.have['dash'] >= amount && coin === 'dash') {
        this.have['dash'] -= parseInt(amount)
        this.have['usd'] += Math.floor( (parseInt(amount)* this.conversion['dash']) * 100000) / 100000
      }
      */
    },
    // VALUES AND CHART METHODS
    priceCoin(amount,coin) {

      return parseInt(amount)*this.conversion[coin]

    },
    updateChart (coin) {
      

      if (!((coin === 'eth' || coin === 'bch') && this.unlocked['eth'] === true) || !(coin === 'dash' && this.unlocked['dash'] === true)) {
        if (coin !== '') {
          let coinNames = {'btc':'Bitcoin','eth':'Ethereum' ,'bch':'Bitcoin Cash' ,'dash':'Dash'}
          this.actualCoin = coin
          this.$toasted.show("Selected "+coinNames[coin]).goAway(2500)
        }
        var change = {
          labels: this.labels,
          datasets: [{
            label: coin.toUpperCase(),
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'yellow',
            pointBackgroundColor: 'yellow',
            pointBorderColor: 'yellow',
            borderWidth: 2,
            data: this.coinRange
          }]
        }
        this.datacollection = Object.assign({}, change)         
      }
    },
    //TIMER METHODS
    startTimer (speed) {
      clearInterval(this.timer)
      if (this.timeIndex < this.dataCoin.btc.length) {
        this.timer = setInterval(() => this.countdown(), speed) // 1000ms = 1 second
      }
    },
    nextTimer () {
      clearInterval(this.timer)
      this.timer = null
      if (this.timeIndex < this.dataCoin.btc.length) {
        this.countdown()
      }      
    },
    stopTimer () {
      clearInterval(this.timer)
      this.timer = null
    },
    countdown () {
      this.dateInMs += 86400000
      let time = new Date(this.dateInMs)
      this.dateInText = time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()
      this.timeIndex++
      
      for (var i = this.coins.length - 1; i >= 0; i--) {
        
        if (this.coins[i] == 'btc') {
          this.conversion['btc'] = this.dataCoin['btc'][this.timeIndex]
        } else {
          if (this.timeIndex >= this.dataCoin.btc.length-this.dataCoin[this.coins[i]].length) {
            this.unlocked[this.coins[i]] = true;
            this.conversion[this.coins[i]] = this.dataCoin[this.coins[i]][this.timeIndex-(this.dataCoin.btc.length-this.dataCoin[this.coins[i]].length)]
          }
        }






      }

      /*
      if (this.timeIndex >= this.dataCoin.btc.length-this.dataCoin.eth.length) {
        this.unlocked['eth'] = true;
        this.unlocked['bch'] = true;
        this.conversion['eth'] = this.dataCoin['eth'][this.timeIndex-(this.dataCoin.btc.length-this.dataCoin.eth.length)]
        this.conversion['bch'] = this.dataCoin['bch'][this.timeIndex-(this.dataCoin.btc.length-this.dataCoin.bch.length)]
      }
      if (this.timeIndex >= this.dataCoin.btc.length-this.dataCoin.dash.length) {
        this.unlocked['dash'] = true;
        this.conversion['dash'] = this.dataCoin['dash'][this.timeIndex-(this.dataCoin.btc.length-this.dataCoin.dash.length)]
      }
      */


      if (this.timeIndex >= this.dataCoin.btc.length) {
        for (var i = this.coins.length - 1; i >= 0; i--) {
          this.conversion[this.coins[i]] = this.dataCoin[this.coins[i]][this.dataCoin[this.coins[i]].length-1]
        }
        console.error("FINISHED")
        clearInterval(this.timer)
        this.timer = null
      }
      this.updateChart('')
      this.saveGame()
    }
  }
}

/*
btc       -
Litecoin  - 2011
Ripple    - 2012
dash      - 4/2/2014
eth & bch - 1/9/2015



*/
</script>