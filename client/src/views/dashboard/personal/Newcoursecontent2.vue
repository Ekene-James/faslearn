<template>
 <div>
<!-- Header Start -->
	<Dheader />
<!-- Header End -->
<!-- Left Sidebar Start -->
	<Dnav2 />
<!-- Left Sidebar End -->
<!-- Body Start -->
<div class="wrapper">
	<div class="sa4d25">
		<div class="container">			
			<div class="row">
				<div class="col-lg-12">	
					<h2 class="st_title"><i class="uil uil-analysis"></i> Create New Course</h2>
				</div>					
			</div>				
			<div class="row">
				<div class="col-12">
					<div class="course_tabs_1">
						<div id="add-course-tab" class="step-app">
							<!-- <ul class="step-steps">
								<li class="pageInActive" style="opacity: 0">
									<a >
										<span class="number"></span>
										<span class="step-name">General Information</span>
									</a>
								</li>
								<li class="pageActive">
									<a >
										<span class="number"></span>
										<span class="step-name" style="color: white;">Course Sections</span>
									</a>
								</li>
								<li class="pageInActive" style="opacity: 0">
									<a >
										<span class="number"></span>
										<span class="step-name">Affiliations</span>
									</a>
								</li>
							</ul> -->
							<div class="step-content" style="margin-top: -100px">
								<div class="step-tab-panel step-tab-location" id="tab_step3">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-film"></i>Course Content</h3>
										</div>
                                        <Success v-if="success">
                                            <ul>
                                                <li>Action Successful</li>	
                                            </ul>
                                            <p></p>
                                        </Success>
										<div class="course__form">
											<div class="row">
												<div class="col-lg-12">		
													<div class="extra_info">		
														<h4 class="part__title">New Course Content</h4>
													</div>
													<div class="view_info10">
														<div class="row">
															<div class="col-lg-12 col-md-12">	
																<div class="lecture_title">
																	<h4>Add Lecture</h4>
																</div>
															</div>
                                                            <Loading />
                                                            <Errors v-if="error">
                                                                <ul>
                                                                    <li v-for="error in error" :key="error">{{error}}</li>	
                                                                </ul>
                                                            </Errors>
                                                            
															<div class="col-lg-4 col-md-12">															
																<div class="ui search focus mt-30 lbel25">
																	<label>Lecture Title*</label>
																	<div class="ui left icon input swdh19">
																		<input class="prompt srch_explore" type="text" placeholder="Insert your lecture title." maxlength="60" v-model="title">															
																	</div>
																</div>									
															</div>
															<div class="col-lg-4 col-md-6">
																<div class="part_input mt-30 lbel25">
																	<label>File*</label>
																	<div class="input-group">
																		<div class="custom-file">
																			<!-- <input type="file" class="custom-file-input" id="inputGroupFile06"> -->
                                                                            <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFileUpload()">
																			<label class="custom-file-label" for="inputGroupFile06">{{file.name}}</label>
																		</div>
																	</div>
																</div>
															</div>
															<!-- <div class="col-lg-4 col-md-6">	
																<div class="ui search focus mt-30 lbel25">
																	<label>Sort</label>
																	<div class="ui left icon input swdh19">
																		<input class="prompt srch_explore" type="number" name="sort" min="0" max="100" placeholder="0">															
																	</div>
																</div>										
															</div> -->
															<!-- <div class="col-lg-12 col-md-12">	
																<div class="course_des_textarea mt-30 lbel25">
																	<label>Description*</label>
																	<div class="course_des_bg">
																		<div class="textarea_dt">															
																			<div class="ui form swdh339">
																				<div class="field">
																					<textarea rows="5" name="description" id="id_part_description" placeholder="Insert your course part description"></textarea>
																				</div>
																			</div>										
																		</div>
																	</div>
																</div>
															</div> -->
															<!-- <div class="col-lg-5 col-md-6">															
																<div class="ui search focus mt-30 lbel25">
																	<label>Volume*</label>
																	<div class="ui left icon input swdh19 swdh95">
																		<input class="prompt srch_explore" type="number" min="0" name="size" required="" placeholder="0">															
																		<div class="badge_mb">MB</div>
																	</div>
																</div>									
															</div>
															<div class="col-lg-5 col-md-6">															
																<div class="ui search focus mt-30 lbel25">
																	<label>Duration*</label>
																	<div class="ui left icon input swdh19 swdh55">
																		<input class="prompt srch_explore" type="number" min="0" name="duration" required="" placeholder="0">															
																		<div class="badge_min">Minutes</div>
																	</div>
																</div>									
															</div> -->
															<div class="col-lg-2 col-md-12">
																<button class="part_btn_save prt-sv" type="submit" @click.prevent="registerlecture()">Save Lecture</button>
															</div>
															<div class="col-lg-12 col-md-12">
																<div class="table-responsive mt-50 mb-0">
																	<table class="table ucp-table">
																		<thead class="thead-s">
																			<tr>
																				<th class="text-center" scope="col">Lecture</th>
																				<th class="cell-ta">Title</th>
																				<th class="text-center" scope="col">Volume</th>
																				<th class="text-center" scope="col">Duration</th>
																				<th class="text-center" scope="col">Page</th>
																				<th class="text-center" scope="col">File</th>
																				<th class="text-center" scope="col">Controls</th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr v-for="lecture in lectures" :key="lecture">
																				<td class="text-center">1</td>
																				<td class="cell-ta">{{lecture.title}}</td>
																				<td class="text-center">25</td>
																				<td class="text-center">6</td>
																				<td class="text-center">0</td>
																				<td class="text-center"><a href="#">{{lecture.fileType}}</a></td>
																				<td class="text-center">
																					<a href="#" title="Edit" class="gray-s"><i class="uil uil-edit-alt"></i></a>
																					<a href="#" title="Delete" class="gray-s"><i class="uil uil-trash-alt"></i></a>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
															<!-- <div class="col-lg-12 col-md-12">
																<div class="save_content">
																	<button class="save_content_btn" type="Submit">Save Course Content</button>
																</div>
															</div> -->
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
							<div class="step-footer step-tab-pager" style="opacity: 0">
								<button v-if="!success" class="btn btn-default steps_btn"  >Submit for Review</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Dfooter />
