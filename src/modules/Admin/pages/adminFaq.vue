<template>
    <AdminHeader/>
    <div class="faq">
       faq
    </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue';
import { onMounted, onUnmounted } from "vue";
import { usebackgroundStore } from "../../../stores/background"
const backgroundStore = usebackgroundStore()
onMounted(() => {
    backgroundStore.setBgColor(1);

});
onUnmounted(() => {
backgroundStore.setBgColor(0)
});
</script>

<style lang="css" scoped>
.faq{
    min-height: 100vh;
}
</style>