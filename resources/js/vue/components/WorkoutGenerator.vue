<template>
    <div>
        <button @click="generateWorkout()"></button>
        {{ workoutExercises.map(exercise => exercise.name) }}
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    methods: {
        ...mapActions("workout", ["generateWorkout"])
    },
    computed: {
        ...mapState({
            workoutExercises: state => state.workout.exercises
        })
    }
};
</script>

<style scoped>
button {
    height: 50px;
    width: 50px;
}
</style>
