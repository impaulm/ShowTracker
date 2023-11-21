<template>
    <el-container direction="vertical">
        <el-row>
            <el-col :span="8" :offset="8">
                <el-card>
                    <el-form @submit.prevent="register">
                        <el-form-item label="Nom d'utilisateur">
                            <el-input type="text" id="username" v-model="form.username"/>
                        </el-form-item>

                        <el-form-item label="Adresse E-Mail">
                            <el-input type="text" id="email" v-model="form.email"/>
                        </el-form-item>

                        <el-form-item label="Mot de passe">
                            <el-input type="password" id="password" v-model="form.password"/>
                        </el-form-item>
                        <el-button type="info" native-type="submit">S'inscrire</el-button>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
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

const form = reactive({
    username: '',
    email: '',
    password: ''
});

const register = async () => {
    const { username, email, password } = form;
    const hashedPassword = sha256(password);

    try {
        const response = await axios.post('http://localhost:3000/register', {
            username: username,
            email: email,
            password: hashedPassword
        });

        const data = response;

        if (data.success) {
            ElMessage.success('Inscription réussie !');
            router.push({ name: 'Login' });
        } else {
            ElMessage.error(data.message);
        }
    } catch (error) {
        ElMessage.error('Une erreur est survenue lors de l\'inscription.');
    }
}
</script>