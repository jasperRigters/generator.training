<template>
    <div><button @click="generateWorkout()"></button></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions("workout", ["generateWorkout"])
    }
};
</script>

<style scoped>
button {
    height: 50px;
    width: 50px;
}
</style>
