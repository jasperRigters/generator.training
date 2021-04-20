<template>
    <div class="container">
        <button
            v-if="workoutGenerated"
            class="btn btn-primary"
            @click="startWorkout"
        >
            Start Workout!
        </button>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    methods: {
        ...mapActions("workout", ["startWorkout"])
    },
    computed: {
        ...mapState({
            workoutGenerated: state => state.workout.workoutGenerated
        })
    }
};
</script>

<style></style>
