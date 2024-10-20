<template>
    <div>
        <Nav />

        <main>
            <div id="error_page">
                <div class="container">
                    <div class="row justify-content-center text-center">
                        <div class="col-xl-7 col-lg-9">
                            <h2>404 <i class="icon_error-triangle_alt"></i></h2>
                            <p>We're sorry, but the page you were looking for doesn't exist.</p>
                            <form>
                                <div class="search_bar_error">
                                    <input type="text" class="form-control" placeholder="What are you looking for?">
                                    <input type="submit" value="Search">
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /row -->
                </div>
                <!-- /container -->
            </div>
            <!-- /error_page -->
        </main>

        <Footer />
    </div>
</template>

<script>
    import Nav from '@/components/site/Nav.vue'
    import Footer from '@/components/site/Footer.vue'
    export default {
        name: 'Notfound',
        components: {
            Nav,
            Footer
        },
        mounted(){
            let js = document.createElement('script')
            js.setAttribute('src', 'js/main.js')
            document.head.appendChild(js)
            let jsc = document.createElement('script')
            jsc.setAttribute('src', 'js/common_scripts.js')
            document.head.appendChild(jsc)
        }
    }
</script>

<style>

</style>