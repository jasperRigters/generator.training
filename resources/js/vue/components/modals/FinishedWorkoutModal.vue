<template>
    <div>
        <button class="btn btn-primary" @click="saveWorkout()">
            Save Workout
        </button>
        asdasdasd
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            // video: `../../${exercises[currentExercise].name.replace(/ /g, "")}`
        };
    },
    methods: {
        ...mapActions("workout", [
            "stopWorkout",
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
            finishedWorkout: state => state.workout.finishedWorkout,
            exercises: state => state.workout.exercises,
            currentExercise: state => state.workout.currentExercise,
            gifUrl: state => state.workout.gifUrl
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

<style></style>
