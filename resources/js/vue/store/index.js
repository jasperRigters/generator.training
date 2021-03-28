import axios from "axios";
export default {
    state: {
        exercises: "bla",
        muscles: "bla",
        tools: "bla"
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
        setTools(state, tools) {
            state.tools = tools;
        }
    }
};
