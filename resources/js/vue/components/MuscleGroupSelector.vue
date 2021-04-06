<template>
    <div>
        <label v-for="muscle in muscles" :key="muscle.id" class="item">
            <input
                :id="muscle.id"
                type="checkbox"
                :value="muscle.name"
                @change="change"
                :checked="isChecked(muscle.id)"
            />
            <span :for="muscle.name">{{ muscle.name }}</span>
        </label>
        <div>
            selected muscles:
            {{ selectedMuscles.map(muscle => muscle.name) }}
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
            const muscles = this.$parent.$options.methods.addOrRemoveById(
                this.selectedMuscles,
                this.muscles,
                event.target.id
            );

            this.$store.commit("selections/setSelectedMuscles", muscles);
            this.$store.dispatch("styles/changedSelection");
        },
        isChecked(muscle) {
            const selectedMuscles = this.selectedMuscles.map(
                muscle => muscle.id
            );
            if (selectedMuscles.find(selection => selection === muscle)) {
                return true;
            }
        }
    },
    components: { SelectArrow },
    computed: {
        ...mapState({
            selectedPreset: state => state.selections.selectedPreset,
            muscles: state => state.data.muscles,
            selectedMuscles: state => state.selections.selectedMuscles
        })
    }
};
</script>

<style scoped></style>
