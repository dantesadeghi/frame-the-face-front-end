import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation.js';
import SignIn from '../components/SignIn/SignIn.js';
import Registration from '../components/Registration/Registration.js';
import Logo from '../components/Logo/Logo.js';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js';
import Rank from '../components/Rank/Rank.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';
import './App.css';
import ParticlesBg from 'particles-bg'

const initialState = {
	input: ' ',
	imageUrl: ' ',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		};
	}

	displayFaceBox = (box) => {
		this.setState({box: box})
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});

		fetch("https://frame-the-face-api.onrender.com/imageurl", {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response =>  response.text()) // OR: .json() here and (response => response.text()) in the server side works as well.
		.then((result) => {
			if (result) {
				fetch("https://frame-the-face-api.onrender.com/image", { // By default, fetch() does a get request.
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				}).then(response => response.json())
				.then(count => {
					// Updating the user count after submission to display correct count
					this.setState(Object.assign(this.state.user, {entries: count})); 
				}).catch(err => {
					console.log('Error:', err);
				});
			}
			this.displayFaceBox(this.calculateFaceLocation(result))
		})
		.catch((error) => {
			console.log("Error", error);
			alert('Please enter a valid URL to an image.');
		});
	}

	onRouteChange = (route) => {
		if (route === 'mainpage') {
			this.setState({isSignedIn: true});
		} else {
			this.setState(initialState);
		}
		this.setState({route: route});
	}

	loadUser = (userData) => {
		const { id, name, email, entries, joined } = userData;
		this.setState({user: {
			id: id,
			name: name,
			email: email,
			entries: entries,
			joined: joined
		}});
	}

	render() {
		const { isSignedIn, route, box, imageUrl, user } = this.state;
		return (
			<div className="App">
				<ParticlesBg type="cobweb" num={120} bg={true} color="#cccccc"/>
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
				{ route === 'mainpage' 
					?    <> 
							<Logo onButtonSubmit={this.onButtonSubmit}/>
							<Rank name={user.name} entries={user.entries}/>
							<ImageLinkForm 
								onInputChange={this.onInputChange} 
								onButtonSubmit={this.onButtonSubmit}
							/>
							<FaceRecognition 
								box={box} 
								imageUrl={imageUrl}
							/>
						</>
					: 	(route === 'signin'  
						?	<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						:	 <Registration loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						)
				}
			</div>
		);
	}
}

export default App;
