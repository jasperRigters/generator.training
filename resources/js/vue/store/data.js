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
            return new Promise((resolve, reject) => {
                axios.get("api/exercises").then(response => {
                    commit("setExercises", response.data);
                    resolve();
                });
            });
        },
        getMuscles({ dispatch, commit, getters, rootGetters }) {
            return new Promise((resolve, reject) => {
                axios.get("api/muscles").then(response => {
                    commit("setMuscles", response.data);
                    commit(
                        "selections/setSelectedMuscles",
                        rootGetters["selections/getPresetMuscles"],
                        {
                            root: true
                        }
                    );
                    dispatch("styles/changedSelection", null, { root: true });
                    resolve();
                });
            });
        },
        getMuscleGroups({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("api/musclegroups").then(response => {
                    commit("setMuscleGroups", response.data);

                    resolve();
                });
            });
        },
        getTools({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("api/tools").then(response => {
                    commit("setTools", response.data);
                    commit("selections/setSelectedTools", response.data, {
                        root: true
                    });

                    resolve();
                });
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
