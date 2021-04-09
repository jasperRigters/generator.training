<template>
    <div class="flex">
        <div class="triangle-left" @click="presetDec()"></div>
        <div class="selection">
            {{ this["selections/getPreset" + type + "Name"] }}
        </div>
        <div class="triangle-right" @click="presetInc()"></div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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
            "selections/getPresetMusclesName",
            "selections/getPresetToolsName"
        ])
    }
};
</script>

<style lang="scss">
@import "../../../sass/app.scss";
</style>
