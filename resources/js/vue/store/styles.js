export default {
    namespaced: true,
    state: {
        background: { fill: "Beige" },
        outline: { fill: "black" },
        head: { fill: "DarkSalmon" },
        other: { fill: "DarkSalmon" },
        muscles: {
            Trapezius: {},
            "Latissimus Dorsi": {},
            "Lower Back": {},
            "Tibialis Anterior": {},
            Forearms: {},
            Glutes: {},
            Hamstrings: {},
            Quadriceps: {},
            Gastrocnemius: {},
            Soleus: {},
            "Rectus Abdominis": {},
            Obliques: {},
            "Pelvic Floor": {},
            "Pectoralis Major": {},
            "Serratus Anterior": {},
            "Biceps Brachii": {},
            Brachialis: {},
            "Lateral Head": {},
            "Medial Head": {},
            "Long Head": {},
            "Posterior Deltoids": {},
            "Medial Deltoids": {},
            "Anterior Deltoids": {}
        },
        colors: {
            selected: { fill: "red" },
            unselected: { opacity: 0.1, fill: "red" },
            1: { opacity: 0.166, fill: "red" },
            2: { opacity: 0.232, fill: "red" },
            3: { opacity: 0.298, fill: "red" },
            4: { opacity: 0.364, fill: "red" },
            5: { opacity: 0.43, fill: "red" },
            6: { opacity: 0.496, fill: "red" },
            7: { opacity: 0.562, fill: "red" },
            8: { opacity: 0.694, fill: "red" },
            9: { opacity: 0.76, fill: "red" },
            10: { opacity: 0.826, fill: "red" },
            11: { opacity: 0.892, fill: "red" },
            12: { opacity: 0.95, fill: "red" }
        }
    },

    getters: {
        getMuscleLoadStyles(state, getters, rootState, rootGetters) {
            const muscleLoadStyles = rootGetters["data/getMuscles"].map(
                muscle => {
                    if (
                        Object.keys(rootState.workout.loadCounter)
                            .map(elem => parseInt(elem, 10))
                            .includes(muscle.id)
                    ) {
                        return {
                            name: muscle.name,

                            style:
                                rootState.styles.colors[
                                    rootState.workout.loadCounter[muscle.id]
                                ]
                        };
                    }
                    return {
                        name: muscle.name,

                        style: rootState.styles.colors["unselected"]
                    };
                }
            );
            return muscleLoadStyles;
        },
        getSelectedMuscleStyles(state, getters, rootState) {
            const selectedMuscleNames = rootState.selections.muscles.map(
                muscle => muscle.name
            );
            const styles = rootState.data.muscles.map(muscle => {
                if (selectedMuscleNames.includes(muscle.name)) {
                    return {
                        name: muscle.name,
                        style: rootState.styles.colors["selected"]
                    };
                }
                return {
                    name: muscle.name,
                    style: rootState.styles.colors["unselected"]
                };
            });

            return styles;
        }
    },
    actions: {
        changedSelection({ dispatch, commit, getters, rootGetters }) {
            commit("setMuscleStyles", getters.getSelectedMuscleStyles);
        }
    },
    mutations: {
        setMuscleStyles(state, payload) {
            payload.forEach(muscle => {
                state.muscles[muscle.name] = muscle.style;
            });
        }
    }
};
