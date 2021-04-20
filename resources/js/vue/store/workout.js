import axios from "axios";
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        exercises: [],
        loadCounter: [],
        sets: 4,
        doingWorkout: false,
        workoutGenerated: false,
        workoutFinished: false,
        currentExercise: 0,
        completedExercises: [],
        exerciseCounter: 0,
        gifUrl: ""
    },

    getters: {
        getWorkoutExerciseIds(state) {
            return state.exercises.map(exercise => exercise.id);
        }
    },

    actions: {
        startWorkout({ state, commit }) {
            if (state.workoutGenerated) {
                commit("setDoingWorkout", true);
            }
        },
        stopWorkout({ state, commit, dispatch }) {
            commit("setDoingWorkout", false);
        },
        saveWorkout({ state, getters, rootState }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        "/api/workout",
                        {
                            exercises: state.completedExercises,
                            user: rootState.data.user
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${rootState.data.token}`
                            }
                        }
                    )
                    .then(response => {
                        resolve();
                    })
                    .catch(error => {});
            });
        },
        completeExercise({ state, commit, getters, dispatch }) {
            if (
                !state.completedExercises
                    .map(completedExercise => completedExercise.id)
                    .includes(state.exercises[state.currentExercise].id)
            ) {
                commit("addCompletedExercise", {
                    id: state.exercises[state.currentExercise].id,
                    sets: 0
                });
            }
            commit("addCompletedExerciseSet");
            commit("increaseExerciseCounter");
            if (state.currentExercise == state.exercises.length - 1) {
                commit("setCurrentExercise", 0);
            } else {
                commit("setCurrentExercise", state.currentExercise + 1);
            }
            if (state.exerciseCounter == state.sets * state.exercises.length) {
                commit("setWorkoutFinished", true);
            }
        },

        previousExercise({ state, commit }) {
            if (state.currentExercise == 0) {
                commit("setCurrentExercise", state.exercises.length - 1);
            } else {
                commit("setCurrentExercise", state.currentExercise - 1);
            }
        },
        skipExercise({ state, commit }) {
            if (state.currentExercise == state.exercises.length - 1) {
                commit("setCurrentExercise", 0);
            } else {
                commit("setCurrentExercise", state.currentExercise + 1);
            }
            if (state.exerciseCounter == state.sets * state.exercises.length) {
                commit("setWorkoutFinished", true);
            }
            commit("increaseExerciseCounter");
        },
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
                        commit("setWorkoutGenerated");
                        commit("setWorkoutFinished", false);
                        commit("setExerciseCounter", 0);
                        commit("setCurrentExercise", 0);
                        Vue.prototype.$flashStorage.flash(
                            "Workout generated!",
                            "success",
                            { timeout: 3500 }
                        );
                        resolve();
                    })
                    .catch(error => {
                        Vue.prototype.$flashStorage.flash(
                            error.response.data.message,
                            "error",
                            { timeout: 3500 }
                        );
                    });
            });
        }
    },
    mutations: {
        setExercises(state, payload) {
            state.exercises = payload;
        },
        setMuscleLoadCounter(state, payload) {
            state.loadCounter = payload;
        },
        setWorkoutGenerated(state) {
            state.workoutGenerated = true;
        },
        setDoingWorkout(state, payload) {
            state.doingWorkout = payload;
        },
        setCurrentExercise(state, payload) {
            state.currentExercise = payload;
        },
        addCompletedExercise(state, payload) {
            state.completedExercises = [...state.completedExercises, payload];
        },
        setWorkoutFinished(state, payload) {
            state.workoutFinished = payload;
        },
        setSets(state, payload) {
            state.sets = payload;
        },
        increaseExerciseCounter(state) {
            state.exerciseCounter += 1;
        },
        setExerciseCounter(state, payload) {
            state.exerciseCounter = payload;
        },
        setGifUrl(state, payload) {
            state.gifUrl = payload;
        },
        addCompletedExerciseSet(state) {
            console.log(state.completedExercises);
            state.completedExercises[
                state.completedExercises.indexOf(
                    state.completedExercises.find(
                        exercise =>
                            exercise.id ==
                            state.exercises[state.currentExercise].id
                    )
                )
            ].sets += 1;
            console.log(state.completedExercises);
        }
    }
};
