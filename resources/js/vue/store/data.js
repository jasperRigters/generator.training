import axios from "axios";
export default {
    namespaced: true,
    state: {
        loggedIn: false,
        exercises: [],
        muscles: [],
        muscleGroups: [],
        tools: []
    },

    getters: {
        getExercises(state) {
            return state.exercises;
        },
        getMuscles(state) {
            return state.muscles;
        }
    },

    actions: {
        logIn({ dispatch, commit, getters, rootGetters }, payload) {
            console.log(payload);
        },
        signIn({ dispatch, commit, getters, rootGetters }) {},
        getExercisesData({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("api/exercises").then(response => {
                    commit("setExercises", response.data);
                    resolve();
                });
            });
        },
        getMusclesData({ dispatch, commit, getters, rootGetters }) {
            return new Promise((resolve, reject) => {
                axios.get("api/muscles").then(response => {
                    commit("setMuscles", response.data);
                    resolve();
                });
            });
        },
        getMuscleGroupsData({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("api/musclegroups").then(response => {
                    commit("setMuscleGroups", response.data);

                    resolve();
                });
            });
        },
        getToolsData({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("api/tools").then(response => {
                    commit("setTools", response.data);
                    commit("selections/setTools", response.data, {
                        root: true
                    });

                    resolve();
                });
            });
        },
        getPresetsData({ dispatch, commit, getters, rootGetters }) {
            return new Promise((resolve, reject) => {
                axios.get("api/presets").then(response => {
                    commit("selections/setPresets", response.data, {
                        root: true
                    });
                    commit(
                        "selections/setTools",
                        rootGetters["selections/getPresetTools"],
                        {
                            root: true
                        }
                    );
                    commit(
                        "selections/setMuscles",
                        rootGetters["selections/getPresetMuscles"],
                        {
                            root: true
                        }
                    );
                    dispatch("styles/changedSelection", null, { root: true });

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
        },
        setLoggedIn(state) {
            state.loggedIn = True;
        }
    }
};
