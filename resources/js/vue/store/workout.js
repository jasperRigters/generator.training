import axios from "axios";

export default {
    namespaced: true,
    state: {
        exercises: [],
        loadCounter: []
    },

    getters: {},

    actions: {
        generateWorkout({ dispatch, commit, getters, rootGetters }) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/api/workout", {
                        params: {
                            muscles:
                                rootGetters["selections/getSelectedMuscleIds"],
                            tools: rootGetters["selections/getSelectedToolIds"],
                            length: rootGetters["selections/getSelectedLength"]
                        }
                    })
                    .then(response => {
                        commit("setExercises", response.data.exercises);
                    });
                resolve();
            });
        }
    },
    mutations: {
        setExercises(state, exercises) {
            state.exercises = exercises;
        }
    }
};
