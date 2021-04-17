<template>
    <div>
        <ul>
            <label v-for="muscle in muscles" :key="muscle.id" class="item">
                <li>
                    <input
                        :id="muscle.id"
                        type="checkbox"
                        :value="muscle.name"
                        @change="change"
                        :checked="isChecked(muscle.id)"
                    />
                    {{ muscle.name }}
                </li>
            </label>
        </ul>
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
            this.$store.commit("selections/setMuscles", muscles);
            this.$store.commit("selections/setMusclePreset", 0);
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
            muscles: state => state.data.muscles,
            selectedMuscles: state => state.selections.muscles
        })
    }
};
</script>

<style scoped></style>
