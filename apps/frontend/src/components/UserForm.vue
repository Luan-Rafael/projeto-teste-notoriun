<template>

  <form @submit.prevent="submitForm">
    <div class="space-y-4">

      <p class="text-xs text-center"> As Informações serão usadas para iniciar o cadastro no sistema</p>
      <div class="flex flex-col">
        <label for="username">Nome Completo*</label>
        <InputText id="name" v-model="v$.name.$model" placeholder="Nome Sobrenome" />
        <p class="text-red-500 text-xs italic" v-if="v$.name.$error">
          <span v-if="v$.name.required">Nome é obrigatório.</span>
        </p>
      </div>

      <div class="flex flex-col">
        <label for="phone">Celular*</label>
        <InputMask id="phone" v-model="v$.phone.$model" mask="(99) 9 9999-9999" placeholder="(00) 0 0000-0000" />
        <p class="text-red-500 text-xs italic" v-if="v$.phone.$error">
          <span v-if="v$.phone.required">Celular é obrigatório.</span>
        </p>
      </div>

      <div class="flex flex-col">
        <label for="email">Email*</label>
        <InputText id="email" v-model="v$.email.$model" placeholder="exemplo@noemail.com.br" type="email" />
        <p class="text-red-500 text-xs italic" v-if="v$.email.$error">
          <span v-if="v$.email.required">Email é obrigatório.</span>
          <span v-if="v$.email.error">Email é inválido.</span>
        </p>
      </div>

      <p class="text-center text-gray-500 text-xs">
        Esse site é protegido pelo reCAPTCHA e está sujeito a Política de Privacidade e aos Termos de Serviços
        do Google
      </p>

      <div class="flex items-center">
        <Button class="ml-auto" type="submit">
          Continuar
        </Button>
      </div>
    </div>

  </form>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { email, maxLength, minLength, required, } from '@vuelidate/validators';
import { reactive } from 'vue';
import api from '@/services/api';
import router from '@/router';
import { Button, InputMask, InputText } from 'primevue';
import { useToast } from 'primevue';

const toast = useToast()
const formData = reactive({
  name: '',
  email: '',
  phone: '',
})

const validations = {
  name: { required, minLength: minLength(8), },
  phone: { required, maxLength: maxLength(16), minLength: minLength(16), },
  email: { required, email },
};

const v$ = useVuelidate(validations, formData);

const submitForm = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return
  }

  try {
    const res = await api.post('/users', formData).then(data => data.data)
    toast.add({
      severity: "success",
      detail: "Etapa concluída com sucesso",
      life: 3000
    })
    await router.push('/confirm-email/' + res.user.id)
  } catch (error) {
    toast.add({
      severity: "error",
      detail: error?.response?.data?.message ?? 'Erro no envio do formulário',
      life: 3000
    })
  }
};
</script>