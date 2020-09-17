<template> <!-- fluid -->
  <v-container grid-list-md py1 >
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4>
            <h2>Welcome!</h2>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'Feed',
  head: {
    title: function() {
      return {
        inner: "",
        separator: " ",
        complement: "Paypay"
      };
    }
  }
  , data() {
    return {
      model: null
      , feed: undefined
      , form: new Object()
      , view: {
        title: "Feed",
        action: {
          submit: {
            busy: false
          }
        }
        , elem:{ }
        , section:{
          form: { 
            visible: true 
          }
        }
      }
    }
  }, methods:{
  }, computed:{
    
  }, mounted(){
  }
  , updated(){
  }
  , components: {}
  , created(){
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-gradient {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 1110px);
}

.gradient-bg{
    display: inline-block;
    background: -moz-linear-gradient(bottom, rgba(0,0,0,0) 0%, rgba(249, 249, 249, 0.89) 100%);
    background: -webkit-gradient(linear, left bottom, left bottom, color-stop(0%,rgba(0,0,0,0.65)), color-stop(100%,rgba(0,0,0,0)));
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(249, 249, 249, 0.89) 100%);
    background: -o-linear-gradient(bottom, rgba(0,0,0,0) 0%,rgba(249, 249, 249, 0.89) 100%);
    background: -ms-linear-gradient(bottom, rgba(0,0,0,0) 0%,rgba(249, 249, 249, 0.89) 100%);
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(249, 249, 249, 0.89) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 );

}
a {
  text-decoration: none;
}

.theme--light.v-divider {
    border-color: rgba(255, 0, 0, 0.5) !important; 
    border-width: 0px 0px 2px 0px;
}

</style>