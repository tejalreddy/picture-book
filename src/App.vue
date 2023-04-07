<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  beforeCreate() {
      // Clear alerts on page refresh
      this.$store.state.alerts = {};
  },
  created () {
    if (Object.keys(this.$store.state.pages).length === 0) {
      this.$store.commit('createPage')
    }
    this.testCall();
  },
  watch: {
    '$store.state.measurementIdFirebase': function() {
      window.location.reload();
    }
  },
  methods: {
    testCall() {
      const params = {
                method: 'GET',
                // message: 'Successfully generated images',
                // body: JSON.stringify({
                //     prompt: 'An image that could be in a picture book of the following sentence: ' + this.$store.state.currentTitle,
                //     n: 1,
                //     size: '256x256',
                //     response_format: 'b64_json',
                // }),
            };
        // this.request(params);
    }, 
    async request(params) {
        // const options = {
        //   method: params.method, headers: 
        //   {'Content-Type': 'application/json'}
        // };
        // if (params.body) {
        //     options.body = params.body;
        // }
        
        try {
            console.log('request starting');
            const r = await fetch(`https://wall-e.media.mit.edu:3000/url`);
            if (!r.ok) {
                console.log('error thrown');
                const res = await r.json();
                throw new Error(res.error);
            }
            
            console.log('response is ', r);
            const res = await r.json();
            console.log('got response back');
            console.log(res);
        } catch (e) {
            const message = 'There was an error fetching images';
            this.$store.commit('alert', {
                message: message, status: 'error'
            });
        }
        }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* CSS from https://getcssscan.com/css-buttons-examples */
.button-74 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-74:hover {
  background-color: #fff;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

.alerts {
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
}

.alerts article {
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
}

.alerts p {
    margin: 0;
}

.alerts .error {
    background-color: rgb(166, 23, 33);
}

.alerts .success {
    background-color: rgb(45, 135, 87);
}

@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}
</style>
