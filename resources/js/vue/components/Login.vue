<template>
    <div>
        <p>
            E-mail:<input type="text" v-model="email" /> Password:<input
                type="text"
                v-model="password"
            />
        </p>
        <p>
            <button
                class="loginButton"
                @click="logIn({ email: email, password: password })"
            >
                Log In
            </button>
            <button class="loginButton" @click="logOut()">
                Log Out
            </button>
        </p>
        <p>
            E-mail:<input type="text" v-model="email" /> Password:<input
                type="text"
                v-model="password"
            />
            Confirm password:<input type="text" v-model="confirm" />
            <button
                class="signInButton"
                @click="
                    signIn({
                        name: email,
                        email: email,
                        password: password,
                        confirm: confirm
                    })
                "
            >
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
            email: "",
            password: "",
            confirm: ""
        };
    },
    methods: {
        ...mapActions("data", ["logIn", "signIn", "logOut"])
    }
};
</script>

<style></style>
