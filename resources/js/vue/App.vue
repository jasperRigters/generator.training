<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <preset-selector type="muscles" />
                <div class="container">
                    <nav class=" navbar-expand-lg">
                        <button
                            class="navbar-toggler btn btn-primary"
                            data-toggle="collapse"
                            data-target="#muscles"
                        >
                            Edit Muscles
                        </button>
                        <div class="collapse navbar-collapse" id="muscles">
                            <item-selector type="muscles" />
                        </div>
                    </nav>
                </div>

                <preset-selector type="tools" />
                <div class="container">
                    <nav class=" navbar-expand-lg">
                        <button
                            class="navbar-toggler btn btn-primary"
                            data-toggle="collapse"
                            data-target="#tools"
                        >
                            Edit Tools
                        </button>
                        <div class="collapse navbar-collapse" id="tools">
                            <item-selector type="tools" />
                        </div>
                    </nav>
                </div>
            </div>

            <div class="col-md-4">
                <nav class=" navbar-expand-lg">
                    <button
                        class="navbar-toggler btn btn-primary"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        Login
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <login />
                    </div>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <muscles-image />
            </div>
            <div class="col-sm-4"></div>
        </div>

        <workout-generator />
        <start-workout class="exists" />
        <workout-modal v-if="modal && !closedModal" />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DoingWorkoutModal from "./components/modals/DoingWorkoutModal.vue";
import FinishedWorkoutModal from "./components/modals/FinishedWorkoutModal.vue";
import Login from "./components/Login.vue";

import MusclesImage from "./components/MusclesImage.vue";
import PresetSelector from "./components/PresetSelector.vue";
import StartWorkout from "./components/StartWorkout.vue";

import WorkoutGenerator from "./components/WorkoutGenerator.vue";
import WorkoutModal from "./components/modals/WorkoutModal.vue";
import ItemSelector from "./components/ItemSelector.vue";

export default {
    components: {
        MusclesImage,
        WorkoutGenerator,
        PresetSelector,
        Login,
        StartWorkout,
        WorkoutModal,
        DoingWorkoutModal,
        FinishedWorkoutModal,
        ItemSelector
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
.navbar-toggler {
    background-color: blue;
}
.exists {
    min-height: 3em;
}
</style>
