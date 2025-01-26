<template>
    <div class="h-dvh text-center content-center lg:px-96 md:px-60">
        <div class="w-full h-96" id="viewDiv"></div>
        <div class="flex w-full mt-5">
            <Button @click="saveLocation" class="ml-auto">Salvar</Button>
        </div>

    </div>
</template>

<script setup>
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import Graphic from "@arcgis/core/Graphic.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import { onMounted, reactive } from "vue";
import api from "@/services/api";
import { Button, useToast } from "primevue";
import { useRoute } from "vue-router";
import router from "@/router";
const route = useRoute()

const toast = useToast()

const selectedPoint = reactive({
    latitude: null,
    longitude: null
});

onMounted(async () => {
    const data = await api.get("/addresses/" + route.params.id).then((data) => data.data)
    selectedPoint.latitude = data.address[0].latitude
    selectedPoint.longitude = data.address[0].longitude
    const map = new ArcGISMap({
        basemap: "gray-vector",
    });
    const view = new MapView({
        map: map,
        container: "viewDiv",
        center: [selectedPoint.longitude, selectedPoint.latitude],
        zoom: 18
    });
    const markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40],
        size: 15,
        outline: {
            color: [255, 255, 255],
            width: 2
        }
    });
    const markerGraphic = new Graphic({
        geometry: {
            type: "point",
            longitude: selectedPoint.longitude,
            latitude: selectedPoint.latitude,
        },
        symbol: markerSymbol
    });
    view.graphics.add(markerGraphic);
    view.on("click", (event) => {
        const point = event.mapPoint;
        markerGraphic.geometry = point;
        selectedPoint.longitude = point.longitude;
        selectedPoint.latitude = point.latitude
    });
});

const saveLocation = async () => {
    await api.put(`/addresses/${route.params.id}`, selectedPoint).then(async res => {
        toast.add({
            severity: 'success',
            detail: "Cadastro concluído",
            life: 3000
        })
        await router.push("/profile")
    }).catch((error) => {
        toast.add({
            severity: 'error',
            detail: error?.response?.data?.message ?? 'Erro no envio do formulário',
            life: 3000
        })
    })
};
</script>
