<template>
    <div>
        <div>
            {{ exercises[currentExercise].instruction }}
        </div>

        <video :src="gifUrl" type="video/mp4" autoplay loop></video>
        <button class="btn btn-primary" @click="completeExercise()">
            Complete Exercise
        </button>
        <button class="btn btn-primary" @click="skipExercise()">
            Skip Exercise
        </button>
        <!-- <button class="btn btn-primary" @click="previousExercise()">
            Previous Exercise
        </button> -->
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
            "completeExercise",
            "previousExercise",
            "skipExercise"
        ])
    },
    computed: {
        ...mapState({
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
