# TODO

### Backend server
- [x] Create api
- [x] Budget calculation (also transaction budget)
- [ ] Warning system when exceeding budget?
- [ ] Savings updater / add money to saving --> subtract from main accnt
    - May need to implement a new type of transaction for this (perhaps transfer).
- [ ] Finish testing
- [ ] Have endpoints for having the data sorted
  - sort by date (asc/desc)
  - filter (sort by) category
  - filter (sort by) tags
  - etc


### Frontend

#### Auth
- On every request:
  - Pass the bearer token
  - Handle the error correctly
    - If the error message mentions that the access token is expired --> get new access token using the refresh token!
  

### General things to think about :)
 - Should account balance be read only?
    -> Would make it that it can only be updated w/ income/expense
    
   
## Auth
- [x] Auto assign current user to everything on create (should be done in the view)
- [x] Limit viewing of everything to things that belong to the current user
- [x] Implement JWT for authorization
- [x] Smooth out the user creation process
- [x] Make sure that owner is read_only in every serializer
- [ ] Make sure that when creating (adding) a transaction you can only access the accounts, categories, tags from your own account
  - Do not display other options in the frontend
  - But, a person with bad intensions could change the source code and set an other account pk