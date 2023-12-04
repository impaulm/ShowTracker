<template>
  <el-header>
      <el-menu class="menu" mode="horizontal" :ellipsis="false" :default-active="activeIndex" background-color="#394245" active-text-color="#ffd04b" text-color="#fff" router>
        <div>
          <div class="button-container" v-if="loggedIn">
            <el-menu-item :index="'0'" :route="{ name: 'Home' }">
              <img src="/LogoShowTracker.png" style="width: 60px"/>
            </el-menu-item>
            <el-menu-item :index="'1'" :route="{ name: 'Watchlist' }">WatchList</el-menu-item>
          </div>
          <el-menu-item v-else :index="'0'" :route="{ name: 'Home' }"><img src="/LogoShowTracker.png" style="width: 60px"/></el-menu-item>
        </div>
        
        <div>
          <el-input v-model="input" placeholder="Film..." clearable />
        </div>

        <div>
          <el-menu-item v-if="loggedIn" @click="logout">Se déconnecter</el-menu-item>
          <div class="button-container" v-if="!loggedIn">
            <el-menu-item :index="'1'" :route="{ name: 'Login' }">Se connecter</el-menu-item>
            <el-menu-item :index="'2'" :route="{ name: 'Register' }">S'inscrire</el-menu-item>
          </div>
        </div>
          
      </el-menu>
  </el-header>
  <div class="app">
     <div class="content">
      <router-view></router-view>
     </div> 
  </div>
  
  <el-footer class="footer">ShowTracker ©2021 Created by <a href="127.0.0.1:5173">ShowTracker</a></el-footer>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue'

const router = useRouter();
const store = useStore();

const activeIndex = computed(() => {
  const routeName = router.currentRoute.value.name;
  if (loggedIn.value) {
    if (routeName === 'Home') {
      return '0';
    } else if (routeName === 'Watchlist') {
      return '1';
    }
  } else {
    if (routeName === 'Home') {
      return '0';
    } else if (routeName === 'Login') {
      return '1';
    } else if (routeName === 'Register') {
      return '2';
    }
  }
  return 'home';
});
const input = ref('')

const loggedIn = computed(() => store.getters.loggedIn);

const logout = () => {
    store.dispatch('logout');
    router.push({ name: 'Login' });
};
</script>

<style scoped>

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Cela assure que la hauteur de l'élément est au moins égale à 100% de la hauteur de la vue. */
}

.content {
  flex: 1; /* Cela permet au contenu de s'étendre pour remplir l'espace disponible en hauteur. */
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-container {
    display: flex;
    gap: 5px; /* Espace entre les boutons */
  }

.footer {
  margin-top: 20px;
  background-color: #394245;
  color: #fff;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 0;
  ;
}
</style>