<template>
 <div>
	 <Modal v-if="isAuthor">
		<!-- <object width="100%" height="500" type="application/pdf" v-bind:data="+frontEnd+'Dnewcoursecontent2/'+playId" id="pdf_content" >
			<p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
		</object> -->
		<div class="container" style="background-color: #b2bdb5">	
			<div class="row">
				<div class="col-12">
					<div class="course_tabs_1">
						<div id="add-course-tab" class="step-app">
							<div class="step-content" style="margin-top: -100px">
								<div class="step-tab-panel step-tab-location" id="tab_step3">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-film"></i>Lecture Content</h3>
										</div>
                                        <Success v-if="successLecture">
                                            <ul>
                                                <li>Action Successful</li>
												<li>New lecture added</li>		
                                            </ul>
                                        </Success>
										<Loading v-if="Loading" />
										<Errors v-if="errorLecture">
											<ul>
												<li v-for="error in errorLecture" :key="error">{{error}}</li>	
											</ul>
										</Errors>
										<div class="course__form">
											<div class="row">
												<div class="col-lg-12">		
													<div class="extra_info">		
														<h4 class="part__title">New Lecture Content</h4>
													</div>
													<div class="view_info10">
														<div class="row">
															<div class="col-lg-12 col-md-12">	
																<div class="lecture_title">
																	<h4>Add Lecture</h4>
																</div>
															</div>
                                                            
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
                                                                            <input type="file" class="custom-file-input" id="inputGroupFile06" ref="file" v-on:change="handleFileUpload()">
																			<label class="custom-file-label" for="inputGroupFile06">{{file.name}}</label>
																		</div>
																	</div>
																	<h5>Choosen File: {{file.name}}</h5>
																</div>
															</div>
															<div class="col-lg-2 col-md-12">
																<button class="part_btn_save prt-sv" type="submit" @click.prevent="registerlecture()">Save Lecture</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
							<div class="step-footer step-tab-pager" style="opacity: 0">
								<button v-if="!Loading" class="btn btn-default steps_btn"  @click.prevent="registerlecture()">Submit for Review</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Modal>
<!-- Header Start -->
	<Dheader />
<!-- Header End -->
<!-- Left Sidebar Start -->
	<Dnav2 />
