<template>
  <div id="app">
    <ComHeader />
    <main>
      <router-view />
    </main>
    <ComFooter />
  </div>
</template>

<script>
import ComHeader from './components/ComHeader.vue';
import ComFooter from './components/ComFooter.vue';

export default {
  name: 'App',
  components: {
    ComHeader,
    ComFooter
  }
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; 
}

main {
  flex: 1;
  width: 100%; 
}
</style>