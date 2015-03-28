###
hvz specific constants/config vars

###



hvz =
	roles:	# same as role_id in DB
		GUEST:
			id: 0
			name: 'Guest'
		USER:
			id: 1
			name: 'User'
		HUMAN:
			id: 2
			name: 'Human'
		ZOMBIE:
			id: 3
			name: 'Zombie'
		OZ:
			id: 4
			name: 'OZ'
		MODERATOR:
			id: 5
			name: 'Moderator'

hvz.getRoleById = (id)->
	for key, obj of hvz.roles
		if obj.id == id
			return obj.name
	return '?'

# Export it
module.exports = hvz