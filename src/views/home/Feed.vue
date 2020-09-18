<template>
  <v-container grid-list-md py1 >
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4></v-flex>
          <v-flex xs12 sm6 md4>
            <v-img max-width="495" :src="require('@/assets/paypayLogo.jpg')"></v-img>
            
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
<style scoped></style>