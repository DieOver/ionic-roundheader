import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	fileChoosen: any;

	constructor(
		private camera: Camera,
		private http: HttpClient,
	) { }

	chooseFile = async () => {
		const options: CameraOptions = {
			sourceType: 0,
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.PNG,
			mediaType: this.camera.MediaType.PICTURE
		}
		this.fileChoosen = await this.camera.getPicture(options);
	}

	uploadFile = async () => {
		const path = this.fileChoosen.path;
		const blob = new Blob([path], { type: 'image/png' });

		const formData = new FormData();
		formData.append('file', blob, 'file.png');

		try {
			const headers = new HttpHeaders();
			headers.append('Content-Type', 'multipart/form-data');
			const result = await this.http.post('http://www.site.com.br/upload', formData, { headers }).toPromise();
			console.log('Result', result);
		} catch (error) {
			console.error('Result error', error);
		}
	}
}
