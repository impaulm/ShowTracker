<template>
  <el-header>
    <el-menu mode="horizontal" :ellipsis="false" router>
       <el-menu-item index="0" :route="{name: 'Home' }">Accueil</el-menu-item> 
    </el-menu>
  </el-header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>

</style>
