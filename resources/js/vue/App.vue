<template>
    <div>
        {{ muscles }}
        <muscle-group-selector />
    </div>
</template>

<script>
import { mapState } from "vuex";
import MuscleGroupSelector from "./components/MuscleGroupSelector.vue";

export default {
    components: {
        MuscleGroupSelector
    },
    data() {
        return {};
    },

    computed: mapState(["exercises", "muscles", "muscleGroups", "tools"]),
    methods: {},

    mounted() {
        this.$store.dispatch("getExercises");
        this.$store.dispatch("getMuscles");
        this.$store.dispatch("getMuscleGroups");
        this.$store.dispatch("getTools");
    }
};
</script>
