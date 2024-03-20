export const PAGE_CONTENT_QUERY = `query {
	allDepartments(first: 100, orderBy: name_ASC) {
		id
		name
		parent {
			id
		}
	}
	allPeople(first: 100) {
		id
		name
		title
		avatar {
			url
		}
		department {
			name
		}
	}
}`;
