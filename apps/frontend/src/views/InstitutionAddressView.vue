<template>
    <form @submit.prevent="submitForm" class="px-10 py-5 mx-10 my-5">
        <p class="text-lg mb-5">Preencha o formulário para finalizar o cadastro</p>
        <div class="grid grid-cols-2 gap-2">
            <IntitutionForm @update-form="updateInstitution" ref="institutionForm" />
        </div>

        <p class="text-lg mb-5 mt-5">
            Digite o CEP e complete as informações
        </p>
        <div class="grid grid-cols-2 gap-2">
            <AddressForm @update-form="updateAddress" ref="addressForm" />
        </div>
        <div class="flex w-full">
            <Button type="submit" class="ml-auto mt-2">Salvar</Button>
        </div>
    </form>
</template>

<script setup>
import IntitutionForm from '../components/InstitutionForm.vue';
import AddressForm from '../components/AddressForm.vue';
import { reactive, ref } from 'vue';
import { Button, useToast } from 'primevue';
import api from '@/services/api';
import { useRoute } from 'vue-router';
import router from '@/router';

const formData = reactive({
    institution: {},
    address: {}
});

const institutionForm = ref(null)
const addressForm = ref(null)

const updateInstitution = (value) => {
    formData.institution = value
}
const updateAddress = (value) => {
    formData.address = value
}

const route = useRoute()

const toast = useToast()

const submitForm = () => {
    const isAddressValid = addressForm.value.validateForm();
    const isInstitutionValid = institutionForm.value.validateForm()

    if (!(isAddressValid && isInstitutionValid)) {
        return
    }

    api.post(`/institutions/${route.params.id}`, formData).then(async () => {
        toast.add({
            severity: "success",
            detail: "Etapa concluída",
            life: 3000
        })
        await router.push("/map/" + route.params.id)
    }).catch((error) => {
        toast.add({
            severity: "error",
            detail: error?.response?.data?.message ?? 'Erro no envio do formulário',
            life: 3000
        })
    })
}
</script>
