import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './app.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	phoneNumbers = [];
	p: Number = 1;
	data;
	count: Number = 10;
	pageOfItems: Array<any>;

	phoneNumberForm: FormGroup = new FormGroup({});
	constructor(private fb: FormBuilder, private apiService: ApiService) {
		this.phoneNumberForm = fb.group({
			phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{5}$")]]
		})
	}
	get f() {
		return this.phoneNumberForm.controls;
	}

	fetchPhoneNumberCombinations() {
		let table = ['0', '1', 'abc2', 'def3', 'ghi4', 'jkl5', 'mno6', 'pqrs7', 'tuv8', 'wxyz9'];
		let result = [];
		let que = [''];

		while (que.length > 0) {
			let str = que[0];
			que.shift();
			if (str.length == this.phoneNumberForm.controls.phoneNumber.value.length) {
				result.push(str);
				this.apiService.postData(str);
			} else {
				let s = Number(this.phoneNumberForm.controls.phoneNumber.value.charAt(str.length));
				let val = table[s];

				for (var i = 0; i < val.length; i++) {
					que.push(str + val.charAt(i));
				}
			}
		}
	//	this.apiService.postCount(result.length+1);
		this.phoneNumbers = result;
	}

	onChangePage(pageOfItems: Array<any>) {
		this.pageOfItems = pageOfItems;
	}
	// Fetch Data from server - We can use this function for making service call of each page click
	displayData(page,limit){
		this.apiService.getData(page,limit).subscribe(data => {this.data = data})
	}

}