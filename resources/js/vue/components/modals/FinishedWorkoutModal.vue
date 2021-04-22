<template>
    <div class="container">
        <div v-if="user">
            <button class="btn btn-primary" @click="saveWorkout()">
                Save Workout
            </button>
        </div>
        <div v-else>
            <div>Log in to save your workout!</div>
            <div class="container">
                <login />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Login from "../Login.vue";

export default {
    components: { Login },
    data() {
        return {
            // video: `../../${exercises[currentExercise].name.replace(/ /g, "")}`
        };
    },
    methods: {
        ...mapActions("workout", ["saveWorkout"])
    },
    computed: {
        ...mapState({
            user: state => state.data.user
        })
    }
};
</script>

<style scoped></style>
