<template>
    <div class="container">
        <p>
            Select number of exercises:
            <select
                class="custom-select custom-select-sm"
                @change="updateLength"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option selected value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
        </p>

        <button @click="generateWorkout()" class="btn btn-primary">
            Generate!
        </button>
        {{ workoutExercises.map(exercise => exercise.name) }}
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    methods: {
        ...mapActions("workout", ["generateWorkout"]),
        updateLength(event) {
            console.log(event.target.value);
            this.$store.commit("selections/setLength", event.target.value);
        }
    },
    computed: {
        ...mapState({
            workoutExercises: state => state.workout.exercises,
            length: state => state.selections.length
        })
    }
};
</script>

<style scoped>
button {
    height: 50px;
    width: 200px;
}
</style>
