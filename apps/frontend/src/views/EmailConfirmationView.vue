<template>
    <div class="text-center justify-center flex flex-col border-gray-400 h-dvh">
        <p class="text-lg">
            Validação de e-mail
        </p>

        <p class="mb-4"> Insira o código abaixo enviado para <br> <strong>exemplo@noemail.com.br</strong></p>

        <InputOtp class="mx-auto" :length="6" @blur="confirmEmail" v-model="code" />

        <Button @click="resendEmail" variant="link"> Não recebi o e-mail</Button>
    </div>
</template>

<script setup>
import api from '@/services/api';
import { Button, InputOtp, useToast } from 'primevue';
import { ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const toast = useToast()

const code = ref("")

const route = useRoute()

const confirmEmail = async () => {

    if (code.value.length < 6) {
        return
    }

    try {
        await api.post(`/users/${route.params.id}/confirm`, { code: code.value })
        toast.add({
            severity: "success",
            detail: "Etapa concluída",
            life: 3000
        })
        await router.push(`/institution-address/${route.params.id}`)
    } catch (error) {
        toast.add({
            severity: "error",
            detail: error?.response?.data?.message ?? "Erro na confirmação do email",
            life: 3000
        })
    }


};

const resendEmail = async () => {
    try {
        await api.post(`/users/${route.params.id}/resendCode`)
        toast.add({
            severity: 'success',
            detail: "O código foi reenviado",
            life: 3000
        })
    } catch (error) {
        toast.add({
            severity: 'error',
            detail: "Erro ao reenviar e-mail",
            life: 3000
        })
    }
}

</script>

<style scoped>
</style>
