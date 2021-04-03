import axios from "axios";

export default {
    namespaced: true,
    state: {
        generatedWorkout: []
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
                            tools: rootGetters["selections/getSelectedToolIds"]
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                    });
                resolve();
            });
        }
    },
    mutations: {}
};
