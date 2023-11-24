<template>
  <el-header>
      <el-menu class="menu" mode="horizontal" :ellipsis="false" :default-active="activeIndex" router>
        <div>
          <div class="button-container" v-if="loggedIn">
            <el-menu-item :index="0" :route="{ name: 'Home' }">
              <img src="/LogoShowTracker.png" style="width: 60px"/>
            </el-menu-item>
            <el-menu-item :index="1" :route="{ name: 'WatchList' }">WatchList</el-menu-item>
            <el-menu-item :index="2" :route="{ name: 'Profile'}">Profile</el-menu-item>
          </div>
          <el-menu-item v-else :index="0" :route="{ name: 'Home' }">Accueil</el-menu-item>
        </div>
        
        <div>
          <Recherche />
        </div>

        <div>
          <el-menu-item v-if="loggedIn" @click="logout">Se déconnecter</el-menu-item>
          <div class="button-container" v-if="!loggedIn">
            <el-menu-item :index="1" :route="{ name: 'Login' }">Se connecter</el-menu-item>
            <el-menu-item :index="2" :route="{ name: 'Register' }">S'inscrire</el-menu-item>
          </div>
        </div>
          
      </el-menu>
  </el-header>

  <el-main>
      <router-view></router-view>
  </el-main>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Recherche from './components/Recherche.vue';

const router = useRouter();
const store = useStore();

const loggedIn = computed(() => store.getters.loggedIn);

const logout = () => {
    store.dispatch('logout');
    router.push({ name: 'Login' });
};

</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-container {
    display: flex;
    gap: 5px; /* Espace entre les boutons */
  }
</style>