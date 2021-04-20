<template>
    <div class="workoutModalBackGround">
        <div class="row">
            <div class="col-2"></div>
            <div class="workoutModal col-8">
                <div class="row">
                    <div class="workoutModalHeader">
                        <button
                            class="btn btn-primary"
                            @click="completeExercise()"
                        >
                            Complete Exercise
                        </button>
                        <button
                            class="btn btn-primary"
                            @click="previousExercise()"
                        >
                            Previous Exercise
                        </button>
                        <button class="btn btn-primary" @click="skipExercise()">
                            Skip Exercise
                        </button>
                        reps

                        <input
                            type="text"
                            @input="updateSets"
                            :placeholder="[[sets]]"
                            class="form-control"
                        />

                        <button class="btn btn-primary" @click="saveWorkout()">
                            Save Workout
                        </button>
                        <button class="btn btn-primary" @click="stopWorkout()">
                            Stop Workout
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="workoutModalBody">
                        <div>{{ exercises[currentExercise].instruction }}</div>

                        <video
                            :src="gifUrl"
                            type="video/mp4"
                            autoplay
                            loop
                        ></video>
                    </div>
                </div>
                <div class="row">
                    <div class="workoutModalFooter">
                        <div v-if="workoutFinished">Workout Finished!</div>
                    </div>
                </div>
            </div>

            <div class="col-2"></div>
        </div>
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
            workoutFinished: state => state.workout.workoutFinished,
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
