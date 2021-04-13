export default {
    namespaced: true,
    state: {
        exercises: [],
        muscles: [],
        muscleGroups: [],
        tools: [],
        length: 4,
        presets: {},
        currentPresets: {
            muscles: 1,
            tools: 1
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
        getPresetMuscles(state, getters, rootState, rootGetters) {
            const muscles = rootState.data.muscles.filter(muscle =>
                state.presets.muscles[
                    state.currentPresets.muscles - 1
                ].muscles.includes(muscle.name)
            );
            return muscles;
        },
        getPresetTools(state, getters, rootState, rootGetters) {
            const tools = rootState.data.tools.filter(tools =>
                state.presets.tools[
                    state.currentPresets.tools - 1
                ].tools.includes(tools.name)
            );
            return tools;
        },

        getMuscleIds(state) {
            return state.muscles.map(muscle => muscle.id);
        },
        getToolIds(state) {
            return state.tools.map(tools => tools.id);
        },
        getLength(state) {
            return state.length;
        },
        getCurrentMusclePreset(state) {
            return state.currentPresets.muscles;
        },
        getToolPreset(state) {
            return state.currentPresets.tools;
        },
        getMusclePresetLength(state) {
            return state.presets.muscles.length;
        },
        getToolPresetLength(state) {
            return state.presets.tools.length;
        }
    },
    actions: {
        presetDec({ dispatch, commit, getters, rootGetters }, payload) {
            if (payload["type"] == "Muscles") {
                if (getters.getCurrentMusclePreset == 1) {
                    commit("setMusclePreset", getters.getMusclePresetLength);
                } else {
                    commit(
                        "setMusclePreset",
                        getters.getCurrentMusclePreset - 1
                    );
                }
                commit("setMuscles", getters.getPresetMuscles);
                dispatch("styles/changedSelection", null, { root: true });
            }
            if (payload["type"] == "Tools") {
                if (getters.getToolPreset == 1) {
                    commit("setToolPreset", getters.getToolPresetLength);
                } else {
                    commit("setToolPreset", getters.getToolPreset - 1);
                }
                commit("setTools", getters.getPresetTools);
            }
        },
        presetInc({ dispatch, commit, getters, rootGetters }, payload) {
            if (payload["type"] == "Muscles") {
                if (
                    getters.getCurrentMusclePreset ==
                    getters.getMusclePresetLength
                ) {
                    commit("setMusclePreset", 1);
                } else {
                    commit(
                        "setMusclePreset",
                        getters.getCurrentMusclePreset + 1
                    );
                }
                commit("setMuscles", getters.getPresetMuscles);
                dispatch("styles/changedSelection", null, { root: true });
            }
            if (payload["type"] == "Tools") {
                if (getters.getToolPreset == getters.getToolPresetLength) {
                    commit("setToolPreset", 1);
                } else {
                    commit("setToolPreset", getters.getToolPreset + 1);
                }
                commit("setTools", getters.getPresetTools);
            }
        }
        // savePreset({ state, getters, rootState, rootGetters }, payload) {
        //     return new Promise((resolve, reject) => {
        //         axios
        //             .post("/api/presets", {
        //                 params: {
        //                     type: ,
        //                     name: ,
        //                     items:
        //                 }
        //             })
        //             .then(response => {
        //                 resolve();
        //             });
        //     });
        // }
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
        setLength(state, length) {
            state.length = length;
        },
        setMusclePreset(state, payload) {
            state.currentPresets.muscles = payload;
        },
        setToolPreset(state, payload) {
            state.currentPresets.tools = payload;
        },
        setPresets(state, payload) {
            state.presets = payload;
        }
    }
};
