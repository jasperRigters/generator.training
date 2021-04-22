<template>
    <div>
        <div class="container">
            <p>
                Number of sets for each exercise:<select
                    class="custom-select custom-select-sm"
                    @change="updateSets"
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
        </div>
        <button @click="startWorkout" class="btn btn-primary">
            Start Workout!
        </button>
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

<style scoped lang="scss">
.container {
    margin: 2em;
}
select {
    margin-left: 1em;
}
</style>
