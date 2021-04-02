<template>
    <div>
        <muscle-group-selector />
        <tool-selector />
        <muscles-image />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MuscleGroupSelector from "./components/MuscleGroupSelector.vue";
import MusclesImage from "./components/MusclesImage.vue";
import ToolSelector from "./components/ToolSelector.vue";

export default {
    components: {
        MuscleGroupSelector,
        ToolSelector,
        MusclesImage
    },
    data() {
        return {};
    },
    methods: {
        addOrRemoveById(input, data, id) {
            //Remove from input by id
            const filtered = input.filter(input => input.id != id);
            //Check if something was removed
            if (filtered.length === input.length) {
                //Nothing was removed so add by id
                filtered.push(data.find(data => data.id == id));
            }
            return filtered;
        }
    },
    created() {
        this.$store.dispatch("data/getExercises");
        this.$store.dispatch("data/getMuscles");
        this.$store.dispatch("data/getMuscleGroups");
        this.$store.dispatch("data/getTools");
    }
};
</script>