</div>
<!-- Body End -->
</div>   
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'
import Loading from '@/components/Loading.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
	name: 'Dhome',
	data(){
		return{ 
            playlistId: '', 
            title: '',
            file: '',
            lectures: '',
			success : false
		}
	},
	computed:{
		...mapGetters(['error']),
        ...mapGetters(['isInstructor'])
	},
    components: {
        Dheader,
        Dnav2,
		Dfooter,
		Errors,
		Success,
		Loading
	},
	methods: {
        ...mapActions(['createVideoLecture']),
		...mapActions(['createMaterialLecture']),
		...mapActions(['fetchplaylistlectures']),
		registerlecture(){
            let file = this.file;
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('playlistId', this.playlistId);
            formData.append('file', this.file);

            if (file.type == 'application/pdf') {
                document.getElementById('myLoader').style.display = 'block';
                this.createMaterialLecture(formData)
                .then(res => {
                    if (res.status == 200) {
                    this.lectures = res.data;
                    document.getElementById('myLoader').style.display = 'none';
					this.success = true;
					this.title= '';
            		this.file= '';
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else if (file.type == 'video/mp4'||file.type == 'video/MOV'||file.type == 'video/WMV'||file.type == 'video/FLV'||file.type == 'video/AVI'){
                document.getElementById('myLoader').style.display = 'block';
                this.createVideoLecture(formData)
                .then(res => {
                    if (res.status == 200) {
                    this.lectures = res.data;
                    document.getElementById('myLoader').style.display = 'none';
					this.success = true;
					this.title= '';
            		this.file= '';
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                alert('Invalid file, please use only a video or a pdf file');
            }
			//let id = localStorage.getItem('fmruser');
			// let lecture = {
			// 	title : this.title,
			// 	playlistId : this.playlistId
			// }
            
			// this.createPlaylist(play)
            // .then(res => {
			// 	if (res.status == 201) {
			// 	this.playlists = res.data.modules;
            //     document.getElementById('myLoader').style.display = 'none';
            //     this.name = '';
            //     this.success = true;
			// 	}
				
			// })
			// .catch(err => {
			// 	console.log(err)
			// })
			

			
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            const file = this.$refs.file.files[0];
            // const previewImage = document.getElementById('previewImage');
            console.log(file)
        }
	},  
    mounted(){
		this.playlistId = this.$route.params.id
		this.fetchplaylistlectures(this.$route.params.id)
        .then(res => {
            this.lectures = res.data;
            console.log(this.lectures)
		})
		.catch(err => {
			console.log(err)
		})
    }

    //http://localhost:8080/Dnewcoursecontent/606dbb80b1fc8e099c5ff8fc
}
</script>
<style >
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

	.pageInActive{
        padding: 10px;
        width: 33%;
    }

    .pageActive{
        padding: 10px;
        background-color: red;
        color: white;
        width: 33%;
        border-radius: 10px;
    }
</style>