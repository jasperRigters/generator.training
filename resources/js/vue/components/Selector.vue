<template>
    <div class="flex selector">
        <div class="triangle-left" @click="presetDec({ type: type })"></div>

        <div class="selection" v-bind:style="{}">
            <!-- <video
                :src="'./images/exerciseGIF/Deadlift.mp4'"
                type="video/mp4"
                autoplay
                loop
            /> -->
        </div>
        <div class="triangle-right" @click="presetInc({ type: type })"></div>
        <div class="savePreset">
            <input type="text" v-model="newPreset" />
            <button @click="savePreset({ name: newPreset })">
                save preset
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            newPreset: ""
        };
    },
    props: {
        type: String
    },

    methods: {
        ...mapActions("selections", ["presetDec", "presetInc", "savePreset"])
    },
    computed: {
        ...mapGetters([]),
        images() {
            return this.$store.getters["selections/getPresetImageUrls"];
        }
    }
};
</script>

<style lang="scss">
@import "../../../sass/app.scss";
</style>
