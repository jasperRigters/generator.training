<template>
    <div>
        <button class="btn btn-primary" @click="bla">Start Workout!</button>
    </div>
</template>

<script>
export default {
    methods: {
        bla() {
            this.flash("Data loaded", "success");
        }
    }
};
</script>

<style></style>
