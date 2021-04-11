import axios from "axios";
export default {
    namespaced: true,
    state: {
        loggedIn: false,
        exercises: [],
        muscles: [],
        muscleGroups: [],
        tools: [],
        presets: {
            muscles: [
                {
                    id: 1,
                    name: "Push",
                    muscles: [
                        "Posterior Deltoids",
                        "Medial Deltoids",
                        "Pectoralis Major",
                        "Quadriceps",
                        "Medial Head",
                        "Long Head",
                        "Lateral Head",
                        "Gastrocnemius",
                        "Soleus"
                    ],
                    src: "./images/presets/push.jpeg"
                },
                {
                    id: 2,
                    name: "Pull",
                    muscles: [
                        "Anterior Deltoids",
                        "Trapezius",
                        "Latissimus Dorsi",
                        "Lower Back",
                        "Hamstrings",
                        "Biceps Brachii",
                        "Brachialis"
                    ],
                    src: "./images/presets/pull.jpeg"
                }
            ],
            tools: [
                {
                    id: 1,
                    name: "Dumbell",
                    tools: ["Dumbell"],
                    src: "./images/presets/dumbells.jpeg"
                },
                {
                    id: 2,
                    name: "Bodyweight",
                    tools: ["Bodyweight"],
                    src: "./images/presets/bodyweight.jpeg"
                }
            ]
        }
    },

    getters: {
        getPresetImageUrls(state) {
            const presetObject = {};

            for (const presetCat in state.presets) {
                presetObject[presetCat] = {};
                for (const presetItem in state.presets[presetCat]) {
                    presetObject[presetCat][
                        state.presets[presetCat][presetItem].name
                    ] = state.presets[presetCat][presetItem].src;
                }
            }

            return presetObject;
        },
        getExercises(state) {
            return state.exercises;
        },
        getMuscles(state) {
            return state.muscles;
        },
        getMusclePresetLength(state) {
            return state.presets.muscles.length;
        },
        getToolPresetLength(state) {
            return state.presets.tools.length;
        }
    },

    actions: {
        logIn({ dispatch, commit, getters, rootGetters }, payload) {
            console.log(payload);
        },
        signIn({ dispatch, commit, getters, rootGetters }, payload) {
            console.log(payload);
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
