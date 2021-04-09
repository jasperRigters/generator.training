export default {
    namespaced: true,
    state: {
        exercises: [],
        muscles: [],
        muscleGroups: [],
        tools: [],
        length: 4,
        presets: {
            muscles: 1,
            tools: 1
        }
    },

    getters: {
        getPresetMuscles(state, getters, rootState, rootGetters) {
            const preset = rootState.data.presets.muscles.find(
                presetMuscle => presetMuscle.id === state.presets.muscles
            );

            const presetMuscles = rootState.data.muscles.filter(muscle => {
                const muscleName = preset.muscles.find(preset => {
                    if (preset === muscle.name) {
                        return true;
                    }
                });

                if (muscleName === muscle.name) {
                    return true;
                }
            });
            return presetMuscles;
        },
        getPresetTools(state, getters, rootState, rootGetters) {
            const preset = rootState.data.presets.tools.find(
                presetTool => presetTool.id === state.presets.tools
            );

            const presetTools = rootState.data.tools.filter(tool => {
                const toolName = preset.tools.find(preset => {
                    if (preset === tool.name) {
                        return true;
                    }
                });

                if (toolName === tool.name) {
                    return true;
                }
            });

            return presetTools;
        },
        getPresetToolsName(state, getters, rootState, rootGetters) {
            return rootState.data.presets.tools[getters.getToolPreset - 1].name;
        },
        getPresetMusclesName(state, getters, rootState, rootGetters) {
            return rootState.data.presets.muscles[getters.getMusclePreset - 1]
                .name;
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
        getMusclePreset(state) {
            return state.presets.muscles;
        },
        getToolPreset(state) {
            return state.presets.tools;
        }
    },
    actions: {
        presetDec({ dispatch, commit, getters, rootGetters }, payload) {
            if (payload["type"] == "Muscles") {
                if (getters.getMusclePreset == 1) {
                    commit(
                        "setMusclePreset",
                        rootGetters["data/getMusclePresetLength"]
                    );
                } else {
                    commit("setMusclePreset", getters.getMusclePreset - 1);
                }
                commit("setMuscles", getters.getPresetMuscles);
                dispatch("styles/changedSelection", null, { root: true });
            }
            if (payload["type"] == "Tools") {
                if (getters.getToolPreset == 1) {
                    commit(
                        "setToolPreset",
                        rootGetters["data/getToolPresetLength"]
                    );
                } else {
                    commit("setToolPreset", getters.getToolPreset - 1);
                }
                commit("setTools", getters.getPresetTools);
            }
        },
        presetInc({ dispatch, commit, getters, rootGetters }, payload) {
            if (payload["type"] == "Muscles") {
                if (
                    getters.getMusclePreset ==
                    rootGetters["data/getMusclePresetLength"]
                ) {
                    commit("setMusclePreset", 1);
                } else {
                    commit("setMusclePreset", getters.getMusclePreset + 1);
                }
                commit("setMuscles", getters.getPresetMuscles);
                dispatch("styles/changedSelection", null, { root: true });
            }
            if (payload["type"] == "Tools") {
                if (
                    getters.getToolPreset ==
                    rootGetters["data/getToolPresetLength"]
                ) {
                    commit("setToolPreset", 1);
                } else {
                    commit("setToolPreset", getters.getToolPreset + 1);
                }
                commit("setTools", getters.getPresetTools);
            }
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
            state.presets.muscles = payload;
        },
        setToolPreset(state, payload) {
            state.presets.tools = payload;
        }
    }
};
