<template>
    <div>
        <muscle-group-selector />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MuscleGroupSelector from "./components/MuscleGroupSelector.vue";

export default {
    components: {
        MuscleGroupSelector
    },
    data() {
        return {};
    },

    created() {
        this.$store.dispatch("data/getExercises");
        this.$store.dispatch("data/getMuscles");
        this.$store.dispatch("data/getMuscleGroups");
        this.$store.dispatch("data/getTools");
    }
};
</script>
