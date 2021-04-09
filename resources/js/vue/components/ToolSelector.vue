<template>
    <div>
        <label v-for="tool in tools" :key="tool.id" class="item">
            <input
                :id="tool.id"
                type="checkbox"
                :value="tool.name"
                @change="change"
                :checked="isChecked(tool.id)"
            />
            <span :for="tool.name">{{ tool.name }}</span>
        </label>
        <div>
            selected tools:
            {{ selectedTools.map(tool => tool.name) }}
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SelectArrow from "./SelectArrow.vue";
export default {
    data() {
        return {};
    },
    methods: {
        change(event) {
            const tools = this.$parent.$options.methods.addOrRemoveById(
                this.selectedTools,
                this.tools,
                event.target.id
            );

            this.$store.commit("selections/setTools", tools);
        },
        isChecked(tool) {
            const selectedTools = this.selectedTools.map(tool => tool.id);
            if (selectedTools.find(selection => selection === tool)) {
                return true;
            }
        }
    },
    components: { SelectArrow },
    computed: {
        ...mapState({
            tools: state => state.data.tools,
            selectedTools: state => state.selections.tools
        })
    }
};
</script>

<style scoped></style>
