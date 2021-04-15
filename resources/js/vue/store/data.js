import axios from "axios";
export default {
    namespaced: true,
    state: {
        loggedIn: false,
        exercises: [],
        muscles: [],
        muscleGroups: [],
        tools: [],
        token: "",
        user: ""
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
            axios
                .post("/api/login", {
                    email: payload.email,
                    password: payload.password
                })
                .then(response => {
                    commit("setUser", response.data.user.id);
                    dispatch("getPresetsData");
                    commit("setToken", response.data.token);
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
                    dispatch("getPresetsData");
                });
        },
        signIn({ dispatch, commit, getters, rootGetters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/register", {
                        name: payload.name,
                        email: payload.email,
                        password: payload.password,
                        password_confirmation: payload.confirm
                    })
                    .then(response => {
                        dispatch("logIn", {
                            email: payload.email,
                            password: payload.password
                        });
                        console.log(response);
                        resolve();
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
                        console.log(response);
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
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    }
};
