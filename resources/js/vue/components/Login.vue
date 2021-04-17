<template>
    <div class="container">
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Username:</label>
            <div class="col-sm-9">
                <input
                    type="text"
                    @input="updateUsername"
                    :value="username"
                    class="form-control"
                />
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-3 display-1 col-form-label">Password:</label>
            <div class="col-sm-9">
                <input
                    type="text"
                    @input="updatePassword"
                    :value="password"
                    class="form-control"
                />
            </div>
        </div>
        <div class="form-group row" v-if="signingIn">
            <label class="col-sm-3 col-form-label">Confirm password:</label>
            <div class="col-sm-9">
                <input
                    type="text"
                    @input="updateConfirm"
                    :value="confirm"
                    class="form-control"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-sm-9 offset-sm-3">
                <button class="btn btn-secondary" v-if="user" @click="logOut()">
                    Log Out
                </button>
                <div
                    v-else-if="signingIn"
                    class="d-flex justify-content-between"
                >
                    <button class="btn btn-primary" @click="signIn()">
                        Sign In
                    </button>
                    <button
                        class="btn btn-secondary btn-sm"
                        @click="startSigningIn(false)"
                    >
                        Cancel
                    </button>
                </div>
                <div v-else>
                    <button class="btn btn-primary" @click="logIn()">
                        Log In
                    </button>

                    <button
                        class="btn btn-secondary"
                        @click="startSigningIn(true)"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions("data", ["logIn", "signIn", "logOut", "startSigningIn"]),

        updateUsername(event) {
            this.$store.commit("selections/setUsername", event.target.value);
        },
        updatePassword(event) {
            this.$store.commit("selections/setPassword", event.target.value);
        },
        updateConfirm(event) {
            this.$store.commit("selections/setConfirm", event.target.value);
        }
    },
    computed: {
        ...mapState({
            user: state => state.data.user,
            signingIn: state => state.data.signingIn,
            username: state => state.selections.username,
            password: state => state.selections.password,
            confirm: state => state.selections.confirm
        })
    }
};
</script>

<style></style>
