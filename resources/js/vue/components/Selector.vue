<template>
    <div class="flex selector">
        <div class="triangle-left" @click="presetDec({ type: type })"></div>

        <div class="selection" v-bind:style="{}">
            {{ this.getPresetNames[type] }}
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
            <button
                @click="
                    savePreset({
                        user: user,
                        type: type,
                        name: newPreset,
                        items: (type == 'muscles' ? muscles : tools).map(
                            item => item.id
                        )
                    })
                "
            >
                save preset
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

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
        ...mapGetters("selections", ["getPresetNames"]),
        ...mapState({
            muscles: state => state.selections.muscles,
            tools: state => state.selections.tools,
            user: state => state.data.user
        }),

        images() {
            return this.$store.getters["selections/getPresetImageUrls"];
        }
    }
};
</script>

<style lang="scss">
@import "../../../sass/app.scss";
</style>
