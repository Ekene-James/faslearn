<template>
    <div class="modal vd_mdl fade" id="myModal" tabindex="-1" aria-modal="true" role="dialog" style="padding-right: 10px;">
        <div class="modal-dialog modal-lg"  role="document">
            <div class="modal-content" id="backgroundModal">
                <button type="button" style="background-color: black; color: white" class="close" data-dismiss="modal" aria-label="Close" @click="shutdownModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body" id="modal-content-body">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Modal',
    data(){
        return{
            mmodal: true
        }
    },
    methods: {
        shutdownModal(){
            let modal = document.getElementById('myModal');
            modal.setAttribute("class", "modal vd_mdl fade");
            modal.style.display = 'none';
        }
    }
	
}
</script>
<style scoped>
    button{
        background-color: black; color: white;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        float: right;
    }

    #backgroundModal{
        /* background: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet); */
         background: linear-gradient(to right, grey,white,grey,white,grey,white,grey);
        background-size: 400% 400%;
        animation: gradient 5s ease infinite;
    }
	
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>