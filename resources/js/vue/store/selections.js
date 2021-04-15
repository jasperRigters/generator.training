import axios from "axios";

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
        },
        presetValidation: false
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
                    state.currentPresets.muscles
                ].muscles.includes(muscle.name)
            );
            return muscles;
        },
        getPresetTools(state, getters, rootState, rootGetters) {
            const tools = rootState.data.tools.filter(tools =>
                state.presets.tools[state.currentPresets.tools].tools.includes(
                    tools.name
                )
            );
            return tools;
        },
        getPresetNames(state) {
            const names = {
                muscles: state.presets.muscles
                    ? state.presets.muscles[state.currentPresets.muscles].name
                    : " ",
                tools: state.presets.tools
                    ? state.presets.tools[state.currentPresets.tools].name
                    : " "
            };

            return names;
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
            if (payload["type"] == "muscles") {
                if (getters.getCurrentMusclePreset <= 1) {
                    commit(
                        "setMusclePreset",
                        getters.getMusclePresetLength - 1
                    );
                } else {
                    commit(
                        "setMusclePreset",
                        getters.getCurrentMusclePreset - 1
                    );
                }
                commit("setMuscles", getters.getPresetMuscles);
                dispatch("styles/changedSelection", null, { root: true });
            }
            if (payload["type"] == "tools") {
                if (getters.getToolPreset <= 1) {
                    commit("setToolPreset", getters.getToolPresetLength - 1);
                } else {
                    commit("setToolPreset", getters.getToolPreset - 1);
                }
                commit("setTools", getters.getPresetTools);
            }
        },
        presetInc({ dispatch, commit, getters, rootGetters }, payload) {
            if (payload["type"] == "muscles") {
                if (
                    getters.getCurrentMusclePreset ==
                    getters.getMusclePresetLength - 1
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
            if (payload["type"] == "tools") {
                if (getters.getToolPreset == getters.getToolPresetLength - 1) {
                    commit("setToolPreset", 1);
                } else {
                    commit("setToolPreset", getters.getToolPreset + 1);
                }
                commit("setTools", getters.getPresetTools);
            }
        },
        savePreset({ rootState, dispatch }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        "/api/presets",
                        {
                            type: payload.type,
                            name: payload.name,
                            items: payload.items,
                            user: payload.user
                        },

                        {
                            headers: {
                                Authorization: `Bearer ${rootState.data.token}`
                            }
                        }
                    )
                    .then(response => {
                        console.log(response);
                        dispatch("data/getPresetsData", null, { root: true });
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
            const addedCustom = {
                muscles: [{ name: "Custom" }, ...payload.muscles],
                tools: [{ name: "Custom" }, ...payload.tools]
            };
            state.presets = addedCustom;
        }
    }
};
