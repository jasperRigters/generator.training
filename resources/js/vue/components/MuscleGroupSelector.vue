<template>
    <div class="display">
        <select-arrow />
        <select-arrow v-bind:mirrored="true" />
    </div>
</template>

<script>
import SelectArrow from "./SelectArrow.vue";
export default {
    components: { SelectArrow }
};
</script>

<style></style>
