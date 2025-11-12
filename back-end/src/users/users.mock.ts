import { randomInt, randomUUID } from "crypto";

import { User } from "./entities/user.entity";

export const USERS_MOCK: User[] = [
	new User(randomUUID(), 'John'			, 'Doe'			, 'john.doe@example.com'			, randomInt(0, 2) == 1, randomInt(1,4).toString()),
	new User(randomUUID(), 'Jane'			, 'Smith'		, 'jane.smith@example.com'		, randomInt(0, 2) == 1, randomInt(1,4).toString()),
	new User(randomUUID(), 'Bob'			, 'Johnson'	, 'bob.johnson@example.com'		, randomInt(0, 2) == 1, randomInt(1,4).toString()),
	new User(randomUUID(), 'Alice'		, 'Williams', 'alice.williams@example.com', randomInt(0, 2) == 1, randomInt(1,4).toString()),
	new User(randomUUID(), 'Charlie'	, 'Brown'		, 'charlie.brown@example.com'	, randomInt(0, 2) == 1, randomInt(1,4).toString()),
];