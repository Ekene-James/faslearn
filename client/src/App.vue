<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view/>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return{

    }
  },
  methods: {
    ...mapActions(['addCart']),
    ...mapActions(['save_purchased_course'])
  },
  mounted(){
    let ref = localStorage.getItem('fmrlastreference');
    if (ref == '' || ref == null) {
      console.log('something')
    }else{
      var success = true
      cart = JSON.parse(localStorage.getItem('fmrcart'));
      for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        let object = {
          reference : ref,
          userId: localStorage.getItem('fmruser'),
          courseId : item._id
        }

        this.save_purchased_course(object)
        .then(res =>{
          console.log(res)
          console.log('worked')
        })
        .catch({
          success : false
        })
        
      }
      if (success) {
        localStorage.setItem("fmrcart", '');
        localStorage.setItem("fmrlastreference", '');
        this.addCart(0)
      } 
      //console.log(ref)
    }

    let cart = []
		cart = localStorage.getItem('fmrcart')
		if (cart == '' || cart == null) {
			cart = [];
		}else{
      cart = JSON.parse(localStorage.getItem('fmrcart'));
			this.addCart(cart.length);
		}
			
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* //text-align: center; */
  font-size: 15px;
  color: #2c3e50;
}


/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
