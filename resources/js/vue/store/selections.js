export default {
    namespaced: true,
    state: {
        selectedExercises: [],
        selectedMuscles: [],
        selectedMuscleGroups: [],
        selectedTools: [],
        selectedLength: 4,
        presets: [
            {
                name: "Push",
                muscles: [
                    "Glutes",
                    "Forearms",
                    "Anterior Deltoids",
                    "Medial Deltoids"
                ]
            },
            {
                name: "Pull",
                muscles: ["Anterior Deltoids", "Medial Deltoids"]
            }
        ],
        selectedPreset: "Push"
    },

    getters: {
        getPresetMuscles(state, getters, rootState, rootGetters) {
            const preset = state.presets.find(
                preset => preset.name === state.selectedPreset
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
        getSelectedMuscleIds(state) {
            return state.selectedMuscles.map(muscle => muscle.id);
        },
        getSelectedToolIds(state) {
            return state.selectedTools.map(tools => tools.id);
        },
        getSelectedLength(state) {
            return state.selectedLength;
        }
    },
    actions: {},
    mutations: {
        setSelectedExercises(state, exercises) {
            state.selectedExercises = exercises;
        },
        setSelectedMuscles(state, muscles) {
            state.selectedMuscles = muscles;
        },
        setSelectedMuscleGroups(state, muscleGroups) {
            state.selectedMuscleGroups = muscleGroups;
        },
        setSelectedTools(state, tools) {
            state.selectedTools = tools;
        },
        setSelectedLength(state, length) {
            state.selectedLength = length;
        }
    }
};
