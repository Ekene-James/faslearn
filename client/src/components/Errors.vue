<template>
    <div class="alert alert-danger">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Errors'
}
</script>

<style scoped>
.alert{
    border-radius: 3px;
}
.alert-danger{
    background: red;
    color: #fff;

}
</style>