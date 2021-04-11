<template>
    <div class="flex selector">
        <div class="triangle-left" @click="presetDec()"></div>

        <div
            class="selection"
            v-bind:style="{
                'background-image':
                    'url(' + images[type.toLowerCase()][presetName] + ')'
            }"
        >
            {{ this["selections/getPreset" + type + "Name"] }}

            <!-- <video
                :src="'./images/exerciseGIF/Deadlift.mp4'"
                type="video/mp4"
                autoplay
                loop
            /> -->
        </div>
        <div class="triangle-right" @click="presetInc()"></div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {};
    },
    props: {
        type: String
    },

    methods: {
        presetDec() {
            this.$store.dispatch("selections/presetDec", {
                type: this.$props.type
            });
        },
        presetInc() {
            this.$store.dispatch("selections/presetInc", {
                type: this.$props.type
            });
        }
    },
    computed: {
        ...mapGetters([
            "selections/getPresetToolsName",
            "selections/getPresetMusclesName"
        ]),
        images() {
            return this.$store.getters["data/getPresetImageUrls"];
        },
        presetName() {
            return this.$store.getters[
                "selections/getPreset" + this.type + "Name"
            ];
        }
    }
};
</script>

<style lang="scss">
@import "../../../sass/app.scss";
</style>
