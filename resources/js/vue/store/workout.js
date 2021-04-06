import axios from "axios";

export default {
    namespaced: true,
    state: {
        exercises: [],
        loadCounter: []
    },

    getters: {},

    actions: {
        generateWorkout({ dispatch, commit, getters, rootGetters }) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/api/workout", {
                        params: {
                            muscles:
                                rootGetters["selections/getSelectedMuscleIds"],
                            tools: rootGetters["selections/getSelectedToolIds"],
                            length: rootGetters["selections/getSelectedLength"]
                        }
                    })
                    .then(response => {
                        const allExercises = rootGetters["data/getExercises"];

                        commit(
                            "setExercises",
                            response.data.exercises.map(exercise =>
                                allExercises.find(
                                    dataExercise => dataExercise.id == exercise
                                )
                            )
                        );
                        commit(
                            "setMuscleLoadCounter",

                            response.data.loadCounter
                        ),
                            commit(
                                "styles/setMuscleStyles",
                                rootGetters["styles/getMuscleLoadStyles"],
                                { root: true }
                            );
                    });
                resolve();
            });
        }
    },
    mutations: {
        setExercises(state, payload) {
            state.exercises = payload;
        },
        setMuscleLoadCounter(state, payload) {
            state.loadCounter = payload;
        }
    }
};
