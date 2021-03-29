<template>
    <div>
        {{ mirrored }}
    </div>
</template>

<script>
export default {
    name: "SelectArrow",
    props: {
        mirrored: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
@import "resources/sass/abstracts/_variables.scss";
div {
    color: $primary;
}
</style>
