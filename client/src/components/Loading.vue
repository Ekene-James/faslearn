<template>
    <div class="background" id="myLoader">
        <div class="loading">
            <div class="bigspinner">
                <div class="smallspiner">
                    
                </div>
            </div>
            <div class="saymessage">
                <h4>Please wait...</h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Loading'
}
</script>
<style scoped>
    /* #myLoader{
        display: none;
    } */
    h4{
        color: grey;
        margin-bottom: 10px;
    }
    .background{
        width: 100%;
        height: 80px;
        padding: 20px;
        opacity: 9;
        align-content: center;
    }

    .loading{
        margin: auto;
        width: 40%;
        height: 200px;
    }
    .bigspinner{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border-top: 5px solid grey;
        display: inline-block;
        animation-name: spin;
        animation-duration: 3000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
    }
    .saymessage{
        display: inline-block;
        margin-left: 10px;
    }
    .smallspiner{
        height: 30px;
        width: 30px;
        margin: 5px;
        border-radius: 50%;
        border-top: 5px solid grey;
        animation-name: spin;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes spin{
        from {
        transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
</style>