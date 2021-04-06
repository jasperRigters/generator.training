export default {
    namespaced: true,
    state: {
        background: { fill: "Beige" },
        outline: { fill: "BurlyWood" },
        head: { fill: "BurlyWood" },
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
            unselected: { fill: "black" },
            1: { opacity: 0.083, fill: "red" },
            2: { opacity: 0.166, fill: "red" },
            3: { opacity: 0.25, fill: "red" },
            4: { opacity: 0.333, fill: "red" },
            5: { opacity: 0.426, fill: "red" },
            6: { opacity: 0.5, fill: "red" },
            7: { opacity: 0.583, fill: "red" },
            8: { opacity: 0.666, fill: "red" },
            9: { opacity: 0.75, fill: "red" },
            10: { opacity: 0.833, fill: "red" },
            11: { opacity: 0.916, fill: "red" },
            12: { opacity: 1, fill: "red" }
        }
    },

    getters: {
        getMuscleLoadStyles(state, getters, rootState, rootGetters) {
            const allMuscles = rootGetters["data/getMuscles"];
            const muscleLoadStyles = Object.keys(
                rootState.workout.loadCounter
            ).map(muscle => {
                const muscleName = allMuscles.find(
                    allMuscle => allMuscle.id == muscle
                );

                return {
                    name: muscleName.name,

                    style:
                        rootState.styles.colors[
                            rootState.workout.loadCounter[muscle] * 4
                        ]
                };
            });

            return muscleLoadStyles;
        },
        getSelectedMuscleStyles(state, getters, rootState) {
            const selectedMuscleNames = rootState.selections.selectedMuscles.map(
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
