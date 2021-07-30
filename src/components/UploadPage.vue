<template>

	<div id="bg">
		<Navbar/>


		<div class="card">
			<h2>Upload an image to Foodiegram</h2>

			<input v-model="title" class="formContent" type="text" placeholder="Title"/>
			<textarea v-model="text" class="formContent" cols="30" rows="10" placeholder="Description"></textarea>
			<input @change="grabImage($event)" class="formContent" type="file">
			<input v-model="latitude" type="number" step="any" style="display: none;">
			<input v-model="longitude" type="number" step="any" style="display: none;">
			<button class="formContent" @click="uploadPost()">Upload</button>

		</div>
		<!-- <div id="map">
			<vl-map  :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
					data-projection="EPSG:4326" style="height: 400px">
			<vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

			<vl-layer-tile id="osm">
				<vl-source-osm></vl-source-osm>
			</vl-layer-tile>
			</vl-map>

		</div> -->
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
				image: null,
				latitude: null,
				longitude: null
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
					

					form.forEach(x => console.log(x))


					WithAuth.post('/posts', form)
					.then(() => window.location.href = '/users/fungus')
					.catch(err => console.log(err));

				}
				
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
		width: 50vw;
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
		font-size: 1.5rem;
	}

	h2 {
		margin-top: 2rem;
	}

	#text {
		resize: none;
		font-family: Roboto;
		padding: 5px;
	}

	.formContent {
		margin: 1rem;
		font-size: 1.5rem;
	}

	@media screen and (max-width: 800px) {
		.card {
			height: 100%;
			width: 100%;
			aspect-ratio: unset;
			border-radius: 0;
			font-family: 1rem;
		}
	}
</style>