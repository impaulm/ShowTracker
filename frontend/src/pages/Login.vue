<template>
    <el-row class="form">
        <el-col :span="8" :offset="8">
            <el-card>
                <el-form @submit.prevent="login">
                    <el-form-item label="Nom d'utilisateur">
                        <el-input type="text" id="username" v-model="form.username" />
                    </el-form-item>

                    <el-form-item label="Mot de passe">
                        <el-input type="password" id="password" v-model="form.password" />
                    </el-form-item>
                    <el-button type="info" native-type="submit">Se connecter</el-button>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import axios from 'axios';
import { ElMessage } from 'element-plus';
import { sha256 } from 'js-sha256';

const router = useRouter();
const store = useStore();

const form = reactive({ username: '', password: '' });

const login = async () => {
    const { username, password } = form;
    const hashedPassword = sha256(password);

    try {
        const response = await axios.post('http://localhost:3000/login', {
            username: username,
            password: hashedPassword
        });
        store.dispatch('login', response.data);
        router.push({ name: 'Home' });
    } catch (e) {
        ElMessage.error('Mauvais nom d\'utilisateur ou mot de passe');
    }
};
</script>

<style scoped>
.form{
    margin-top: 10vh;
}
</style>
