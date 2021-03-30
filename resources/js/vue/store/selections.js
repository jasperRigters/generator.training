export default {
    namespaced: true,
    state: {
        selectedExercises: [],
        selectedMuscles: [],
        selectedMuscleGroups: [],
        selectedTools: []
    },

    getters: {},
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
        }
    }
};
