<template>
    <div class="container">
        <label v-for="item in items" :key="item.id" class="item">
            <input
                class="selectionInput"
                :id="item.id"
                type="checkbox"
                :value="item.name"
                @change="change"
                :checked="isChecked(item.id)"
            />
            <span :for="item.name" class="selectionText">{{ item.name }}</span>
        </label>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SelectArrow from "./SelectArrow.vue";
export default {
    data() {
        return {
            selectorType: this.type
        };
    },
    props: {
        type: String
    },
    methods: {
        change(event) {
            const items = this.$parent.$options.methods.addOrRemoveById(
                this.selectedItems,
                this.items,
                event.target.id
            );

            if (this.selectorType === "tools") {
                this.$store.commit("selections/setTools", items);
                this.$store.commit("selections/setToolPreset", 0);
            }
            if (this.selectorType === "muscles") {
                this.$store.commit("selections/setMuscles", items);
                this.$store.commit("selections/setMusclePreset", 0);
                this.$store.dispatch("styles/changedSelection");
            }
        },
        isChecked(item) {
            const selectedItems = this.selectedItems.map(item => item.id);
            if (selectedItems.find(selection => selection === item)) {
                return true;
            }
        }
    },
    components: { SelectArrow },
    computed: {
        items() {
            if (this.selectorType === "tools") {
                return this.$store.state.data.tools;
            }
            if (this.selectorType === "muscles") {
                return this.$store.state.data.muscles;
            }
        },
        selectedItems() {
            if (this.selectorType === "tools") {
                return this.$store.state.selections.tools;
            }
            if (this.type === "muscles") {
                return this.$store.state.selections.muscles;
            }
        }
    }
};
</script>

<style scoped>
.selectionInput {
    margin-left: 0.5em;
}
</style>
