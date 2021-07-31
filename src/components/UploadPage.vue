<template>

	<div id="bg">
		<Navbar/>


		<div class="card">
			<h2>Upload an image to Foodiegram</h2>
		
			<input id="title" v-model="title" class="textInput" type="text" placeholder="Title"/>
			<textarea id="text" v-model="text" class="textInput" placeholder="Description"></textarea>
			
			<input v-model="latitude" type="number" step="any" style="display: none;">
			<input v-model="longitude" type="number" step="any" style="display: none;">
			
			<div id="buttons">
				<input  @change="grabImage($event)" type="file">
				<button @click="uploadPost()">Upload</button>
			</div>
			

			<div id="map">
				<vl-map  :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
						data-projection="EPSG:4326" style="height: 400px" @click="changeCoordinates($event)">
				
				<vl-view :zoom="2" :min-zoom="2" :enable-rotation="false"></vl-view>
				
				<!-- Tries to get the location of the user. -->
				<vl-geoloc @update:position="geolocPosition = $event">
				</vl-geoloc>
		
				<vl-feature v-if="geolocPosition" id="position-feature">
					<vl-geom-point :coordinates="geolocPosition"></vl-geom-point>
					<vl-style-box>
					<vl-style-icon src="@/assets/marker.png" :scale="1" :anchor="[0.5, 1]"></vl-style-icon>
					</vl-style-box>
				</vl-feature>
				
				


				<vl-layer-tile id="osm">
					<vl-source-osm></vl-source-osm>
				</vl-layer-tile>
				</vl-map>

			</div>

		</div>
		
	</div>

</template>

<script>
	import Navbar from './Navbar.vue';
	import { WithAuth } from '../AxiosProfiles.js';


    export default {
        'name': 'UploadPage',

		components: {
			Navbar
		},

		data: function() {
			return {
				title: "",
				text: "",
				image: undefined,
				latitude: undefined,
				longitude: undefined,
				geolocPosition: undefined
			}
		},

		methods: {
			grabImage(event) {
				this.image = event.target.files[0];
			},

			uploadPost() {

				if (this.title && this.image) {

					let form = new FormData();
					form.append('title', this.title);
					form.append('text', this.text);
					form.append('image', this.image);

					if (this.latitude && this.longitude) {
						form.append('latitude', this.latitude);
						form.append('longitude', this.longitude);
					}
					

					WithAuth.post('/posts', form)
					.then(() => window.location.href = '/users/fungus')
					.catch(err => console.log(err));

				}
				
			},

			changeCoordinates(event) {
				this.geolocPosition = event.coordinate;

			}
		}      
    }
</script>


<style scoped>
	@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

	#bg {
		display: grid;
		place-items: center;
	}

	#map {
		width: 95%;
		overflow: hidden;
		margin: 1rem;
		margin-top: auto;
		border-radius: 30px;
	}

	.card {
		background: white;
		border-radius: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 80vh;
		aspect-ratio: 6/7;
		font-family: Roboto;
	}

	h2 {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	button {
		
	}

	.textInput {
		width: 50%;
		padding: 5px;
		box-sizing: border-box;
		font-family: Roboto;
		border: 1px solid black;
		border-radius: 0;
	}


	#title {
		font-size: 1.5rem;
		border-bottom: none; 		
	}

	#text {
		resize: none;
		height: 3rem;
		border: 1px solid black;
		font-size: 1.1rem;
	}

	.textInput:focus {
		outline: none;
	}
	
	#buttons {
		display: flex;
		width: 50%;
		margin: 2rem 0 1rem 0;
		justify-content: space-between;
	}

	@media screen and (max-width: 800px) {

		.textInput {
			width: 90%;
		}
		
		.card {
			position: absolute;
			top: 0;
			bottom: 7rem;
			width: 100%;
			height: unset;
			aspect-ratio: unset;
			border-radius: 0;
			font-size: 1rem;
			overflow: hidden;
		}

		#buttons {
			width: 90%;
		}

		#map {
			border-radius: 0;
		}
	}
</style>