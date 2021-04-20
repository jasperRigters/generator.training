<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <selector type="muscles" /> <selector type="tools" />
            </div>

            <div class="col-sm-4">
                <login />
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <muscles-image />
            </div>
            <div class="col-sm-4"></div>
        </div>

        <workout-generator />
        <start-workout />
        <workout-modal v-if="modal && !closedModal" />

        <muscle-group-selector />
        <tool-selector />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DoingWorkoutModal from "./components/modals/DoingWorkoutModal.vue";
import FinishedWorkoutModal from "./components/modals/FinishedWorkoutModal.vue";
import Login from "./components/Login.vue";
import MuscleGroupSelector from "./components/MuscleGroupSelector.vue";
import MusclesImage from "./components/MusclesImage.vue";
import Selector from "./components/Selector.vue";
import StartWorkout from "./components/StartWorkout.vue";
import ToolSelector from "./components/ToolSelector.vue";
import WorkoutGenerator from "./components/WorkoutGenerator.vue";
import WorkoutModal from "./components/modals/WorkoutModal.vue";

export default {
    components: {
        MuscleGroupSelector,
        ToolSelector,
        MusclesImage,
        WorkoutGenerator,
        Selector,
        Login,
        StartWorkout,
        WorkoutModal,
        DoingWorkoutModal,
        FinishedWorkoutModal
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
        this.$store.dispatch("data/getExercisesData");
        this.$store.dispatch("data/getMusclesData");
        this.$store.dispatch("data/getMuscleGroupsData");
        this.$store.dispatch("data/getToolsData");
        this.$store.dispatch("data/getPresetsData");
    },
    computed: {
        ...mapState({
            modal: state => state.workout.modal,
            closedModal: state => state.workout.closedModal
        })
    }
};
</script>
<style lang="scss">
@import "../../sass/app.scss";
</style>
