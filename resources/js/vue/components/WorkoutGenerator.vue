<template>
    <div>
        <input type="text" @input="updateLength" :value="length" />
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
