<template>
    <div>hello{{ tools }}</div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {};
    },
    computed: mapState(["exercises", "muscles", "tools"]),
    methods: {},

    mounted() {
        this.$store.dispatch("getExercises");
        this.$store.dispatch("getMuscles");
        this.$store.dispatch("getTools");
    }
};
</script>
