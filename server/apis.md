# list of apis
---

## user api
- login
- register
- 


For the API endpoints:
1. **Login**: `/api/login`, accepts a POST request with a JSON payload of `{email: '', password: ''}`, returns a JSON object of the user data if login is successful
2. **Register**: `/api/register`, accepts a POST request with a JSON payload of `{name: '', email: '', password: '', phone: '', imgurl: ''}`, returns a JSON object of the new user data if registration is successful
3. **Update user information**: `/api/user/<user_id>`, accepts a PUT request with a JSON payload of the updated user data, returns a JSON object of the updated user data
4. **Update user password**: `/api/user/<user_id>/password`, accepts a PUT request with a JSON payload of `{password: ''}`
5. **Get recent advertisements**: `/api/advertisements`, accepts a GET request and returns a JSON array of recent advertisements
6. **Get advertisements of a user**: `/api/user/<user_id>/advertisements`, accepts a GET request and returns a JSON array of the user's advertisements
7. **Add an advertisement to favorites**: `/api/user/<user_id>/favorites/<advertisement_id>`, accepts a POST request and returns a JSON object of the updated user data
8. **Remove an advertisement from favorites**: `/api/user/<user_id>/favorites/<advertisement_id>`, accepts a DELETE request and returns a JSON object of the updated user data
9. **Get a user's favorite advertisements**: `/api/user/<user_id>/favorites`, accepts a GET request and returns a JSON array of the user's favorite advertisements
10. **CRUD operations for advertisements**: `/api/advertisements/<id>` where id is optional, GET, POST, PUT and DELETE request respectively.
11. **CRUD operations for images**: `/api/images/<id>` where id is optional, GET, POST, PUT and DELETE request respectively.
12. **CRUD operations for conversations**: `/api/conversations/<id>` where id is optional, GET, POST, PUT and DELETE request respectively.
13. **CRUD operations for messages**: `/api/messages/<id>` where id is optional, GET, POST, PUT and DELETE request respectively.

Please note that the above API endpoints are just suggestions and may need to be adjusted to fit the specific requirements of your application.