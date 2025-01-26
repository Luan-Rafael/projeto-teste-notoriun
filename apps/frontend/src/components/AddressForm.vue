<template>
    <div class="flex flex-col">
        <label for="zipCode">CEP*</label>
        <InputMask id="zipCode" v-model="v$.zipCode.$model" mask="99999-999" placeholder="Digite o CEP da localidade"
            @blur="getCity" />
        <p class="text-red-500 text-xs italic" v-if="v$.zipCode.$error">
            <span v-if="v$.zipCode.required">CEP é obrigatório.</span>
        </p>
    </div>

    <div class="flex flex-col">
        <label for="state">Estado*</label>
        <InputText id="state" v-model="v$.state.$model" placeholder="Estado" disabled />
        <p class="text-red-500 text-xs italic" v-if="v$.state.$error">
            <span v-if="v$.state.required">Estado é obrigatório.</span>
        </p>
    </div>
    <div class="flex flex-col">
        <label for="city">Cidade*</label>
        <InputText id="city" v-model="v$.city.$model" placeholder="Cidade" disabled />
        <p class="text-red-500 text-xs italic" v-if="v$.city.$error">
            <span v-if="v$.city.required">Cidade é obrigatório.</span>
        </p>
    </div>
    <div class="flex flex-col">
        <label for="neighborhood">Bairro*</label>
        <InputText id="neighborhood" v-model="v$.neighborhood.$model" placeholder="Exemplo: Centro" />
        <p class="text-red-500 text-xs italic" v-if="v$.neighborhood.$error">
            <span v-if="v$.neighborhood.required">Bairro é obrigatório.</span>
        </p>
    </div>
    <div class="flex flex-col">
        <label for="street">Endereço*</label>
        <InputText id="street" v-model="v$.street.$model" placeholder="Exemplo: Avenida Brasil" />
        <p class="text-red-500 text-xs italic" v-if="v$.street.$error">
            <span v-if="v$.street.required">Endereço é obrigatório.</span>
        </p>
    </div>
    <div class="flex flex-col">
        <label for="number">Número*</label>
        <InputText id="number" v-model="v$.number.$model" placeholder="Exemplo: 123" type="number" />
        <p class="text-red-500 text-xs italic" v-if="v$.number.$error">
            <span v-if="v$.number.required">Número é obrigatório.</span>
        </p>
    </div>
    <div class="flex flex-col">
        <label for="complement">Complemento*</label>
        <InputText id="complement" v-model="v$.complement.$model" placeholder="Exemplo: Sala 01" type="text" />
        <p class="text-red-500 text-xs italic" v-if="v$.complement.$error">
            <span v-if="v$.complement.required">Número é obrigatório.</span>
        </p>
    </div>

</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import axios from 'axios';
import { InputMask, InputText } from 'primevue';
import { watch, reactive } from 'vue';

const apikey = 'AAPTxy8BH1VEsoebNVZXo8HurI6uEoJZBo8i7XMS9sPGcLwoVrn6VixIAEGFuIQ6Y9LZ2EwN82oa4S_0TVdeSEYnhtA4lvizEmmh6dNnb3WlkMpzzgVkKzn8A_1rUSXJH_7cViVpdO08he2Vb8GymHYJMpTYlGSez1TW10pH5sEABw_FqbPvLoNdsL2PQEPSdh1lCp2D6ntrG9lYrmy7cRj5u9mx5YDoMVOZ-gwfx9nU-CU.AT1_dVuUV6HA'

const form = reactive({
    zipCode: '',
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: ""
})

const v$ = useVuelidate({
    zipCode: { required, minLength: minLength(9), },
    state: { required },
    city: { required },
    neighborhood: { required },
    number: { required },
    complement: { required },
    street: { required }
}, form)

async function getCity() {
    if (!/^\d{5}-\d{3}$/.test(form.zipCode)) {
        return;
    }
    const axiosInstance = axios.create({ baseURL: "https://viacep.com.br/ws/" })

    const data = await axiosInstance.get(`${form.zipCode}/json`)

    form.city = data.data.localidade
    form.state = data.data.estado
    form.neighborhood = data.data.bairro
}

const emit = defineEmits(['update-form']);

watch(form, async (newForm) => {

    const isValid = validateForm()

    if (isValid) {
        const apiInstance = axios.create({ baseURL: "https://geocode-api.arcgis.com" })
        const { location } = await apiInstance.get(`/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=pjson&singleLine=${newForm.street} ${newForm.neighborhood}, ${newForm.city} ${newForm.state}&outFields=*&token=${apikey}`).then(data => data.data.candidates[0])

        emit('update-form', { ...newForm, latitude: location.y, longitude: location.x });
    } else {
        emit('update-form', newForm);
    }
});



function validateForm() {
    v$.value.$touch();
    return !v$.value.$invalid;
}

defineExpose({
    validateForm,
});

</script>