// 1. Count the total number of active users.
[
    {
        '$match': {
            'isActive': true
        }
    }, {
        '$count': 'TotalActiveUsers'
    }
]

// 2. Find the average age of male and female.
[
    {
        '$group': {
            '_id': '$gender',
            'avgAge': {
                '$avg': '$age'
            }
        }
    }
]

// 9. Count the number of users in each city.
[
    {
        '$group': {
            '_id': '$city',
            'eachCityUser': {
                '$sum': 1   // First way
            }
        }
    }
]

[
    {
        '$group': {
            '_id': '$city',
            'eachCityUser': {
                '$count': {}     // $count : {empty} count document in each group (Second Way)
            }
        }
    }
]

// 3. Give the total number of posts by active users.
[
    {
        '$match': {
            'isActive': true
        }
    }, {
        '$unwind': '$posts'
    }, {
        '$group': {
            '_id': '$_id',
            'TotalPosts': {
                '$sum': 1
            }
        }
    }
]

// 4. Count the total number of comments.
[
    {
        '$unwind': '$posts'
    }, {
        '$group': {
            '_id': null,
            'totalComments': {
                '$sum': {
                    '$size': '$posts.comments'
                }
            }
        }
    }
]

// 5. List users and their total likes.
[
    {
        '$unwind': '$posts'
    }, {
        '$group': {
            '_id': '$_id',
            'TotalLikes': {
                '$sum': '$posts.likes'
            }
        }
    }
]

// 6. Find the user name with the maximum likes of posts.
[
    {
      '$unwind': '$posts'
    }, {
      '$group': {
        '_id': '$name', 
        'maxLikes': {
          '$max': '$posts.likes'
        }
      }
    }, {
      '$sort': {
        'maxLikes': -1
      }
    }, {
      '$limit': 1
    }
  ]