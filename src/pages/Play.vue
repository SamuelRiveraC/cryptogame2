<template>
  <Layout>
    <div class="container-fluid">
      <toast-container></toast-container>
      
      <div class="row mb-3">
        <div class="col-6 col-md-3 col-lg-2 px-1 pb-3"  v-for="coin in coins" :key="coin" v-tooltip="getUnlockDate(coin)">
          <div class="row align-items-center" @click="updateChart(coin)" :class="coinStyle(coin)">
            <div class="col-3 text-center">
              <cryptoicon :symbol="coin" size="32" />
            </div>
            <div class="col-9">
              <span> Price:  </span> <span> ${{conversion[coin]}} </span> <br>
              <span> Have: {{ have[coin] }}   {{coin.toUpperCase()}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3 justify-content-center align-items-center">
        <div class="col-4 col-lg-2 mb-3 info text-center">
          <p>USD in Cash: <br> ${{have['usd'].toFixed(2)}}</p>
        </div>
        <div class="col-4 col-lg-2 mb-3 info text-center">
          <p>USD in Crypto: <br> ${{usdCrypto}} </p>
        </div>
        <div class="col-4 col-lg-2 mb-3 info text-center">
          <p>Date: <br> {{dateInText}}</p>
        </div>

        <div class="col-12 col-lg-6 row player px-0">
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
      
      <div class="row mb-3"> 
        <div class="col-12">
           <Chart :chart-data="datacollection" :options="options"></Chart>
        </div>
      </div>

      <div class="row">
        <div class="col-6">

          <div class="row">
            <div class="col-12">
              <p class="h2">Buy</p>
            </div>
          </div>
          <div class="row">
            <div v-for="amount in buySellAmounts" :key="amount" class="col-5 col-md-3 buysell-button" @click="buy(amount ,actualCoin)">
              <span> Buy {{amount}} {{actualCoin.toUpperCase()}} <br> for ${{priceCoin(amount,actualCoin).toFixed(2)}}</span>
            </div>
          </div>     
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-12">
              <p class="h2">Sell</p>
            </div>
          </div>
          <div class="row">
            <div v-for="amount in buySellAmounts" :key="amount" class="col-5 col-md-3 buysell-button" @click="sell(amount ,actualCoin)">
              <span> Sell {{amount}} {{actualCoin.toUpperCase()}} <br> for ${{priceCoin(amount,actualCoin).toFixed(2)}}</span>
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
      coins:['btc','ltc','xmr','dash','eth','bch','xrp','eos'],
      actualCoin: 'btc', //'btc','eth','bch','dash'
      coinNames: {'btc':'Bitcoin','eth':'Ethereum' ,'bch':'Bitcoin Cash' ,'dash':'Dash', 'xrp':'Ripple','ltc':'Litecoin','eos':'EOS','xmr':'Monero'},
      buySellAmounts: [1,10,25,50,100,250],

      // CASH RELATED DATA                 ltc 2011, xrp 2012, xmr && dash 2014, eth & bch 2015
      have: {
        usd:  100,
        btc:  0.00000, 
        eth:  0.00000, 
        bch:  0.00000, 
        dash: 0.00000,
        xrp:  0.00000,
        ltc:  0.00000,
        eos:  0.00000,
        xmr:  0.00000
      },
      conversion: {
        btc:  0.05, 
        eth:  0.00, 
        bch:  0.00, 
        dash: 0.00,
        xrp:  0.00,
        ltc:  0.00,
        eos:  0.00,
        xmr:  0.00
      },
      unlocked:{
        btc:  true, 
        eth:  false, 
        bch:  false, 
        dash: false,
        xrp:  false,
        ltc:  false,
        eos:  false,
        xmr:  false
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
          borderColor: 'blue',
          pointBackgroundColor: 'blue',
          pointBorderColor: 'blue',
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

    window.addEventListener('beforeunload', function(event) {
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
        this.$vueOnToast.pop('success', 'Buy coins', "You spent $"+parseInt(amount) * this.conversion[coin]+" for  "+amount+" "+this.coinNames[coin])
      } else {
        this.$vueOnToast.pop('error', 'Buy coins', "You can't afford buying more "+this.coinNames[coin])
      }      

    },
    sell (amount,coin) {
      if (this.have[coin] >= amount) {
        this.have[coin] -= parseInt(amount)
        this.have['usd'] += Math.floor( (parseInt(amount)* this.conversion[coin]) * 100000) / 100000
        this.$vueOnToast.pop('success', 'Sell coins', "You sold "+amount+" "+this.coinNames[coin]+" for $"+parseInt(amount) * this.conversion[coin])
      } else {
        this.$vueOnToast.pop('error', 'Sell coins', "You don't have enough "+this.coinNames[coin] +" to sell")
      }

    },
    // VALUES AND CHART METHODS
    priceCoin(amount,coin) {
      return parseInt(amount)*this.conversion[coin]
    },
    updateChart (coin) {

      if (this.unlocked[coin] || coin == '') {
        if (coin !== '') {
          this.actualCoin = coin
          this.$vueOnToast.pop('success', 'Selected coin', "You have selected "+this.coinNames[coin])
        }
        let change = {
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
      } else {
          this.$vueOnToast.pop('error', 'Selected coin', this.coinNames[coin]+" hasn't been unlocked yet")
      }
    },
    //TIMER METHODS

    startTimer (speed) {
      this.$vueOnToast.pop('info', 'Game time', "The game has been resumed ")

      clearInterval(this.timer)
      if (this.timeIndex < this.dataCoin.btc.length) {
        this.timer = setInterval(() => this.countdown(), speed) // 1000ms = 1 second
      }
    },
    nextTimer () {
      this.$vueOnToast.pop('info', 'Game time', "The game has moved 1 day forward")
      
      clearInterval(this.timer)

      this.timer = null
      if (this.timeIndex < this.dataCoin.btc.length) {
        this.countdown()
      }      
    },
    stopTimer () {
      this.$vueOnToast.pop('info', 'Game time', "The game has been paused")
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
    },
    getUnlockDate(coin) {
      let finalDateInMs = 1278547200000 + (this.dataCoin.btc.length*86400000) //***Save      
      let coinDateInMs = finalDateInMs - (this.dataCoin[coin].length*86400000) //***Save      
      let time = new Date(coinDateInMs)

      if (this.dateInMs <= coinDateInMs) {
        return 'Unlock date: '+time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()
      } else {
        return "Coin unlocked"
      }

    }
  }
}

</script>