export class User {
	id: 					string;
	firstName: 		string;
	lastName: 		string;
	email: 				string;
	isActive:			boolean;
	profileId: 		string;

	constructor(
		id: 				string,
		firstName: 	string,
		lastName: 	string,
		email: 			string,
		isActive:		boolean,
		profileId: 	string,
	) {
		this.id 				= id;
		this.firstName 	= firstName;
		this.lastName 	= lastName;
		this.email 			= email;
		this.isActive 	= isActive;
		this.profileId 	= profileId;
	};
};