<template>
  <el-header>
      <el-menu class="menu" mode="horizontal" :ellipsis="false" :default-active="activeIndex" background-color="#394245" active-text-color="#ffd04b" text-color="#fff" @select="handleSelect" router>
        <div>
          <el-menu-item index="0" :route="{ name: 'Home' }">Accueil</el-menu-item>
          <el-menu-item v-if="loggedIn" index="1" :route="{ name: 'WatchList' }">WatchList</el-menu-item>
          <el-menu-item v-if="loggedIn" index="2" :route="{ name: 'Profile'}">Profile</el-menu-item>
        </div>
        
          <div>
            <el-input v-model="input" placeholder="Film..." clearable />
          </div>

          <div>
            <el-menu-item v-if="loggedIn" @click="logout">Se déconnecter</el-menu-item>
          <el-menu-item v-else index="1" :route="{ name: 'Login' }">Se connecter</el-menu-item>
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
import { ref } from 'vue'

const router = useRouter();
const store = useStore();
const activeIndex = ref('1')

</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>