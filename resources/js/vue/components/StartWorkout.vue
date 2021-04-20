<template>
    <div class="container">
        <button
            v-if="workoutGenerated"
            class="btn btn-primary"
            @click="selectWorkout"
        >
            Select this Workout!
        </button>
        <button
            v-if="modal && closedModal"
            class="btn btn-primary"
            @click="openModal"
        >
            Back to Workout!
        </button>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    methods: {
        ...mapActions("workout", ["selectWorkout"]),
        openModal() {
            this.$store.commit("workout/openModal");
        }
    },
    computed: {
        ...mapState({
            workoutGenerated: state => state.workout.workoutGenerated,
            modal: state => state.workout.modal,
            closedModal: state => state.workout.closedModal
        })
    }
};
</script>

<style></style>
