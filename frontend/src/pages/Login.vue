<template>
    <el-container direction="vertical">
        <el-row>
            <el-col :span="8" :offset="8">
                <el-card>
                    <el-form >
                        <el-form-item label="Nom d'utilisateur">
                            <el-input type="text" id="username"/>
                        </el-form-item>

                        <el-form-item label="Mot de passe">
                            <el-input type="password" id="password" />
                        </el-form-item>
                        <el-button type="info" native-type="submit">Se connecter</el-button>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>