import axios from "axios";
export default {
    namespaced: true,
    state: {
        exercises: [],
        muscles: [],
        muscleGroups: [],
        tools: []
    },

    getters: {},

    actions: {
        getExercises({ commit }) {
            axios.get("api/exercises").then(response => {
                commit("setExercises", response.data);
            });
        },
        getMuscles({ commit }) {
            axios.get("api/muscles").then(response => {
                commit("setMuscles", response.data);
            });
        },
        getMuscleGroups({ commit }) {
            axios.get("api/musclegroups").then(response => {
                commit("setMuscleGroups", response.data);
            });
        },
        getTools({ commit }) {
            axios.get("api/tools").then(response => {
                commit("setTools", response.data);
            });
        }
    },
    mutations: {
        setExercises(state, exercises) {
            state.exercises = exercises;
        },
        setMuscles(state, muscles) {
            state.muscles = muscles;
        },
        setMuscleGroups(state, muscleGroups) {
            state.muscleGroups = muscleGroups;
        },
        setTools(state, tools) {
            state.tools = tools;
        }
    }
};
