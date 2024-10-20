<template>
    <div class="alert alert-danger">
        <center>
        <slot />
        </center>
    </div>
</template>

<script>
export default {
    name: 'Success'
}
</script>

<style scoped>
.alert{
    border-radius: 3px;
}
.alert-danger{
    background: green;
    color: rgb(255, 255, 255);
}
p{
    color: white;
}
</style>