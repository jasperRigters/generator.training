<template>
    <div>
        <p>
            Username:<input type="text" v-model="username" /> Password:<input
                type="text"
                v-model="password"
            />
        </p>
        <p>
            <button
                class="loginButton"
                @click="logIn({ username: username, password: password })"
            >
                Log In
            </button>
        </p>
        <p>
            <button class="signInButton" @click="signIn()">
                Sign In
            </button>
        </p>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        ...mapActions("data", ["logIn", "signIn"])
    }
};
</script>

<style></style>
