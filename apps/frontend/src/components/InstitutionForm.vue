<template>
    <div class="flex flex-col">
        <label for="cnpj">Número do CNPJ*</label>
        <InputMask id="cnpj" v-model="v$.cnpj.$model" placeholder="Digite o número do CNPJ" mask="99.999.999/9999-99" />
        <p class="text-red-500 text-xs italic" v-if="v$.cnpj.$error">
            <span v-if="v$.cnpj.required">Cnpj é obrigatório.</span>
        </p>
    </div>

    <div class="flex flex-col">
        <label for="name">Nome Completo*</label>
        <InputText id="name" v-model="v$.name.$model" placeholder="Digite o nome da instituição" />
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
        <InputText id="email" v-model="v$.email.$model" placeholder="instituicao@financeira.com.br" type="email" />
        <p class="text-red-500 text-xs italic" v-if="v$.email.$error">
            <span v-if="v$.email.required">Email é obrigatório.</span>
            <span v-if="v$.email.error">Email é inválido.</span>
        </p>
    </div>

</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { InputMask, InputText } from 'primevue';
import { reactive, watch } from 'vue';

const form = reactive({
    name: "",
    email: "",
    cnpj: "",
    phone: ""
})

const v$ = useVuelidate({
    name: {
        required
    },
    email: {
        required, email
    },
    phone: {
        required,
    },
    cnpj: {
        required
    }
}, form)

const emit = defineEmits(['update-form']);
watch(form, (newForm) => {
    emit('update-form', newForm);
});

function validateForm() {
    v$.value.$touch();
    return !v$.value.$invalid;
}

defineExpose({
    validateForm,
});

</script>
