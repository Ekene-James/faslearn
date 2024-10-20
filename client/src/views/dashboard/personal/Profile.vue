<template>
    <div>
        <Modal>
            <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'auth/fetchUserCredential/'+userId+'/'+itemModal" id="pdf_content" >
                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
            </object>
        </Modal>

        <Dheader />

        <Dnav1 />
        
        <div class="wrapper">
            <div class="_216b01">
                <div class="container-fluid">			
                    <div class="row justify-content-md-center">
                        <div class="col-md-10">
                            <div class="section3125 rpt145">							
                                <div class="row">						
                                    <div class="col-lg-7">
                                        <a href="#" class="_216b22">										
                                            <span><i class="uil uil-cog"></i></span>Setting
                                        </a>
                                        <div class="dp_dt150">						
                                            <div class="img148" style="height: 200px; width: 200px">
                                                <!-- <img src="../assets/images/hd_dp.jpg" alt=""> -->
                                                <!-- <img v-bind:src="backEnd+'auth/fetchProfileImage/'+userId" alt=""> -->
                                                <!-- <ProfileImage :id="userId" /> -->
                                                <img src="../assets/images/hd_dp.jpg" alt="" v-if="!isProfilePhoto">
                                                <ProfileImage :id="userId" v-if="isProfilePhoto" />
                                            </div>
                                            <div class="prfledt1">
                                                <h2>{{user.firstName}} {{user.lastName}}</h2>
                                                <span v-if="isInstructor">Instructor in : </span>
                                                <span v-if="isInstructor">{{instructor.expertise}}</span><br>
                                                <span v-if="isInstructor">{{experience}} Years of Experience</span>
                                            </div>										
                                        </div>
                                        <ul class="_ttl120" v-if="isInstructor">
                                            <li>
                                                <div class="_ttl121">
                                                    <div class="_ttl122">Reviews</div>
                                                    <div class="_ttl123">{{stars.length}}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="_ttl121">
                                                    <div class="_ttl122">Courses</div>
                                                    <div class="_ttl123">{{instructorDashboard.courses}}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="_ttl121">
                                                    <div class="_ttl122">Institutions</div>
                                                    <div class="_ttl123">{{instructorDashboard.institutions}}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="_ttl121">
                                                    <div class="_ttl122">Subscriptions</div>
                                                    <div class="_ttl123">{{instructorDashboard.subscribes}}</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                     <div class="col-lg-5">
                                        <!-- <a href="#" class="_216b12">										
                                            <span><i class="uil uil-cog"></i></span>Setting
                                        </a>-->
                                        <div class="rgt-145">
                                            <ul class="tutor_social_links">
                                                <li><a :href="'http://facebook.com/'+facebook" class="fb" v-if="facebook!=''&&facebook!=null"><i class="fab fa-facebook-f"></i></a></li>
                                                <li><a :href="'http://twitter.com/'+twitter" class="tw" v-if="twitter!=''&&twitter!=null"><i class="fab fa-twitter"></i></a></li>
                                                <li><a :href="'http://www.linkedin.com/'+linkedin" class="ln" v-if="linkedin!=''&&linkedin!=null"><i class="fab fa-linkedin-in"></i></a></li>
                                                <li><a :href="'http://www.youtube.com/'+youtube" class="yu" v-if="youtube!=''&&youtube!=null"><i class="fab fa-youtube"></i></a></li>
                                            </ul>
                                        </div> 
                                        <ul class="_bty149" v-if="isInstructor&&!isSubscribed">
                                            <li><button class="sbbc145" @click.prevent="toggleSubscribtions()">Subscribe</button></li>
                                            <li><button class="sbbc146" @click.prevent="toggleSubscribtions()"><i class="uil uil-bell"></i></button></li>								
                                        </ul>
                                        <ul class="_bty149" v-if="isInstructor&&isSubscribed">
                                            <li><button class="sbbc145" style="background-color: green" @click.prevent="toggleSubscribtions()">Subscribed</button></li>
                                            <li><button class="sbbc146"><i class="uil uil-bell-slash" @click.prevent="toggleSubscribtions()"></i></button></li>								
                                        </ul>
                                    </div>
                                </div>							
                            </div>							
                        </div>															
                    </div>
                </div>
            </div>
            <div class="_215b15">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">						
                            <div class="course_tabs">
                                <nav>
                                    <div class="nav nav-tabs tab_crse" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link" v-bind:class="{active : courses }" @click="switchtap('courses')">Courses</a>
                                        <a class="nav-item nav-link" v-bind:class="{active : purchased }" @click="switchtap('purchased')">Purchased</a>
                                        <a class="nav-item nav-link" v-bind:class="{active : subscriptions }" @click="switchtap('subscriptions')">Subscriptions</a>
                                        <a class="nav-item nav-link" v-bind:class="{active : about }" @click="switchtap('about')">About</a>
                                        <a class="nav-item nav-link" v-bind:class="{active : review }" @click="switchtap('review')" v-if="isInstructor">Review</a>
                                        <a class="nav-item nav-link" v-bind:class="{active : edit }" @click="switchtap('edit')" v-if="profileOwner">Credentials</a>
                                    </div>
                                </nav>						
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <p>this things are empty {{empty}}</p> -->
            <div class="_215b17">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="course_tab_content">
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show" v-bind:class="{active : about}" role="tabpanel">
                                        <div class="_htg451">
                                            <div class="_htg452">
                                                <h3>About Me</h3>
                                                <p>{{user.bio}}</p>
                                            </div>																	
                                        </div>							
                                    </div>
                                    <div class="tab-pane fade show" v-bind:class="{active : courses}"  role="tabpanel">
                                        <div class="crse_content">
                                            <h3>My Courses</h3>
                                            <div class="_14d25">
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4" v-for="cos in instructorCourses" :key="cos">
                                                        <router-link :to="'/Dcoursedetail/'+cos._id">
                                                        <div class="fcrse_1 mt-30">
                                                            <a href="" class="fcrse_img">
                                                                <img v-bind:src="backEnd+'public/courseImage/'+cos._id" alt="">
                                                                <div class="course-overlay">
                                                                    <div class="badge_seller">Bestseller</div>
                                                                    <Ratings :id="cos._id" :type="'course'" />
                                                                    <span class="play_btn1"><i class="uil uil-play"></i></span>
                                                                    
                                                                    <CourseTime :id="cos._id" :type="'dashboard'"/>
                                                                </div>
                                                            </a>
                                                            <div class="fcrse_content">
                                                                <div class="eps_dots more_dropdown">
                                                                    <a href="#"><i class="uil uil-ellipsis-v"></i></a>
                                                                    <div class="dropdown-content">
                                                                        <span><i class="uil uil-share-alt"></i>Share</span>
                                                                        <span><i class="uil uil-edit-alt"></i>Edit</span>
                                                                    </div>																											
                                                                </div>
                                                                <TotalSeenCourse :id="cos._id" :type="'dashboard'" />
                                                                <a href="" class="crse14s">{{cos.title}}</a>
                                                                <a href="#" class="crse-cate">{{cos.category[0].name}}</a>
                                                                <div class="auth1lnkprce">
                                                                    <p class="cr1fot">By <a href="#">John Doe</a></p>
                                                                    <div class="prce142">₦{{cos.price.$numberDecimal}}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </router-link>	
                                                    </div>
                                                </div>
                                                <center>
                                                    <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('mycos')">Load More</button>	
                                                </center>		
                                            </div>		
                                        </div>
                                    </div>
                                    <div class="tab-pane fade show" v-bind:class="{active : purchased}" role="tabpanel">
                                        <div class="_htg451">
                                            <div class="_htg452">
                                                <h3>Purchased Courses</h3>
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <div class="fcrse_1 mt-20" v-for="pur in purchasedCourses" :key="pur">
                                                            <router-link :to="'/Dcoursedetail/'+pur._id">
                                                            <a class="hf_img">
                                                                <img v-bind:src="backEnd+'public/courseImage/'+pur._id" alt="">
                                                                <div class="course-overlay">
                                                                    <div class="badge_seller">Bestseller</div>
                                                                    <Ratings :id="pur._id" :type="'course'" />
                                                                    <span class="play_btn1"><i class="uil uil-play"></i></span>
                                                                    <CourseTime :id="pur._id" :type="'dashboard'"/>
                                                                </div>
                                                            </a>
                                                            <div class="hs_content">
                                                                <div class="eps_dots eps_dots10 more_dropdown">
                                                                    <a href="#"><i class="uil uil-ellipsis-v"></i></a>
                                                                    <div class="dropdown-content">
                                                                        <!-- <span><i class="uil uil-download-alt"></i>Download</span>															
                                                                        <span><i class="uil uil-trash-alt"></i>Delete</span>															 -->
                                                                    </div>																											
                                                                </div>
                                                                <TotalSeenCourse :id="pur._id" :type="'dashboard'" />
                                                                <a href="course_detail_view.html" class="crse14s title900">{{pur.title}}</a>
                                                                <a href="#" class="crse-cate">{{pur.category[0].name}}</a>
                                                                <div class="purchased_badge">Purchased</div>
                                                                <div class="auth1lnkprce">
                                                                    <div class="prce142">₦{{pur.price.$numberDecimal}}</div>
                                                                </div>
                                                            </div>
                                                            </router-link>
                                                        </div>
                                                    </div>									
                                                </div>
                                                <br><br><br>
                                                <center>
                                                    <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('purchase')">Load More</button>	
                                                </center>	
                                            </div>																	
                                        </div>							
                                    </div>
                                    <div class="tab-pane fade show" v-bind:class="{active : edit}"  role="tabpanel" v-if="profileOwner">
                                        <div class="student_reviews">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="review_right">
                                                        <div class="review_right_heading">
                                                            <h3>Update your Profile</h3>
                                                        </div>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.image">present</span>
                                                        <span class="absent" v-if="!empty.image">absent</span>
                                                        <h3>Profile Picture</h3>
                                                        <p v-if="!empty.image">Add an image that displays your face properly, you maybe mistaken for a fraud account if you don't have this</p> 
                                                        <div class="cmnt_group">
                                                            <div class="review_usr_dt">
                                                                <img id="previewMyImage" src="../assets/images/hd_dp.jpg" alt="">									
                                                            </div>
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="imageChanged">
                                                                <label class="custom-file-label" for="inputGroupFile06">{{image.name}}</label>
                                                            </div>
                                                        </div>
                                                        <center><p style="color: red; display: block">{{error.image}}</p></center>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.image&&!loading" :disabled="image==''" @click="changeUserDetails('image')">Add</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.image&&!loading" :disabled="image==''" @click="changeUserDetails('image')">Change</button>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.bio">present</span>
                                                        <span class="absent" v-if="!empty.bio">absent</span>
                                                        <h3>Bio</h3>
                                                        <p v-if="!empty.bio">People will understand and take you more seriouly when you tell them about you</p>
                                                        <div class="cmnt_group">
                                                            <textarea class="_cmnt001" placeholder="Tell us all we need to know about you" v-model="bio"></textarea>
                                                        </div>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.bio&&!loading" :disabled="bio==''" @click="changeUserDetails('bio')">Add</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.bio&&!loading" :disabled="bio==''" @click="changeUserDetails('bio')">Change</button>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.Olevel">present</span>
                                                        <span class="absent" v-if="!empty.Olevel">absent</span>
                                                        <h3>Olevel Certificate</h3>
                                                        <p v-if="!empty.Olevel">If you have plans of being a student on any institution, you need to insert an Olevel Certificate</p>
                                                        <div class="input-group">
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFileOlevel">
                                                                <label class="custom-file-label" for="inputGroupFile06">{{Olevel.name}}</label>
                                                            </div>
                                                        </div>
                                                        <center><p style="color: red; display: block">{{error.Olevel}}</p></center>
                                                        <button class="cmnt-btn" type="button" v-if="empty.Olevel&&!loading" @click="activateModal('Olevel')">View</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.Olevel&&!loading" :disabled="Olevel==''" @click="changeUserDetails('Olevel')">Change</button>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.Olevel&&!loading" :disabled="Olevel==''" @click="changeUserDetails('Olevel')">Add</button>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.cv">present</span>
                                                        <span class="absent" v-if="!empty.cv">absent</span>
                                                        <h3>Cv</h3>
                                                        <p v-if="!empty.cv">If you have plans of being an instructor on any institution, you need to insert a CV</p>
                                                        <div class="input-group">
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFilecv">
                                                                <label class="custom-file-label" for="inputGroupFile06">{{cv.name}}</label>
                                                            </div>
                                                        </div>
                                                        <center><p style="color: red; display: block">{{error.cv}}</p></center>
                                                        <button class="cmnt-btn" type="button" v-if="empty.cv&&!loading" @click="activateModal('cv')">View</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.cv&&!loading" :disabled="cv==''" @click="changeUserDetails('cv')">Change</button>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.cv&&!loading" :disabled="cv==''" @click="changeUserDetails('cv')">Add</button>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.signature">present</span>
                                                        <span class="absent" v-if="!empty.signature">absent</span>
                                                        <h3>Signature</h3>
                                                        <p v-if="!empty.signature">If you have plans of being an instructor, sign on a little piece of white paper, take a picture of it, and upload here</p>
                                                        <div class="input-group">
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFilesignature">
                                                                <label class="custom-file-label" for="inputGroupFile06">{{signature.name}}</label>
                                                            </div>
                                                        </div>
                                                        <center><p style="color: red; display: block">{{error.signature}}</p></center>
                                                        <button class="cmnt-btn" type="button" v-if="empty.signature&&!loading" @click="activateModal('signature')">View</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.signature&&!loading" :disabled="signature==''" @click="changeUserDetails('signature')">Change</button>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.signature&&!loading" :disabled="signature==''" @click="changeUserDetails('signature')">Add</button>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.Bsc">present</span>
                                                        <span class="absent" v-if="!empty.Bsc">absent</span>
                                                        <h3>Bachelor degree</h3>
                                                        <p v-if="!empty.Bsc">If you have plans of being an instructor on any institution, you need to insert a Bachelor degree</p>
                                                        <div class="input-group">
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFileBsc">
                                                                <label class="custom-file-label" for="inputGroupFile06">{{Bsc.name}}</label>
                                                            </div>
                                                        </div>
                                                        <center><p style="color: red; display: block">{{error.Bsc}}</p></center>
                                                        <button class="cmnt-btn" type="button" v-if="empty.Bsc&&!loading" @click="activateModal('Bsc')">View</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.Bsc&&!loading" :disabled="Bsc==''" @click="changeUserDetails('Bsc')">Change</button>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.Bsc&&!loading" :disabled="Bsc==''" @click="changeUserDetails('Bsc')">Add</button>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.trainingLicence">present</span>
                                                        <span class="absent" v-if="!empty.trainingLicence">absent</span>
                                                        <h3>Training Licence</h3>
                                                        <p v-if="!empty.trainingLicence">If you have plans of being an instructor on any institution, you need to insert a Training Licence</p>
                                                        <div class="input-group">
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFiletrainingLicence">
                                                                <label class="custom-file-label" for="inputGroupFile06">{{trainingLicence.name}}</label>
                                                            </div>
                                                        </div>
                                                        <center><p style="color: red; display: block">{{error.trainingLicence}}</p></center>
                                                        <button class="cmnt-btn" type="button" v-if="empty.trainingLicence&&!loading" @click="activateModal('trainingLicence')">View</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.trainingLicence&&!loading" :disabled="trainingLicence==''" @click="changeUserDetails('trainingLicence')">Change</button>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.trainingLicence&&!loading" :disabled="trainingLicence==''" @click="changeUserDetails('trainingLicence')">Add</button>
                                                    </div>
                                                    <div class="cmmnt_1526">
                                                        <span class="present" v-if="empty.incorporationCertificate">present</span>
                                                        <span class="absent" v-if="!empty.incorporationCertificate">absent</span>
                                                        <h3>Incorporation Certificate</h3>
                                                        <p v-if="!empty.incorporationCertificate">If you have plans of being an instructor on any institution, you need to insert a Incorporation Certificate</p>
                                                        <div class="input-group">
                                                            <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFileincorporationCertificate">
                                                                <label class="custom-file-label" for="inputGroupFile06">{{incorporationCertificate.name}}</label>
                                                            </div>
                                                        </div>
                                                        <center><p style="color: red; display: block">{{error.incorporationCertificate}}</p></center>
                                                        <button class="cmnt-btn" type="button" v-if="empty.incorporationCertificate&&!loading"  @click="activateModal('incorporationCertificate')">View</button>
                                                        <button class="cmnt-btn" type="button" v-if="empty.incorporationCertificate&&!loading" :disabled="incorporationCertificate==''" @click="changeUserDetails('incorporationCertificate')">Change</button>
                                                        <button class="cmnt-btn" type="button" v-if="!empty.incorporationCertificate&&!loading" :disabled="incorporationCertificate==''" @click="changeUserDetails('incorporationCertificate')">Add</button>
                                                    </div>
                                                    <div class="basic_profile1">
                                                        <div class="basic_ptitle">
                                                            <h4>Profile Links</h4>
                                                        </div>
                                                        <div class="basic_form">
                                                            <div class="row">
                                                                <div class="col-lg-8">
                                                                    <div class="row">
                                                                        <div class="col-lg-12">
                                                                            <div class="ui search focus mt-30">
                                                                                <div class="ui left icon labeled input swdh11 swdh31">
                                                                                    <div class="ui label lb12">
                                                                                        https://
                                                                                    </div>
                                                                                    <input class="prompt srch_explore" type="text" name="site" id="id_site" maxlength="64"  placeholder="yoursite.com" v-model="website">
                                                                                </div>															
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-12">
                                                                            <div class="ui search focus mt-30">
                                                                                <div class="ui left icon labeled input swdh11 swdh31">
                                                                                    <div class="ui label lb12">
                                                                                        http://facebook.com/
                                                                                    </div>
                                                                                    <input class="prompt srch_explore" type="text" name="facebooklink" id="id_facebook"  maxlength="64"  placeholder="Facebook Profile" v-model="facebook">																
                                                                                </div>
                                                                                <div class="help-block">Add your Facebook username (e.g. johndoe).</div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-12">
                                                                            <div class="ui search focus mt-30">
                                                                                <div class="ui left icon labeled input swdh11 swdh31">
                                                                                    <div class="ui label lb12">
                                                                                        http://twitter.com/
                                                                                    </div>
                                                                                    <input class="prompt srch_explore" type="text" name="twitterlink" id="id_twitter" maxlength="64"  placeholder="Twitter Profile" v-model="twitter">																
                                                                                </div>
                                                                                <div class="help-block">Add your Twitter username (e.g. johndoe).</div>
                                                                            </div>
                                                                        </div>														
                                                                        <div class="col-lg-12">
                                                                            <div class="ui search focus mt-30">
                                                                                <div class="ui left icon labeled input swdh11 swdh31">
                                                                                    <div class="ui label lb12">
                                                                                        http://www.linkedin.com/
                                                                                    </div>
                                                                                    <input class="prompt srch_explore" type="text" name="linkedinlink" id="id_linkedin" maxlength="64"  placeholder="Linkedin Profile" v-model="linkedin">																
                                                                                </div>
                                                                                <div class="help-block">Input your LinkedIn resource id (e.g. in/johndoe).</div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-12">
                                                                            <div class="ui search focus mt-30">
                                                                                <div class="ui left icon labeled input swdh11 swdh31">
                                                                                    <div class="ui label lb12">
                                                                                        http://www.youtube.com/
                                                                                    </div>
                                                                                    <input class="prompt srch_explore" type="text" name="youtubelink" id="id_youtube" maxlength="64"  placeholder="Youtube Profile" v-model="youtube">																
                                                                                </div>
                                                                                <div class="help-block">Input your Youtube username (e.g. johndoe).</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Loading v-if="Loading" />
                                                    <Success v-if="linkSuccess">
                                                        <ul>
                                                            <li>Link Uploaded Succesfully</li>
                                                        </ul>
                                                    </Success>
                                                    <button class="save_btn" type="button" @click.prevent="saveLinks">Save Changes</button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade show show" v-bind:class="{active : subscriptions}" role="tabpanel">
                                        <div class="_htg451">
                                            <div class="_htg452">
                                                <h3>Subscriptions</h3>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4" v-for="a in user.subscribtion" :key="a">
                                                        <router-link :to="'/Dprofile/'+a.instructorUserId[0]._id">
                                                        <div class="fcrse_1 mt-30">
                                                            <div class="tutor_img">
                                                                <a href="#"><ProfileImage :id="a.instructorUserId[0]._id" /></a>
                                                            </div>
                                                            <div class="tutor_content_dt">
                                                                <div class="tutor150">
                                                                    <a href="#" class="tutor_name">{{a.instructorUserId[0].firstName}} {{a.instructorUserId[0].lastName}}</a>
                                                                    <div class="mef78" title="Verify">
                                                                        <i class="uil uil-check-circle"></i>
                                                                    </div>
                                                                </div>
                                                                <br>
                                                                <ul class="tutor_social_links">
                                                                    <li><button class="sbbc145">Profile</button></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        </router-link>										
                                                    </div>
                                                </div>
                                                <h3>Admissions</h3>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4" v-for="a in user.admission" :key="a">
                                                        <router-link :to="'/Dinstitude/'+a.institutionId[0]._id">
                                                        <div class="fcrse_1 mt-30">
                                                            <div class="tutor_img">
                                                                <a href="#"><img :src="backEnd+'public/institutionImage__public/'+a.institutionId[0]._id" alt=""></a>												
                                                            </div>
                                                            <div class="tutor_content_dt">
                                                                <div class="tutor150">
                                                                    <a href="#" class="tutor_name">{{a.institutionId[0].institutionName}}</a>
                                                                    <div class="mef78" title="Verify" v-if="a.accepted">
                                                                        <i class="uil uil-check-circle"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="tutor_cate">{{a.institutionId[0].institutionType}}</div>
                                                                <ul class="tutor_social_links">
                                                                    <li>
                                                                        <button class="sbbc145" v-if="a.accepted&&!a.rejected" style="background-color: green">Admitted</button>
                                                                        <button class="sbbc145" v-if="!a.accepted&&a.rejected" style="background-color: red">Denied</button>
                                                                        <button class="sbbc145" v-if="!a.accepted&&!a.rejected" >Pending</button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        </router-link>										
                                                    </div>
                                                </div>					
                                            </div>																	
                                        </div>							
                                    </div>
                                    <div class="tab-pane fade show " v-bind:class="{active : review}" role="tabpanel" v-if="isInstructor">
                                        <div class="student_reviews">
                                            <div class="row">
                                                <div class="col-lg-5">
                                                    <div class="reviews_left">
                                                        <h3>Student Feedback</h3>
                                                        <div class="total_rating">
                                                            <div class="_rate001">{{avrating}}</div>														
                                                            <div class="rating-box">
                                                                <span class="rating-star" :class="avrating>0 ? 'full-star' : 'empty-star'"></span>
                                                                <span class="rating-star" :class="avrating>1&&avrating<2 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<2"></span>
                                                                <span class="rating-star" :class="avrating>1&&avrating>=2 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>2"></span>

                                                                <span class="rating-star" :class="avrating>2&&avrating<3 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<3"></span>
                                                                <span class="rating-star" :class="avrating>2&&avrating>=3 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>=3"></span>

                                                                <span class="rating-star" :class="avrating>3&&avrating<4 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<4"></span>
                                                                <span class="rating-star" :class="avrating>3&&avrating>=4 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>=4"></span>

                                                                <span class="rating-star" :class="avrating>4&&avrating<5 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<5"></span>
                                                                <span class="rating-star" :class="avrating>4&&avrating==5 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating==5"></span>
                                                            </div>
                                                            <div class="_rate002">Instructor Rating</div>	
                                                        </div>
                                                        <div class="_rate003">
                                                            <div class="_rate004">
                                                                <div class="progress progress1">
                                                                    <div class="progress-bar " :style="'width: '+five+'%; background-color: red'"></div>
                                                                </div>
                                                                <div class="rating-box">
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                </div>
                                                                <div class="_rate002">{{five}}%</div>
                                                            </div>
                                                            <div class="_rate004">
                                                                <div class="progress progress1">
                                                                    <div class="progress-bar " :style="'width: '+four+'%; background-color: red'"></div>
                                                                </div>
                                                                <div class="rating-box">
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                </div>
                                                                <div class="_rate002">{{four}}%</div>
                                                            </div>
                                                            <div class="_rate004">
                                                                <div class="progress progress1">
                                                                    <div class="progress-bar " :style="'width: '+three+'%; background-color: red'"></div>
                                                                </div>
                                                                <div class="rating-box">
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                </div>
                                                                <div class="_rate002">{{three}}%</div>
                                                            </div>
                                                            <div class="_rate004">
                                                                <div class="progress progress1">
                                                                    <div class="progress-bar " :style="'width: '+two+'%; background-color: red'"></div>
                                                                </div>
                                                                <div class="rating-box">
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                </div>
                                                                <div class="_rate002">{{two}}%</div>
                                                            </div>
                                                            <div class="_rate004">
                                                                <div class="progress progress1">
                                                                    <div class="progress-bar " :style="'width: '+one+'%; background-color: red'"></div>
                                                                </div>
                                                                <div class="rating-box">
                                                                    <span class="rating-star full-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                    <span class="rating-star empty-star"></span>
                                                                </div>
                                                                <div class="_rate002">{{one}}%</div>
                                                            </div>
                                                        </div>
                                                    </div>												
                                                </div>
                                                <div class="col-lg-7">
                                                    <div class="review_right">
                                                        <div class="review_right_heading">
                                                            <h3>Reviews</h3>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show active" id="instructor-signup-tab" role="tabpanel" aria-labelledby="instructor-tab" v-if="!alreadyReviewed">
                                                        <p>What do you think?</p>
                                                        <form>
                                                            <div class="ui search focus mt-15">
                                                                <div class="help-block">How many stars does this course deserve</div>																
                                                                <div class="ui form swdh30">
                                                                    <div class="field">
                                                                        <span class="rating-star" :class="star>0 ? 'full-star' : 'empty-star'" @click="setStar(1)"></span>
                                                                        <span class="rating-star" :class="star>1 ? 'full-star' : 'empty-star'" @click="setStar(2)"></span>
                                                                        <span class="rating-star" :class="star>2 ? 'full-star' : 'empty-star'" @click="setStar(3)"></span>
                                                                        <span class="rating-star" :class="star>3 ? 'full-star' : 'empty-star'" @click="setStar(4)"></span>
                                                                        <span class="rating-star" :class="star>4 ? 'full-star' : 'empty-star'" @click="setStar(5)"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <br>
                                                            <div class="ui search focus mt-15">
                                                                <div class="help-block">Do you like this course</div>																
                                                                <div class="ui form swdh30">
                                                                    <div class="field">
                                                                        <ul>
                                                                            <li class="liking" @click.prevent="setLike(1)">
                                                                                <button class="likeButton" :class=" like=='1' ? 'liked' : 'b'"><i class="uil uil-thumbs-up"></i></button>
                                                                            </li>
                                                                            <li class="liking" @click.prevent="setLike(2)">
                                                                                <button class="likeButton" :class=" like=='2' ? 'liked' : 'b'"><i class="uil uil-thumbs-down"></i></button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <br>
                                                            <div class="ui search focus mt-15">																
                                                                <div class="ui form swdh30">
                                                                    <div class="field">
                                                                        <textarea rows="3" name="description" id="id_about" placeholder="Write a little description of what you have in mind after taking this course" v-model="reviewMessage"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div class="help-block">Your review should have at least 100 characters.</div>
                                                            </div>
                                                            <!-- <input type="file" v-model="cv" /> -->
                                                            <br>
                                                            <br>
                                                            <Errors v-if="error.length>0">
                                                                <ul>
                                                                    <li v-for="error in error" :key="error">{{error}}</li>	
                                                                </ul>			
                                                            </Errors>
                                                            <br>
                                                            <Loading v-if="Loading" />
                                                            <!-- <div class="mt-3">Selected file: {{ cv ? cv.name : '' }}</div>							 -->
                                                            <button class="login-btn" type="submit" @click.prevent="submitReview()" >Submit Review</button>
                                                            <br><br>
                                                        </form>
                                                    </div>
                                                    <div class="review_all120">
                                                        <div class="review_item" v-for="v in reviews" :key="v">
                                                            <div class="review_usr_dt">
                                                                <img src="../assets/images/left-imgs/img-2.jpg" alt="">
                                                                <div class="rv1458">
                                                                    <h4 class="tutor_name1">{{v.user[0].firstName}} {{v.user[0].lastName}}</h4>
                                                                    <span class="time_145">{{v.createdAt}}</span>
                                                                </div>
                                                            </div>
                                                            <div class="rating-box mt-20">
                                                                <span class="rating-star" :class="v.star>0 ? 'full-star' : 'empty-star'"></span>
                                                                <span class="rating-star" :class="v.star>1 ? 'full-star' : 'empty-star'"></span>
                                                                <span class="rating-star" :class="v.star>2 ? 'full-star' : 'empty-star'"></span>
                                                                <span class="rating-star" :class="v.star>3 ? 'full-star' : 'empty-star'"></span>
                                                                <span class="rating-star" :class="v.star>4 ? 'full-star' : 'empty-star'"></span>
                                                            </div>
                                                            <p class="rvds10">{{v.reviewMessage}}</p>
                                                            <!-- <div class="rpt100">
                                                                <span>Was this review helpful?</span>
                                                                <div class="radio--group-inline-container">
                                                                    <div class="radio-item">
                                                                        <input id="radio-3" name="radio1" type="radio">
                                                                        <label for="radio-3" class="radio-label">Yes</label>
                                                                    </div>
                                                                    <div class="radio-item">
                                                                        <input id="radio-4" name="radio1" type="radio">
                                                                        <label  for="radio-4" class="radio-label">No</label>
                                                                    </div>
                                                                </div>
                                                                <a href="#" class="report145">Report</a>
                                                            </div> -->
                                                        </div>
                                                        <br><br>
                                                        <!-- <div class="review_item">
                                                            <a href="#" class="more_reviews">See More Reviews</a>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                            <br><br><br>
                                            <center>
                                                <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('review')">Load More</button>	
                                            </center>	
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dfooter />
        </div>
    </div>

