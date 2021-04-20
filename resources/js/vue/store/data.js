import axios from "axios";
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        loggedIn: false,
        exercises: [],
        muscles: [],
        muscleGroups: [],
        tools: [],
        token: "",
        user: "",
        signingIn: false
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
        startSigningIn({ commit }, payload) {
            commit("setSigningIn", payload);
        },
        logIn({ dispatch, commit, getters, rootGetters, rootState }) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/login", {
                        name: rootState.selections.username,
                        password: rootState.selections.password
                    })
                    .then(response => {
                        commit("setUser", response.data.user.id);
                        dispatch("getPresetsData");
                        commit("setToken", response.data.token);
                        commit("selections/setUsername", "", { root: true });
                        commit("selections/setPassword", "", { root: true });
                        commit("selections/setConfirm", "", { root: true });

                        Vue.prototype.$flashStorage.flash(
                            `Welcome ${response.data.user.email}`,
                            "success",
                            { timeout: 3500 }
                        );
                        resolve();
                    })
                    .catch(error => {
                        Vue.prototype.$flashStorage.flash(
                            error.response.data.message,
                            "error",
                            { timeout: 3500 }
                        );
                    });
            });
        },
        logOut({ state, dispatch, commit, rootGetters }) {
            axios
                .post(
                    "/api/logout",
                    {},
                    {
                        headers: { Authorization: `Bearer ${state.token}` }
                    }
                )
                .then(response => {
                    commit("selections/setMusclePreset", 1, { root: true });
                    commit("setUser", "");
                    Vue.prototype.$flashStorage.flash("Goodbye!", "info", {
                        timeout: 3500
                    });
                    dispatch("getPresetsData");
                })
                .catch(error => {
                    Vue.prototype.$flashStorage.flash(
                        error.response.data.message,
                        "error",
                        { timeout: 3500 }
                    );
                });
        },
        signIn({ dispatch, commit, getters, rootGetters, rootState }) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/register", {
                        name: rootState.selections.username,
                        email: rootState.selections.username,
                        password: rootState.selections.password,
                        password_confirmation: rootState.selections.confirm
                    })
                    .then(response => {
                        dispatch("logIn");
                        commit("setSigningIn", false);
                        commit("selections/setUsername", "", { root: true });
                        commit("selections/setPassword", "", { root: true });
                        commit("selections/setConfirm", "", { root: true });
                        resolve();
                    })
                    .catch(error => {
                        Vue.prototype.$flashStorage.flash(
                            error.response.data.message,
                            "error",
                            { timeout: 3500 }
                        );
                    });
            });
        },
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
        getPresetsData({ state, dispatch, commit, getters, rootGetters }) {
            return new Promise((resolve, reject) => {
                axios
                    .get("api/presets", { params: { user: state.user } })
                    .then(response => {
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
                        dispatch("styles/changedSelection", null, {
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
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setSigningIn(state, payload) {
            state.signingIn = payload;
        }
    }
};
