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

// 10. Count the number of users with JavaScript skills.
[
    {
        '$match': {
            'skills': 'JavaScript'
        }
    }, {
        '$count': 'string'
    }
]

// 11. Count the number of users with each skill.
[
    {
        '$unwind': '$skills'
    }, {
        '$group': {
            '_id': '$skills',
            'totalUsers': {
                '$sum': 1
            }
        }
    }
]

// 12. Find users who have posts with more than 15 likes and a specific skill.
[
    {
        '$unwind': '$posts'
    }, {
        '$match': {
            '$and': [
                {
                    'posts.likes': {
                        '$gt': 15
                    }
                }, {
                    'skills': 'JavaScript'
                }
            ]
        }
    }, {
        '$group': {
            '_id': '$_id',
            'name': {
                '$first': '$name'
            },
            'post': {
                '$first': '$posts'
            }
        }
    }
]

// 13. Find users with the highest total number of likes across all posts.
[
    {
        '$unwind': '$posts'
    }, {
        '$group': {
            '_id': '$_id',
            'name': {
                '$first': '$name'
            },
            'TotalLikes': {
                '$sum': '$posts.likes'
            }
        }
    }, {
        '$sort': {
            'TotalLikes': -1
        }
    }, {
        '$limit': 1
    }
]

// 14. Find users who have friends and count the number of friends.
[
    {
        '$match': {
            'friends': {
                '$gt': 0
            }
        }
    }, {
        '$project': {
            'name': '$name',
            'totalFriends': {
                '$size': '$friends'
            }
        }
    }
]

// 15. Find users who have at least one post with a specific comment and a specific skill.
[
    {
        '$unwind': '$posts'
    }, {
        '$match': {
            '$and': [
                {
                    'posts.comments': 'Interesting'
                }, {
                    'skills': 'JavaScript'
                }
            ]
        }
    }
]

// 16. Count users who have skills javascript and react.
[
    {
        '$match': {
            'skills': {
                '$all': [
                    'JavaScript', 'React'
                ]
            }
        }
    }, {
        '$count': 'string'
    }
]

// 17. count user who have second skills as React
[
    {
        '$match': {
            'skills.1': 'React'
        }
    }, {
        '$count': 'string'
    }
]

// 18. Categorise users by their city and gives their id and name.
[
    {
        '$group': {
            '_id': '$city',
            'user': {
                '$push': {
                    'name': '$name',
                    'skills': '$skills'
                }
            }
        }
    }
]

//   19. Give user data whose city name starts with "New"
[
    {
        '$match': {
            'city': new RegExp('^New')
        }
    }
]

// 20. Add a "postCount" field representing the total number of posts for each user.
[
    {
        '$addFields': {
            'postCount': {
                '$size': '$posts'
            }
        }
    }
]

