<template>
    <div class="container">
        <div class="instruction">
            {{ exercises[currentExercise].instruction }}
        </div>
        <div class="image">
            <video :src="gifUrl" type="video/mp4" autoplay loop></video>
        </div>

        <div class="buttons">
            <button class="btn btn-primary" @click="completeExercise()">
                Complete Exercise
            </button>
            <button class="btn btn-primary" @click="skipExercise()">
                Skip Exercise
            </button>
        </div>

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

<style scoped lang="scss">
.image {
    margin-top: 2em;
    padding-bottom: 2em;
}
.buttons {
    position: absolute;
    bottom: 1em;
}
.instruction {
    width: 80%;
}
</style>
