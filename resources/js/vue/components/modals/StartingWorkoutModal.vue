<template>
    <div>
        <div>
            <input
                type="text"
                @input="updateSets"
                :placeholder="[[sets]]"
                class="form-control"
            />
        </div>
        <button @click="startWorkout">Start Workout!</button>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    methods: {
        ...mapActions("workout", ["startWorkout"]),

        updateSets(event) {
            this.$store.commit("workout/setSets", event.target.value);
        }
    },
    computed: {
        ...mapState({
            sets: state => state.workout.sets
        })
    }
};
</script>

<style></style>
