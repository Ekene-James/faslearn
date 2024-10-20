<template>
    <div>
        <Nav />

        <Tittle>
            <h1 class="fadeInUp"><span></span>Pricing tables</h1>
        </Tittle>

        <div class="container margin_60_35">
            <div class="pricing-container cd-has-margins">
                <div class="pricing-switcher">
                    <p class="fieldset">
                        <input type="radio" name="duration-2" value="monthly" id="monthly-2" checked>
                        <label for="monthly-2">Monthly</label>
                        <input type="radio" name="duration-2" value="yearly" id="yearly-2">
                        <label for="yearly-2">Yearly</label>
                        <span class="switch"></span>
                    </p>
                </div>
                <!--/pricing-switcher -->
                <ul class="pricing-list bounce-invert">
                    <li>
                        <ul class="pricing-wrapper">
                            <li data-type="monthly" class="is-visible">
                                <header class="pricing-header">
                                    <h2>Basic</h2>

                                    <div class="price">
                                        <span class="currency">$</span>
                                        <span class="price-value">30</span>
                                        <span class="price-duration">mo</span>
                                    </div>
                                </header>
                                <!-- /pricing-header -->
                                <div class="pricing-body">
                                    <ul class="pricing-features">
                                        <li><em>One Time</em> Fee</li>
                                        <li><em>1</em> User</li>
                                        <li><em>Lifetime</em> Availability</li>
                                        <li><em>Non</em> Featured</li>
                                        <li><em>30 days</em> Listing</li>
                                        <li><em>24/7</em> Support</li>
                                    </ul>
                                </div>
                                <!-- /pricing-body -->
                                <footer class="pricing-footer">
                                    <a class="select-plan" href="#0">Select</a>
                                </footer>
                            </li>
                            <li data-type="yearly" class="is-hidden">
                                <header class="pricing-header">
                                    <h2>Basic</h2>

                                    <div class="price">
                                        <span class="currency">$</span>
                                        <span class="price-value">320</span>
                                        <span class="price-duration">yr</span>
                                    </div>
                                </header>
                                <!-- /pricing-header -->
                                <div class="pricing-body">
                                    <ul class="pricing-features">
                                        <li><em>One Time</em> Fee</li>
                                        <li><em>1</em> User</li>
                                        <li><em>Lifetime</em> Availability</li>
                                        <li><em>Non</em> Featured</li>
                                        <li><em>30 days</em> Listing</li>
                                        <li><em>24/7</em> Support</li>
                                    </ul>
                                </div> 
                                <!-- /pricing-body -->
                                <footer class="pricing-footer">
                                    <a class="select-plan" href="#0">Select</a>
                                </footer>
                            </li>
                        </ul>
                        <!-- /pricing-wrapper -->
                    </li>
                    <li class="popular">
                        <ul class="pricing-wrapper">
                            <li data-type="monthly" class="is-visible">
                                <header class="pricing-header">
                                    <h2>Popular</h2>
                                    <div class="price">
                                        <span class="currency">$</span>
                                        <span class="price-value">60</span>
                                        <span class="price-duration">mo</span>
                                    </div>
                                </header>
                                <!-- /pricing-header -->
                                <div class="pricing-body">
                                    <ul class="pricing-features">
                                        <li><em>One Time</em> Fee</li>
                                        <li><em>3</em> User</li>
                                        <li><em>Lifetime</em> Availability</li>
                                        <li><em>Non</em> Featured</li>
                                        <li><em>30 days</em> Listing</li>
                                        <li><em>24/7</em> Support</li>
                                    </ul>
                                </div>
                                <!-- /pricing-body -->
                                <footer class="pricing-footer">
                                    <a class="select-plan" href="#0">Select</a>
                                </footer>
                            </li>
                            <li data-type="yearly" class="is-hidden">
                                <header class="pricing-header">
                                    <h2>Popular</h2>

                                    <div class="price">
                                        <span class="currency">$</span>
                                        <span class="price-value">630</span>
                                        <span class="price-duration">yr</span>
                                    </div>
                                </header>
                                <!-- /pricing-header -->
                                <div class="pricing-body">
                                    <ul class="pricing-features">
                                        <li><em>One Time</em> Fee</li>
                                        <li><em>3</em> User</li>
                                        <li><em>Lifetime</em> Availability</li>
                                        <li><em>Non</em> Featured</li>
                                        <li><em>30 days</em> Listing</li>
                                        <li><em>24/7</em> Support</li>
                                    </ul>
                                </div>
                                <!-- /pricing-body -->
                                <footer class="pricing-footer">
                                    <a class="select-plan" href="#0">Select</a>
                                </footer>
                            </li>
                        </ul>
                        <!-- /cd-pricing-wrapper -->
                    </li>
                    <li>
                        <ul class="pricing-wrapper">
                            <li data-type="monthly" class="is-visible">
                                <header class="pricing-header">
                                    <h2>Premier</h2>
                                    <div class="price">
                                        <span class="currency">$</span>
                                        <span class="price-value">90</span>
                                        <span class="price-duration">mo</span>
                                    </div>
                                </header>
                                <!-- /pricing-header -->
                                <div class="pricing-body">
                                    <ul class="pricing-features">
                                        <li><em>One Time</em> Fee</li>
                                        <li><em>5</em> User</li>
                                        <li><em>Lifetime</em> Availability</li>
                                        <li><em>Non</em> Featured</li>
                                        <li><em>30 days</em> Listing</li>
                                        <li><em>24/7</em> Support</li>
                                    </ul>
                                </div>
                                <!-- /pricing-body -->
                                <footer class="pricing-footer">
                                    <a class="select-plan" href="#0">Select</a>
                                </footer>
                            </li>
                            <li data-type="yearly" class="is-hidden">
                                <header class="pricing-header">
                                    <h2>Premier</h2>

                                    <div class="price">
                                        <span class="currency">$</span>
                                        <span class="price-value">950</span>
                                        <span class="price-duration">yr</span>
                                    </div>
                                </header>
                                <!-- /pricing-header -->
                                <div class="pricing-body">
                                    <ul class="pricing-features">
                                        <li><em>One Time</em> Fee</li>
                                        <li><em>5</em> User</li>
                                        <li><em>Lifetime</em> Availability</li>
                                        <li><em>Non</em> Featured</li>
                                        <li><em>30 days</em> Listing</li>
                                        <li><em>24/7</em> Support</li>
                                    </ul>
                                </div>
                                <!-- /pricing-body -->
                                <footer class="pricing-footer">
                                    <a class="select-plan" href="#0">Select</a>
                                </footer>
                            </li>
                        </ul>
                        <!-- /pricing-wrapper -->
                    </li>
                </ul>
                <!-- /pricing-list -->
            </div>
        <!-- /pricing-container -->	
        </div>
        <!-- /container -->

        <Footer />
    </div>
</template>
<script>
    import Nav from '@/components/site/Nav.vue'
    import Tittle from '@/components/site/Tittle.vue'
    import Footer from '@/components/site/Footer.vue'
    export default {
        name: 'pricing',
        components: {
            Nav,
            Tittle,
            Footer
        },
        mounted(){
            let js = document.createElement('script')
            js.setAttribute('src', 'js/main.js')
            document.head.appendChild(js)
            let jsc = document.createElement('script')
            jsc.setAttribute('src', 'js/common_scripts.js')
            document.head.appendChild(jsc)
            let jsm = document.createElement('script')
            jsm.setAttribute('src', 'js/modernizr_tables.js')
            document.head.appendChild(jsm)
            let jst = document.createElement('script')
            jst.setAttribute('src', 'js/tables_func.js')
            document.head.appendChild(jst)
            
        }
    }
</script>
<style >

</style>