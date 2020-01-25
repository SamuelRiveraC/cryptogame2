<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-xs-6 col row selectCoin" @click="updateChart('btc')">
          <div class="col-sm-12 col-md-4 text-center">
            <g-image height="2em" src="/IMG/BTC_Miniature.png" />
          </div>
          <div class="col-sm-12 col-md-8">
            <span style="color:white;">
              You Got:
            </span>
            <br>
            <span style="color:white;"> {{haveBtc}} BTC </span> <br>
            <span style="color:white;"> Price:  </span> <span style="color:white;"> ${{usdBtc}} </span>
          </div>
        </div>
        <div class="col-xs-6 col row selectCoin" :class="{selectCoinDisabled:dashUnlocked}" @click="updateChart('dash')">
          <div class="col-sm-12 col-md-4 text-center">
            <g-image height="2em" src="/IMG/RCH_Miniature.png" />
          </div>
          <div class="col-sm-12 col-md-8">
            <span style="color:white;">
              You Got:
            </span>
            <br>
            <span style="color:white;"> {{haveDash}} DASH </span> <br>
            <span style="color:white;"> Price:  </span> <span style="color:white;"> ${{usdDash}} </span>
          </div>
        </div>
        <div class="col-xs-6 col row selectCoin" :class="{selectCoinDisabled:ethAndBchUnlocked}" @click="updateChart('eth')">
          <div class="col-sm-12 col-md-4 text-center">
            <g-image height="2em" src="/IMG/ETH_Miniature.png" />
          </div>
          <div class="col-sm-12 col-md-8">
            <span style="color:white;">
              You Got:
            </span>
            <br>
            <span style="color:white;"> {{haveEth}} ETH</span> <br>
            <span style="color:white;"> Price:  </span> <span style="color:white;"> ${{usdEth}} </span>
          </div>
        </div>
        <div class="col-xs-6 col row selectCoin" :class="{selectCoinDisabled:ethAndBchUnlocked}" @click="updateChart('bch')">
          <div class="col-sm-12 col-md-4 text-center">
            <g-image height="2em" src="/IMG/BCH_Miniature.png" />
          </div>
          <div class="col-sm-12 col-md-8">
            <span style="color:white;">
              You Got:
            </span>
            <br>
            <span style="color:white;"> {{haveBch}} BCH</span> <br>
            <span style="color:white;"> Price:  </span> <span style="color:white;"> ${{usdBch}} </span>
          </div>
        </div>
      </div>
      <div class="row mt-4 mb-2">
        <div class="col-2 text-center">
          <p class="h4">You have: <br> ${{haveUsd.toFixed(2)}}</p>
        </div>
        <div class="col-3 text-center">
          <p class="h4">USD in Crypto: <br> ${{usdCrypto}} </p>
        </div>
        <div class="col-2 text-center">
          <p class="h4">Date: <br> {{dateInText}}</p>
        </div>
        <div class="col-5 row buysell-info justify-content-center">
          <div class="col buysell-button text-center" @click="stopTimer()">
            <g-image style="height:1.5em;margin-top: 0.5em;" src="/IMG/Pause_game_button.png" />
          </div>
          <div class="col buysell-button text-center" @click="nextTimer()">
            <g-image style="height:1.5em;margin-top: 0.5em;" src="/IMG/Forward_day_game_button.png" />
          </div>
          <div class="col buysell-button text-center" @click="startTimer(1000)">
            <g-image style="height:1.5em;margin-top: 0.5em;" src="/IMG/Play_game_button.png" />
          </div>
          <div class="col buysell-button text-center" @click="startTimer(500)">
            <g-image style="height:1.5em;margin-top: 0.5em;" src="/IMG/Forward_game_button.png" />
          </div>
          <div class="col buysell-button text-center" @click="startTimer(100)">
            <g-image style="height:1.5em;margin-top: 0.5em;" src="/IMG/Fast_forward_game_button.png" />
          </div>
        </div>
      </div>
      <br>
      <div class="row justify-content-center"> 
        <div class="col-12">
           <Chart :chart-data="datacollection" :options="options"></Chart>
        </div>
      </div>
      <br><br><br>
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
                <span>${{priceCoin(1).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>10 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('10' ,actualCoin)">
                <span>${{priceCoin(10).toFixed(2)}}</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>25 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('25' ,actualCoin)">
                <span>${{priceCoin(25).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>50 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('50' ,actualCoin)">
                <span>${{priceCoin(50).toFixed(2)}}</span>
              </div>
            </div>
          </div>        
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>100 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('100' ,actualCoin)">
                <span>${{priceCoin(100).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>200 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="buy('200' ,actualCoin)">
                <span>${{priceCoin(200).toFixed(2)}}</span>
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
                <span> ${{priceCoin(1).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>10 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('10' ,actualCoin)">
                <span> ${{priceCoin(10).toFixed(2)}}</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>25 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('25' ,actualCoin)">
                <span> ${{priceCoin(25).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>50 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('50' ,actualCoin)">
                <span> ${{priceCoin(50).toFixed(2)}}</span>
              </div>
            </div>
          </div>        
          <div class="row justify-content-center">
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>100 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('100' ,actualCoin)">
                <span> $ {{priceCoin(100).toFixed(2)}}</span>
              </div>
            </div>
            <div class="col row buysell-info">
              <div class="col text-center">
                <p>200 {{actualCoin.toUpperCase()}}</p>
              </div>
              <div class="col text-center buysell-button" @click="sell('200' ,actualCoin)">
                <span> $ {{priceCoin(200).toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </div>    
      </div>
      <br><br><br>
    </div>
  </Layout>
</template>

<script>
  import Chart from '~/components/Chart.vue'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    Chart
  },
  data () {
    return {
      //TICKING RELATED DATA
      actualCoin: 'btc', //'btc','eth','bch','dash'

      // CASH RELATED DATA
      haveUsd: 100, //***Save
      haveBtc: 0.00000, //***Save
      haveEth: 0.00000, //***Save
      haveBch: 0.00000, //***Save
      haveDash: 0.00000, //***Save

      usdBtc: 0.05,
      usdEth: 0,
      usdBch: 0,
      usdDash: 0,

      //TIME RELATED DATA
      timer: null,

      timeIndex: 0, //***Save
      dateInMs: 1278547200000 + (0*86400000), //***Save      
      dateInText: '9/10/2013',

      // GRAPHS RELATED DATA
      dates: [],
      dataCoin: {
        'btc':[
          0.05
          ], 
        'eth':[
          1.00
        ],
        'bch':[
          275.00
        ],
        'dash':[
          0.21
        ]
      },
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
  created () {
    window.addEventListener('beforeunload', function(event) {
      window.setTimeout(function () { 
        window.location = '/';
      }, 0); 
      window.onbeforeunload = null   
    })
  },
  mounted () {
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
      return ((this.haveBtc*this.usdBtc)+(this.haveEth*this.usdEth)+(this.haveBch*this.usdBch)+(this.haveDash*this.usdDash)).toFixed(2)
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
    },
    ethAndBchUnlocked () {
      if (this.timeIndex  < this.dataCoin.btc.length - this.dataCoin.eth.length) {
        return true
      } else {
        return false
      }
    },
    dashUnlocked () {
      if (this.timeIndex < this.dataCoin.btc.length - this.dataCoin.dash.length) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    //SAVE GAME METHODS
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
      this.createCookie('haveUsd', this.haveUsd,-1)
      this.createCookie('haveBtc', this.haveBtc,-1)
      this.createCookie('haveEth', this.haveEth,-1)
      this.createCookie('haveBch', this.haveBch,-1)
      this.createCookie('haveDash', this.haveDash,-1)
      this.createCookie('timeIndex', this.timeIndex,-1)
      this.createCookie('dateInMs', this.dateInMs, -1)
      this.updateChart('')
      this.saveGame()
    },
    saveGame () {
      let expirationDate = new Date()
      expirationDate.setMonth(expirationDate.getMonth()+1)
      expirationDate = expirationDate.getTime()
      this.createCookie('haveUsd', this.haveUsd,  expirationDate   )
      this.createCookie('haveBtc', this.haveBtc,  expirationDate   )
      this.createCookie('haveEth', this.haveEth,  expirationDate   )
      this.createCookie('haveBch', this.haveBch,  expirationDate   )
      this.createCookie('haveDash', this.haveDash,  expirationDate   )
      this.createCookie('timeIndex', this.timeIndex,  expirationDate   )
      this.createCookie('dateInMs', this.dateInMs,   expirationDate  )
    },
    loadGame() {
      if (this.readCookie('dateInMs') === null) {
        console.error("NO SAVEGAME AVAILABLE")
      }
      this.haveUsd  = parseFloat(this.readCookie('haveUsd'))
      this.haveBtc  = parseFloat(this.readCookie('haveBtc'))
      this.haveEth  = parseFloat(this.readCookie('haveEth'))
      this.haveBch  = parseFloat(this.readCookie('haveBch'))
      this.haveDash = parseFloat(this.readCookie('haveDash'))
      this.timeIndex = parseInt(this.readCookie('timeIndex'))
      this.dateInMs = parseInt(this.readCookie('dateInMs'))
      let time = new Date(this.dateInMs)
      this.dateInText = time.getDate()+'/'+(time.getMonth()+1)+'/'+time.getFullYear()
      this.updateChart('')      
    },
    //BUY - SELLING METHODS
    buy (amount,coin) {
      if (coin === 'btc' && this.haveUsd >= amount * this.usdBtc) {
        this.haveBtc += Math.floor( (parseInt(amount)) * 100000) / 100000
        this.haveUsd -= parseInt(amount) * this.usdBtc
      } else if (coin === 'eth' && this.haveUsd >= amount * this.usdEth) {
        this.haveEth += Math.floor( (parseInt(amount)) * 100000) / 100000 
        this.haveUsd -= parseInt(amount) * this.usdEth       
      } else if (coin === 'bch' && this.haveUsd >= amount * this.usdBch) {
        this.haveBch += Math.floor( (parseInt(amount)) * 100000) / 100000
        this.haveUsd -= parseInt(amount) * this.usdBch
      } else if (coin === 'dash' && this.haveUsd >= amount * this.usdDash) {
        this.haveDash += Math.floor( (parseInt(amount)) * 100000) / 100000
        this.haveUsd -= parseInt(amount) * this.usdDash
      }        
    },
    sell (amount,coin) {
      if (this.haveBtc >= amount && coin === 'btc') {
        this.haveBtc -= parseInt(amount)
        this.haveUsd += Math.floor( (parseInt(amount)* this.usdBtc) * 100000) / 100000
      } else if (this.haveEth >= amount && coin === 'eth') {
        this.haveEth -= parseInt(amount)
        this.haveUsd += Math.floor( (parseInt(amount)* this.usdEth) * 100000) / 100000
      } else if (this.haveBch >= amount && coin === 'bch') {
        this.haveBch -= parseInt(amount)
        this.haveUsd += Math.floor( (parseInt(amount)* this.usdBch) * 100000) / 100000
      } else if (this.haveDash >= amount && coin === 'dash') {
        this.haveDash -= parseInt(amount)
        this.haveUsd += Math.floor( (parseInt(amount)* this.usdDash) * 100000) / 100000
      }
    },
    // VALUES AND CHART METHODS
    priceCoin(amount) {
      if (this.actualCoin === 'btc') {
        return (parseInt(amount)* this.usdBtc)
      } else if (this.actualCoin === 'eth') {
        return (parseInt(amount)* this.usdEth)        
      } else if (this.actualCoin === 'bch') {
        return (parseInt(amount)* this.usdBch)
      } else if (this.actualCoin === 'dash') {
        return (parseInt(amount)* this.usdDash)       
      }
    },
    updateChart (coin) {
      if (!((coin === 'eth' || coin === 'bch') && this.ethAndBchUnlocked === true) || !(coin === 'dash' && this.dashUnlocked === true)) {
        if (coin !== '') {
          this.actualCoin = coin
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
      
      this.usdBtc = this.dataCoin['btc'][this.timeIndex]

      if (this.timeIndex >= this.dataCoin.btc.length-this.dataCoin.eth.length) {
        this.usdEth = this.dataCoin['eth'][this.timeIndex-(this.dataCoin.btc.length-this.dataCoin.eth.length)]
        this.usdBch = this.dataCoin['bch'][this.timeIndex-(this.dataCoin.btc.length-this.dataCoin.bch.length)]
      }
      if (this.timeIndex >= this.dataCoin.btc.length-this.dataCoin.dash.length) {
        this.usdDash = this.dataCoin['dash'][this.timeIndex-(this.dataCoin.btc.length-this.dataCoin.dash.length)]
      }
      if (this.timeIndex >= this.dataCoin.btc.length) {
        console.error("FINISHED")
        this.usdBtc = this.dataCoin['btc'][this.dataCoin.btc.length-1]
        this.usdEth = this.dataCoin['eth'][this.dataCoin.eth.length-1]
        this.usdBch = this.dataCoin['bch'][this.dataCoin.bch.length-1]
        this.usdDash = this.dataCoin['dash'][this.dataCoin.dash.length-1]
        clearInterval(this.timer)
        this.timer = null
      }
      this.updateChart('')
      this.saveGame()
    }
  }
}
</script>

<style>
  .selectCoin {
    background-color: #071d2c;
    padding: 0.5em 0 0.5em 0;
    margin: 0 0.25em 0 0.25em;
    cursor: pointer;
    box-shadow: 0 0 1em 0.33em rgba(0,0,0,0.1);
  }
  .selectCoin:hover {
    background-color: #114569;
  }
  .selectCoinDisabled {
    background-color: #273036 !important;
    cursor: default !important;
  }
  .selectCoinDisabled:hover {
    background-color: #273036 !important;
  }

  .buysell-info .col {
    background-color: #071d2c;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
  .buysell-button {
    background-color: #071d2c;
    cursor: pointer;    
  }
  .buysell-button:hover {
    background-color: #114569;
  }
</style>