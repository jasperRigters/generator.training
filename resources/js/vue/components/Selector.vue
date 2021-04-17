<template>
    <div class="d-flex justify-content-between">
        <div class="flex">
            <div class="triangle-left" @click="presetDec({ type: type })"></div>

            <div class="selection" v-bind:style="{}">
                {{ this.getPresetNames[type] }}
                <button
                    v-if="presetIsCustom(type)"
                    @click="
                        deletePreset({
                            type: type,
                            name: getPresetNames[type]
                        })
                    "
                >
                    x
                </button>
                <!-- <video
                :src="'./images/exerciseGIF/Deadlift.mp4'"
                type="video/mp4"
                autoplay
                loop
            /> -->
            </div>

            <div
                class="triangle-right"
                @click="presetInc({ type: type })"
            ></div>
        </div>
        <div>
            <input type="text" :value="presetName" @input="updatePresetName" />
            <button
                class="btn btn-primary"
                @click="
                    bla();
                    savePreset({
                        user: user,
                        type: type,
                        name: presetName,
                        items: (type == 'muscles' ? muscles : tools).map(
                            item => item.id
                        )
                    });
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
        ...mapActions("selections", [
            "presetDec",
            "presetInc",
            "savePreset",
            "deletePreset",
            "updatePresetName"
        ])
    },
    computed: {
        ...mapGetters("selections", ["getPresetNames", "presetIsCustom"]),
        ...mapState({
            muscles: state => state.selections.muscles,
            tools: state => state.selections.tools,
            user: state => state.data.user,
            presetName: state => state.selections.presetName
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
