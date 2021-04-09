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
                            muscles: rootGetters["selections/getMuscleIds"],
                            tools: rootGetters["selections/getToolIds"],
                            length: rootGetters["selections/getLength"]
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