</template>
<script>
import CourseTime from "@/components/CourseTime";
import TotalSeenCourse from "@/components/TotalSeenCourse";
import { mapGetters, mapActions } from "vuex";
import Ratings from '@/components/dashboard/Ratings.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import Modal from "@/components/Modal.vue";
import ProfileImage from "@/components/ProfileImage";
import Loading from '@/components/Loading.vue';
import Success from "@/components/Success.vue";
import Errors from '@/components/Errors.vue'
export default {
    name: 'Dhome',
    data(){
        return{
            userId: '',
            isProfilePhoto: false,
            profileOwner: false,
            loading: false,
            user: '',
            instructor: '',
            experience: '',
            instructorCourses : '',
            purchasedCourses: '',
            edit : false,
            about : false,
            courses : true,
            subscriptions : false,
            review: false,
            purchased : false,
            empty: '',
            bio: '',
            trainingLicence: '',
            incorporationCertificate: '',
            Olevel: '', 
            cv: '', 
            signature: '',
            image: '', 
            Bsc: '',
            itemModal: '',
            error: {},
            isInstructor: false,
            isSubscribed: false,
            reviews: '',
			stars: '',
			one: '',
			two: '',
			three: '',
			four: '',
			five: '',
			avrating: '',
            allLikes: '',
            star: '',
			like: '',
			reviewMessage: '',
            alreadyReviewed: true,
            Loading: false,
            instructorDashboard: '',
            facebook: '',
            linkedin: '',
            twitter: '',
            youtube: '',
            website: '',
            linkSuccess: '',
            skip: 0
        }
    },
    components: {
        Dheader,
        Dnav1,
        ProfileImage,
        Modal,
        CourseTime,
        TotalSeenCourse,
        Loading,
        Ratings,
        Errors,
        Success,
        Dfooter
    },
    computed:{
       // ...mapGetters(['isInstructor']),
        ...mapGetters(['backEnd']),
        ...mapGetters(['credentials'])
    },
    methods:{
        ...mapActions(['check_user_instructor']),
        ...mapActions(['fetch_user']),
        ...mapActions(['fetchOneInstructor']),
        ...mapActions(['fetchInstructorCourse']),
        ...mapActions(['fetch_purchased_courses']),
        ...mapActions(['fetch_empty_user_detail']),
        ...mapActions(['manageUser_Details']),
        ...mapActions(['check_empty_image']),
        ...mapActions(['check_profile_instructor']),
        ...mapActions(['manage_Subscription']),
        ...mapActions(['check_IsUserSubscribed']),
		...mapActions(['submit_Review']),
		...mapActions(['checkIf_UserAlreadyReviewedAndFetchAll']),
        ...mapActions(['fetch_Instructor_Dashboard']),
        ...mapActions(['save_SocialMedialLinks']),
        switchtap(tap){
            this.skip = 0;
			switch (tap) {
				case 'edit':
					this.edit = true;
					this.about = false;
					this.courses = false;
					this.subscriptions = false;
                    this.purchased = false;
                    this.review = false;
					break;
				case 'about':
					this.edit = false;
					this.about = true;
					this.courses = false;
					this.subscriptions = false;
                    this.purchased = false;
                    this.review = false;
					break;
				case 'courses':
					this.edit = false;
					this.about = false;
					this.courses = true;
					this.subscriptions = false;
                    this.purchased = false;
                    this.review = false;
					break;
				case 'subscriptions':
					this.edit = false;
					this.about = false;
					this.courses = false;
					this.subscriptions = true;
                    this.purchased = false;
                    this.review = false;
					break;
				case 'purchased':
					this.edit = false;
					this.about = false;
					this.courses = false;
					this.subscriptions = false;
                    this.purchased = true;
                    this.review = false;
                    break;
                case 'review':
					this.edit = false;
					this.about = false;
					this.courses = false;
					this.subscriptions = false;
                    this.purchased = false;
                    this.review = true;
                    break;  
			
				default:
					break;
			}
        },
        changeUserDetails(type){
            this.loading= true;
            let flag = true;
            let formData = new FormData(); 
            formData.append('userId', this.userId);
            formData.append('type', type);
            switch (type) {
                case 'trainingLicence':
                    formData.append('file', this.trainingLicence);
                    break;
                case 'incorporationCertificate':
                    formData.append('file', this.incorporationCertificate);
                    break;
                case 'Bsc':
                    formData.append('file', this.Bsc);
                    break;
                case 'Olevel':
                    formData.append('file', this.Olevel);
                    break;
                case 'cv':
                    formData.append('file', this.cv);
                    break;
                case 'signature':
                    formData.append('file', this.signature);
                    break;
                case 'bio':
                    formData.append('file', this.bio);
                    break;
                case 'image':
                    formData.append('file', this.image);
                    break;
                default:
                    alert('invalid type');
                    break;
            }
            if (flag) {
                this.manageUser_Details(formData)
                .then(res => {
                    this.empty = res.data;
                    this.loading= false;
                    this.bio= '';
                    this.trainingLicence= '';
                    this.incorporationCertificate= '';
                    this.Olevel= ''; 
                    this.cv= ''; 
                    this.signature= '';
                    this.image= ''; 
                    this.Bsc= '';
                })
            }
            this.loading= false;
        },
        saveLinks(){
            this.Loading= true
            this.linkSuccess = false
            let socialMedia = {
                userId: this.userId,
                facebook : this.facebook,
                twitter : this.twitter,
                linkedin : this.linkedin,
                youtube : this.youtube,
                website : this.website
            }
            this.save_SocialMedialLinks(socialMedia)
            .then(res => {
                this.user = res.data.user
                this.facebook = this.user.socialMedia.facebook
                this.twitter = this.user.socialMedia.twitter
                this.linkedin = this.user.socialMedia.linkedin
                this.youtube = this.user.socialMedia.youtube
                this.website = this.user.socialMedia.website
                this.Loading= false
                this.linkSuccess = true
            })
        },
        imageChanged(e) {
            if (this.validateFile(e.target.files[0], 'image')) {
                this.image = e.target.files[0]
                const file = this.image;
                const previewImage = document.getElementById('previewMyImage');
                if (file) {
                    const reader = new FileReader();
                    reader.addEventListener("load", function () {
                        previewImage.setAttribute('src', this.result);
                    });
                    reader.readAsDataURL(file);
                } 
            }
        },
        handleFileOlevel(e){
            if (this.validateFile(e.target.files[0], 'Olevel')) {
                this.Olevel = e.target.files[0]
            }
        },
        handleFilecv(e){
            if (this.validateFile(e.target.files[0], 'cv')) {
                this.cv = e.target.files[0]
            }
        },
        handleFilesignature(e){
            if (this.validateFile(e.target.files[0], 'signature')) {
                this.signature = e.target.files[0]
            }
        },
        handleFileBsc(e){
            if (this.validateFile(e.target.files[0], 'Bsc')) {
                this.Bsc = e.target.files[0]
            }
        },
        handleFiletrainingLicence(e){
            if (this.validateFile(e.target.files[0], 'trainingLicence')) {
                this.trainingLicence = e.target.files[0]
            }
        },
        handleFileincorporationCertificate(e){
            if (this.validateFile(e.target.files[0], 'incorporationCertificate')) {
                this.incorporationCertificate = e.target.files[0]
            }
        },
        validateFile(file, type){
            let flag = true;
            let message = '';
            const allowedExtensions =  ['jpg','png','jpeg','JPG','PNG','JPEG'];
            const allowedExtensionsL =  ['jpg','png','jpeg','JPG','PNG','JPEG','pdf','PDF']
            switch (type) {
                case 'image':
                    if (!allowedExtensions.includes(file.name.split(".").pop())) {
                        message = 'Please insert a valid image file for Profile Picture';
                        this.error.image = message;
                        flag = false
                    }
                    
                    if (file.name.size > 1000000) {
                        message = 'Please insert smaller size Profile Picture less than 1mb';
                        this.error.image = message;
                        flag = false
                    }
                    
                    break;
                case 'trainingLicence':
                    if (!allowedExtensionsL.includes(file.name.split(".").pop())) {
                        message = 'Please insert a valid PDF file for trainingLicence';
                        this.error.trainingLicence = message;
                        flag = false
                    }
                    
                    if (file.name.size > 1000000) {
                        message = 'Please insert smaller size trainingLicence less than 1mb';
                        this.error.trainingLicence = message;
                        flag = false
                    }
                    break;
                case 'incorporationCertificate':
                    if (!allowedExtensionsL.includes(file.name.split(".").pop())) {
                        message = 'Please insert a valid PDF file for incorporationCertificate';
                        this.error.incorporationCertificate = message;
                        flag = false
                    }
                    
                    if (file.name.size > 1000000) {
                        message = 'Please insert smaller size incorporationCertificate less than 1mb';
                        this.error.incorporationCertificate = message;
                        flag = false
                    }
                    break;
                case 'Olevel':
                    if (!allowedExtensionsL.includes(file.name.split(".").pop())) {
                        message = 'Please insert a valid PDF file for Olevel';
                        this.error.Olevel = message;
                        flag = false
                    }
                    
                    if (file.name.size > 1000000) {
                        message = 'Please insert smaller size Olevel less than 1mb';
                        this.error.Olevel = message;
                        flag = false
                    }
                    break;
                case 'cv':
                    if (!allowedExtensionsL.includes(file.name.split(".").pop())) {
                        message = 'Please insert a valid PDF file for cv';
                        this.error.cv = message;
                        flag = false
                    }
                    
                    if (file.name.size > 1000000) {
                        message = 'Please insert smaller size cv less than 1mb';
                        this.error.cv = message;
                        flag = false
                    }
                    break;
                case 'signature':
                    if (!allowedExtensionsL.includes(file.name.split(".").pop())) {
                        message = 'Please insert a valid image file for signature';
                        this.error.signature = message;
                        flag = false
                    }
                    
                    if (file.name.size > 1000000) {
                        message = 'Please insert smaller size signature file less than 1mb';
                        this.error.signature = message;
                        flag = false
                    }
                    break;
                case 'Bsc':
                    if (!allowedExtensionsL.includes(file.name.split(".").pop())) {
                        message = 'Please insert a valid PDF file for Bsc';
                        this.error.Bsc = message;
                        flag = false
                    }
                    
                    if (file.name.size > 1000000) {
                        message = 'Please insert smaller size Bsc less than 1mb';
                        this.error.Bsc = message;
                        flag = false
                    }
                    
                    break;
            
                default:
                    alert('nothing')
                    break;
            }
            if (flag == true) {
                this.error= {}
                return true
            }else{
                return false
            }
        },
        activateModal(item){
            let modal = document.getElementById('myModal');
            let modalBody = document.getElementById('modal-content-body');
            modal.setAttribute("class", "modal vd_mdl fade show");
            modal.style.display = 'block';
            this.itemModal = item;
            modalBody.innerHTML = `<object width="100%" height="500" type="application/pdf" data="`+this.backEnd+`auth/fetchUserCredential/`+this.userId+`/`+this.itemModal+`" id="pdf_content" >
                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
            </object>`
        },
        toggleSubscribtions(){
            let object = {
                userId: localStorage.getItem('fmruser'),
                instructorUId: this.$route.params.id
            }
            this.manage_Subscription(object)
            .then(res => {
                this.isSubscribed = res.data.isSubscribed
            })
        },
        submitReview(){
			if (this.validate()) {
                this.Loading = true
				let object ={
					user: localStorage.getItem('fmruser'),
					id: this.userId,
					star: this.star,
					like: this.like,
					reviewMessage: this.reviewMessage,
					type: 'instructor'
				}
				this.submit_Review(object)
				.then(res => {
					this.reviews = res.data.Reviews
					this.stars = res.data.stars
					this.alreadyReviewed = res.data.alreadyReviewed
					this.one = this.checkStar(1)
					this.two = this.checkStar(2)
					this.three = this.checkStar(3)
					this.four = this.checkStar(4)
					this.five = this.checkStar(5)
					this.avrating = this.checkAveageStar()
					this.allLikes = this.countlikes()
                    //this.success = true
                    this.Loading = false
				})
			}
		},
        checkStar(star){
			let total = 0;
			let answer = 0;
			if (this.stars.length == 0) {
				answer = 0;
			}else{
				for (let i = 0; i < this.stars.length; i++) {
					const element = this.stars[i];
					if (element.star == star) {
						total++;
					}
				}
				
				answer = (total/this.stars.length)*100;
			}
			return answer.toFixed(1);
		},
		checkAveageStar(){
			let total = 0;
			let answer = 0;
			if (this.stars.length == 0) {
				answer = 0;
			}else{
				for (let i = 0; i < this.stars.length; i++) {
					const element = this.stars[i];
					total = element.star + total
				}
				answer = total/this.stars.length;
			}
			return answer.toFixed(1);
		},
		countlikes(){
			let total = { like : 0, dislike : 0};
			for (let i = 0; i < this.stars.length; i++) {
				const element = this.stars[i];
				if (element.like == 1) {
					total.like++
				}else{
					total.dislike++
				}
			}
			return total;
        },
        setStar(level){
			this.star = level
		},
		setLike(value){
			this.like = value
		},
		validate(){
            let error = [];
            let message = '';
			let flag = true;
            if (this.star == '') {
                message = 'Please tell us the star level of this instructor';
                error.push(message)
                flag = false
            }
            if (this.like == '') {
                message = 'Please tell us is you like this instructor';
                error.push(message)
                flag = false
            }
            if (this.reviewMessage == '') {
                message = 'Please insert your review message';
                error.push(message)
                flag = false
            }
            if (flag == true) {
                return true
            }else{
                this.error = error
                return false
            }
        },
        fetchMore(type){
            this.skip = this.skip + 10
            this.Loading = true
            let reviewObject= {
                user : localStorage.getItem('fmruser'), 
                id : this.userId,
                type : 'instructor',
                skip : this.skip
            }
            switch (type) {
                case 'mycos':
                    this.fetchInstructorCourse({instructor_id: localStorage.getItem('fmruser'), skip: this.skip})
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            this.instructorCourses.push(element)
                        }
                        this.Loading = false
                    })
                    break;
                case 'purchase':
                    this.fetch_purchased_courses({user_id: this.userId,skip: this.skip})
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            this.purchasedCourses.push(element)
                        }
                        this.Loading = false
                    })
                    break;
                case 'review':
                    this.checkIf_UserAlreadyReviewedAndFetchAll(reviewObject)
                    .then(res => {
                        for (let i = 0; i < res.data.Reviews.length; i++) {
                            const element = res.data.Reviews[i];
                            this.reviews.push(element)
                        }
                        this.Loading = false
                    })
                    break;
            
                default:
                    break;
            }
        }
    },   
    mounted(){
        this.empty = this.credentials
        let user_id = this.$route.params.id;
        if (user_id == localStorage.getItem('fmruser')) {
            this.profileOwner = true;
        }
        this.userId = user_id;
        this.check_profile_instructor(this.userId)
        .then(res => {
            if (res.data!='') {
                this.isInstructor=true 
                this.fetchOneInstructor(user_id) 
                .then(res => {
                    this.instructor = res.data[0]
                    let started = this.instructor.experience.split('-')[0]
                    var currentTime = new Date()
                    var year = currentTime.getFullYear()
                    this.experience = year-started
                })

                if (this.isInstructor) {
                    this.fetchInstructorCourse({instructor_id: user_id, skip: this.skip})
                    .then(res => {
                        this.instructorCourses = res.data
                    })

                    let reviewObject= {
                        user : localStorage.getItem('fmruser'), 
                        id : this.userId,
                        type : 'instructor',
                        skip : this.skip
                    }
                    this.checkIf_UserAlreadyReviewedAndFetchAll(reviewObject)
                    .then(res => {
                        this.alreadyReviewed = res.data.alreadyReviewed
                        this.reviews = res.data.Reviews
                        this.stars = res.data.stars
                        this.one = this.checkStar(1)
                        this.two = this.checkStar(2)
                        this.three = this.checkStar(3)
                        this.four = this.checkStar(4)
                        this.five = this.checkStar(5)
                        this.avrating = this.checkAveageStar()
                        this.allLikes = this.countlikes()
                    })

                    this.fetch_Instructor_Dashboard(this.userId)
                    .then(res => {
                        this.instructorDashboard = res.data
                    })  
                }
            
            }
        })

        this.fetch_user(user_id)
        .then(res => {
            this.user = res.data.user
            this.facebook = this.user.socialMedia.facebook
            this.twitter = this.user.socialMedia.twitter
            this.linkedin = this.user.socialMedia.linkedin
            this.youtube = this.user.socialMedia.youtube
            this.website = this.user.socialMedia.website
        })

        this.fetch_purchased_courses({user_id,skip: this.skip})
        .then(res => {
            this.purchasedCourses = res.data
        })

        if (this.profileOwner) {
            this.fetch_empty_user_detail(user_id)
            .then(res => {
                this.empty = res.data
            }) 
        }

        this.check_empty_image(user_id)
        .then(res => {
            if (res.data.image==true) {
                this.isProfilePhoto = true
            }
        })

        let object = {
            userId: localStorage.getItem('fmruser'),
            instructorUId: this.$route.params.id
        }
        this.check_IsUserSubscribed(object)
        .then(res => {
            this.isSubscribed = res.data.isSubscribed
        })

        

    }
}
</script>
<style>
    @import url("../assets/css/style.css");
    @import url("http://fonts.googleapis.com/css?family=Roboto:400,700,500");
    @import url("../assets/vendor/unicons-2.0.1/css/unicons.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/vertical-responsive-menu.min.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/instructor-responsive.css");
    @import url("../assets/css/responsive.css");
    @import url("../assets/css/night-mode.css");
    @import url("../assets/vendor/fontawesome-free/css/all.min.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.carousel.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.theme.default.min.css");
    @import url("../assets/vendor/bootstrap/css/bootstrap.min.css");
    @import url("../assets/vendor/semantic/semantic.min.css");

    .nav-link{
        cursor: pointer;
    }

    .darkest{
		background-color: black;
		padding-top: 50px;
		padding-bottom: 50px;
		margin: 0px;
	}

    .absent{
        background-color: red;
        color: white;
        border-radius: 10px;
        padding: 5px;
        float: left;
    }

    .present{
        background-color: green;
        color: white;
        border-radius: 10px;
        padding: 5px;
        float: left;
    }

    .liked{
		background-color: yellowgreen;
		border: 2px solid yellowgreen;
	}

	.likeButton{
		width: 50px;
		height: 50px;
		border-radius: 10px;
		padding: 10px;
	}

	.liking{
		width: 60px;
		height: 60px;
		display: inline-block;
		margin: 5px;
		padding-top: 10px;
	}

</style>