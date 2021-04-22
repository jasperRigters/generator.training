<template>
    <div class="workoutModalBackGround">
        <div class="row">
            <div class="col-1"></div>
            <div class="workoutModal col-10">
                <div class="workoutModalHeader">
                    <div class="row">
                        <div class="col-11"></div>
                        <div class="col-1 float-end">
                            <button
                                class="btn btn-primary"
                                @click="closeModal()"
                            >
                                x
                            </button>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="workoutModalBody">
                        <div
                            class="finishedWorkout"
                            v-if="modal == 'finishedWorkout'"
                        >
                            <finished-workout-modal />
                        </div>
                        <div
                            class="startingWorkout"
                            v-if="modal == 'startingWorkout'"
                        >
                            <starting-workout-modal />
                        </div>
                        <div
                            class="doingWorkout"
                            v-if="modal == 'doingWorkout'"
                        >
                            <doing-workout-modal />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="workoutModalFooter"></div>
                </div>
            </div>

            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DoingWorkoutModal from "./DoingWorkoutModal.vue";
import FinishedWorkoutModal from "./FinishedWorkoutModal.vue";
import StartingWorkoutModal from "./StartingWorkoutModal.vue";
export default {
    components: {
        FinishedWorkoutModal,
        DoingWorkoutModal,
        StartingWorkoutModal
    },
    data() {
        return {
            // video: `../../${exercises[currentExercise].name.replace(/ /g, "")}`
        };
    },
    methods: {
        ...mapActions("workout", [
            "closeModal",
            "completeExercise",
            "previousExercise",
            "skipExercise",
            "saveWorkout"
        ]),
        updateSets(event) {
            this.$store.commit("workout/setSets", event.target.value);
        }
    },
    computed: {
        ...mapState({
            currentExercise: state => state.workout.currentExercise,
            sets: state => state.workout.sets,
            exercises: state => state.workout.exercises,
            currentExercise: state => state.workout.currentExercise,
            gifUrl: state => state.workout.gifUrl,
            modal: state => state.workout.modal
        }),
        gifUrl() {
            var http = new XMLHttpRequest();
            http.open(
                "HEAD",
                ` ./images/exerciseGIF/${this.$store.state.workout.exercises[
                    this.$store.state.workout.currentExercise
                ].name.replace(/ /g, "")}.mp4`,
                false
            );
            http.send();
            if (http.status != 404) {
                return `
              ./images/exerciseGIF/${this.$store.state.workout.exercises[
                  this.$store.state.workout.currentExercise
              ].name.replace(/ /g, "")}.mp4`;
            }

            return "No Image Available";
        }
    }
};
</script>

<style scoped lang="scss"></style>
