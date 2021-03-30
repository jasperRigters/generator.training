<template>
    <div class="display">
        <select-arrow />
        <label
            v-for="muscleGroup in muscleGroups"
            :key="muscleGroup.id"
            class="item"
        >
            <input
                :id="muscleGroup.id"
                type="checkbox"
                :value="muscleGroup.name"
                @change="change"
                checked="true"
            />
            <span :for="muscleGroup.name">{{ muscleGroup.name }}</span>
        </label>
        <div>
            selected muscle Groups:
            {{ selectedMuscleGroups }}
        </div>

        <select-arrow v-bind:mirrored="true" />
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
            const muscleGroup = this.selectedMuscleGroups.filter(
                muscleGroups => muscleGroups.id != event.target.id
            );
            if (muscleGroup.length === this.selectedMuscleGroups.length) {
                muscleGroup.push(
                    this.muscleGroups.find(
                        musclegroup => musclegroup.id == event.target.id
                    )
                );
            }
            this.$store.commit(
                "selections/setSelectedMuscleGroups",
                muscleGroup
            );
        }
    },
    components: { SelectArrow },
    computed: {
        ...mapState({
            muscleGroups: state => state.data.muscleGroups,
            selectedMuscleGroups: state => state.selections.selectedMuscleGroups
        })
    },
    created() {
        this.$store.commit("selections/setSelectedMuscleGroups", [
            { id: 1, name: "Glutes" },
            { id: 2, name: "Legs" },
            { id: 3, name: "Calves" },
            { id: 4, name: "Triceps" },
            { id: 5, name: "Biceps" },
            { id: 6, name: "Shoulders" },
            { id: 7, name: "Core" },
            { id: 8, name: "Back" },
            { id: 9, name: "Chest" }
        ]);
    }
};
</script>

<style scoped></style>