<!-- Left Sidebar End -->
<!-- Body Start -->
<div class="wrapper">
	<div class="sa4d25" v-if="isAuthor">
		<div class="container">			
			<div class="row">
				<div class="col-lg-12">	
					<h2 class="st_title"><i class="uil uil-analysis"></i> Manage Cousre Sections</h2>
				</div>					
			</div>				
			<div class="row">
				<div class="col-12">
					<div class="course_tabs_1">
						<div id="add-course-tab" class="step-app">
							<ul class="step-steps">
								<li class="pageInActive">
									<router-link :to="'/Deditcourse/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name">General Information</span>
									</a>
									</router-link>
								</li>
								<li class="pageActive">
                                    <router-link :to="'/Dnewcoursecontent/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name" style="color: white;">Course Sections</span>
									</a>
                                    </router-link>
								</li>
								<li class="pageInActive">
									<router-link :to="'/DnewcourseAffiliation/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name">Affiliations</span>
									</a>
									</router-link>
								</li>
								<li class="pageInActive">
									<router-link :to="'/DnewcourseTest/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name">Set Test</span>
									</a>
									</router-link>
								</li>
							</ul>
							<div class="step-content">
								<div class="step-tab-panel step-tab-location" id="tab_step3">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-film"></i>Course Content</h3>
										</div>
											
										<div class="tab-from-content">
											<div class="course__form">
												<div class="view_info10">
													<div class="row">
														<div class="col-lg-12">
															<div class="view_img_left" style=" width:100%;">	
																<div class="view__img" >	
																	<img src="../assets/images/courses/add_video.jpg" id="previewVideothumbnail" style="width: 100px; height: 50px;" alt="" >
																	<!-- <video src="" id="previewVideo" style="width: 150px; height: 70px;"></video> -->
																</div>
															</div>
															<div class="view_all_dt" style="padding: 20px" v-if="!isPreviewPresent">		
																<div class="view_img_right" style="width:100%">	
																	<h4 style="margin: 0px">Preview Video</h4>
																	<p style="margin: 0px"><b>NB</b> Students who have not purchased your course can see this, it is for promotion only <br> Students who watch a well-made preview video are 5X more likely to enroll in your course. We've seen that statistic go up to 10X for exceptionally awesome videos. Learn how to make yours awesome!</p>
																	<div class="upload__input">
																		<div class="input-group">
																			<div class="custom-file">
																				<input type="file" class="custom-file-input" id="inputGroupFile05" @change="handlePreviewFileUpload">
																				<label class="custom-file-label" for="inputGroupFile05">{{previewVideo.name}}</label>
																			</div>
																		</div>
																	</div>
																	<br>
																	<button class="save_content_btn" id="btn"  :disabled="previewVideo==''||Loading" @click.prevent="registerPreviewVideo()">Save preview Video</button>
																</div>
															</div>
															<div class="view_all_dt" style="padding: 20px" v-else>		
																<div class="view_img_right" style="width:100%">	
																	<h4 style="margin: 0px">Preview Video</h4>
																	<p style="margin: 0px">This course already has a preview video, to change it, delete the "course preview video" on preview section.</p>
																</div>
															</div>
															
														</div> 
													</div>
												</div>
											</div>
										</div>
										<br>
										<Loading v-if="Loading" />
										<Errors v-if="error">
											<ul>
												<li v-for="error in error" :key="error">{{error}}</li>	
											</ul>
										</Errors>
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
																<div class="ui search focus mt-30 lbel25">
																	<label>New Course Content Folder Title*</label>
																	<div class="ui left icon input swdh19">
																		<input class="prompt srch_explore" type="text" placeholder="Insert your course content folder title." maxlength="60" v-model="name">															
																	</div>
																</div>									
															</div>
                                                            <div class="col-lg-12 col-md-12">
																<div class="save_content">
																	<button class="save_content_btn" type="Submit" id="btn" @click.prevent="registerPlaylist()" :disabled="name==''||name=='Preview'||name=='preview'||name=='PREVIEW'">Save New Folder</button>
																</div>
															</div>
                                                        </div>
                                                    </div>
												</div>
											</div>
										</div>
										<div class="table-responsive mt-30">
											<div class="cover" style="width: 100%" v-for="play in playlists" :key="play">
												<div class="part__title">
													<h5 class="">{{play.sectionTitle}}</h5>	
													<div class="controls">
														<a title="Expand" class="gray-s" :id="'eyeS'+play.id" @click="toggleTable(play.id)"><i class="uil uil-eye-slash"></i></a>
														<a title="Edit" class="gray-s" @click="activateModal(play.id)"><i class="uil uil-edit-alt"></i></a>
														<a title="Delete" class="gray-s" @click.prevent="deleteSection(play.id,play.sectionTitle)" v-if="play.sectionTitle!='Preview'"><i class="uil uil-trash-alt"></i></a>
													</div>
												</div>
												<table class="table ucp-table" :id="'table'+play.id">
													<thead class="thead-s">
														<tr>
															<th class="text-center" scope="col">Lecture</th>
															<th class="cell-ta">Title</th>
															<th class="text-center" scope="col">File</th>
															<th class="text-center" scope="col">Controls</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="v in play.videos" :key="v">
															<td class="text-center">{{1+(play.videos.indexOf(v))}}</td>
															<td class="cell-ta">{{v.title}}</td>
															<td class="text-center"><a href="#">{{v.fileType}}</a></td>
															<td class="text-center">
																<a href="#" title="Delete" class="gray-s" @click.prevent="deleteLectureid(v._id,v.title)"><i class="uil uil-trash-alt"></i></a>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>	
							</div>
							<div class="step-footer step-tab-pager" style="opacity: 0">
								<button v-if="!success" class="btn btn-default steps_btn" @click="scroll()">Submit for Review</button>
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
import Modal from "@/components/Modal.vue";
export default {
	name: 'Dhome',
	data(){
		return{
			courseId: '',
			userId: '',
			isAuthor: '',
            name: '',
			playlists:'',
			preview: false,
			success : false,
			successLecture: false,
			Loading: false,
			previewPlaylistId: '',
			isPreviewPresent: false,
			error: '',
			errorLecture: '',
			playId: '',
			playlistId: '', 
            title: '',
			file: {name: ''},
			previewVideo: '',
		}
	},
	computed:{
		//...mapGetters(['error']),
		...mapGetters(['isInstructor']),
		...mapGetters(['frontEnd'])
	},
    components: {
        Dheader,
        Dnav2,
		Dfooter,
		Errors,
		Success,
		Loading,
		Modal
	},
	methods: {
        ...mapActions(['createPlaylist']),
		...mapActions(['bringPlaylist']),
		...mapActions(['deleteLecture']),
		...mapActions(['delete_Playlist']),
		...mapActions(['createVideoLecture']),
		...mapActions(['createMaterialLecture']),
		...mapActions(['fetchplaylistlectures']),
		...mapActions(['view_CourseForEdit']),
		registerPreviewVideo(){
            let formData = new FormData();
            formData.append('title', 'Course Preview Video');
			formData.append('playlistId', this.previewPlaylistId);
			formData.append('isPreview', true);
			formData.append('file', this.previewVideo);
			this.Loading = true
			this.createVideoLecture(formData)
			.then(res => {
				this.playlists = res.data;
				this.Loading = false
				this.success = true;
				this.previewVideo= '';
				this.isPreviewPresent= true
			})
			.catch(err => {
				console.log(err)
			})
		},
		registerlecture(){
			if (this.validateLecture()) {
				let file = this.file;
				let formData = new FormData();
				formData.append('title', this.title);
				formData.append('playlistId', this.playlistId);
				formData.append('isPreview', false);
				formData.append('file', this.file);

				if (file.type == 'application/pdf') {
					this.Loading = true
					this.createMaterialLecture(formData)
					.then(res => {
						this.playlists = res.data;
						this.Loading = false
						this.successLecture = true;
						this.title= '';
						this.file= '';
						this.playlistId = ''
					})
				}else if (file.type == 'video/mp4'||file.type == 'video/MOV'||file.type == 'video/WMV'||file.type == 'video/FLV'||file.type == 'video/AVI'){
					this.Loading = true
					this.createVideoLecture(formData)
					.then(res => {
						this.playlists = res.data;
						this.Loading = false
						this.successLecture = true;
						this.title= '';
						this.file= '';
						this.playlistId = ''
					})
				}else{
					alert('Invalid file, please use only a video or a pdf file');
				}
			}
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
		registerPlaylist(){
			this.Loading = true
			//let id = localStorage.getItem('fmruser');
			let play = {
				name : this.name,
				courseId : this.courseId
			} 

			this.createPlaylist(play)
            .then(res => {
				if (res.status == 201) {
				this.playlists = res.data.modules;
                document.getElementById('myLoader').style.display = 'none';
                this.name = '';
				}
				this.scroll()
				this.Loading = false
			})
			.catch(err => {
				console.log(err)
				this.Loading = false
			})
		},
		scroll(){
			window.scrollBy(0, 150)
		},
		deleteSection(id,name){
            if (confirm("Do you REALLY want to delete this section? "+name)) {
				this.delete_Playlist(id)
				.then(res => {
					this.playlists = res.data.modules
				})
                //alert('this feature has not been implemented yet '+id)
            }else{
                alert('ok, we will ignore your delete request')
            }
            
		},
		deleteLectureid(id,name){
            if (confirm("Do you REALLY want to delete this lecture?"+name)) {
				this.deleteLecture(id)
				.then(res => {
					this.playlists = res.data.modules
				})
            }else{
                alert('ok, we will ignore your delete request')
            }
            
		},
		toggleTable(id){
			document.getElementById('table'+id).classList.toggle("closed")
			document.getElementById('eyeS'+id).classList.toggle("uil-eye")
		},
		activateModal(playId){
			this.playId = playId
			this.playlistId = playId
            let modal = document.getElementById('myModal');
            modal.setAttribute("class", "modal vd_mdl fade show");
            modal.style.display = 'block';
		},
		handlePreviewFileUpload(e){
			if (this.validatePreviewFile(e.target.files[0])) {
				this.previewVideo = e.target.files[0];
			}
		},
		validatePreviewFile(file){
            let flag = true;
            let message = '';
            let error =[];
            const allowedExtensions =  ['mov','mp4','MOV','MP4'];
            //const allowedExtensionsL =  ['jpg','png','jpeg','JPG','PNG','JPEG','pdf','PDF']
            if (!allowedExtensions.includes(file.name.split(".").pop())) {
                message = 'Please insert a valid video file';
                error.push(message)
                flag = false
            }
            
            if (file.name.size > 1000000) {
                message = 'Please insert smaller size video less than 1mb';
                error.push(message)
                flag = false
            }
            if (flag == true) {
                this.error = ''
                return true
            }else{
                this.error = error
                return false
            }
		},
		validateLecture(){
			let flag = true;
			let file = this.file;
            let message = '';
            let error =[];
			const allowedExtensions =  ['mov','mp4','MOV','MP4','PDF','pdf'];
			if (!allowedExtensions.includes(file.name.split(".").pop())) {
                message = 'Please insert a valid video file or PDF file';
                error.push(message)
                flag = false
            }
            if (file.name.size > 1000000) {
                message = 'Please insert smaller size video less than 1mb';
                error.push(message)
                flag = false
			}
			if (file.name== '') {
				message = 'Please insert a lecture file';
                error.push(message)
                flag = false
			}
			if (this.title == '') {
				message = 'Please insert a lecture title';
                error.push(message)
                flag = false
			}
            if (flag == true) {
                this.errorLecture = ''
                return true
            }else{
                this.errorLecture = error
                return false
            }
		}
	},  
    mounted(){
		this.courseId = this.$route.params.id
		this.userId = localStorage.getItem('fmruser')
        this.bringPlaylist(this.$route.params.id)
        .then(res => {
			this.playlists = res.data.modules;
			for (let i = 0; i < this.playlists.length; i++) {
				const element = this.playlists[i];
				if (element.sectionTitle=='Preview') {
					this.previewPlaylistId = element.id
					for (let i = 0; i < element.videos.length; i++) {
						const elementinner = element.videos[i];
						if (elementinner.isPreview==true||elementinner.isPreview=='true') {
							this.isPreviewPresent = true
						}
					}
				}
			}
		})
		this.view_CourseForEdit(this.courseId)
		.then(res => {
			this.courseDetails = res.data
			if (this.courseDetails.user==this.userId) {
				this.isAuthor = true
			}
		})

		// var big = document.getElementsByClassName('bigspinner')[0]
		// var small = document.getElementsByClassName('smallspiner')[0]
		// big.style.borderTop = '5px solid black'
		// small.style.borderTop = '5px solid black'
		
		// for (let i = 0; i < big.length; i++) {
		// 	const element = big[i];
		// 	element.style.borderTop = 'black'
		// }
		// for (let i = 0; i < big.length; i++) {
		// 	const element = big[i];
		// 	element.style.borderTop = 'black'
		// }
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

	.partss{
		margin: 10px;
	}
	.full{
		width: 100%;
		display: block;
	}
	.closed{
		display: none;
	}
	.open{
		display: block;
	}
</style>