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
            unselected: { fill: "black" }
        }
    },

    getters: {
        getMuscleStyles(state, getters, rootState, rootGetters) {
            const styles = rootState.data.muscles.map(muscle => {
                const selectedMuscleNames = rootState.selections.selectedMuscles.map(
                    muscle => muscle.name
                );
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
            commit("setMuscleStyles", getters.getMuscleStyles);
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
