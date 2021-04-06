<template>
    <div>
        <label v-for="tool in tools" :key="tool.id" class="item">
            <input
                :id="tool.id"
                type="checkbox"
                :value="tool.name"
                @change="change"
                checked="true"
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

            this.$store.commit("selections/setSelectedTools", tools);
        }
    },
    components: { SelectArrow },
    computed: {
        ...mapState({
            tools: state => state.data.tools,
            selectedTools: state => state.selections.selectedTools
        })
    }
};
</script>

<style scoped></style>
