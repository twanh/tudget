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
  - [x] Pass the bearer token
  - [x] Handle the error correctly
    - If the error message mentions that the access token is expired --> get new access token using the refresh token!

#### Api Interaction
- [x] Accounts
  - [x] Get all accounts
  - [x] Create a new account
  - [x] Update an account
  - [x] Delete an account
- [ ] Budgets
  - [ ] Get all budgets
  - [ ] Create a budget
  - [ ] Update a budget
  - [ ] Delet a budget
- [ ] Groupings
  - [ ] Categories
    - [ ] Get all categories
    - [ ] Create a category
    - [ ] Update a category
    - [ ] Delete a category
  - [ ] Tags
    - [ ] Get all tags
    - [ ] Create a tag
    - [ ] Update a tag
    - [ ] Delete a tag
- [ ] Savings
  - [ ] Get all saving accounts
  - [ ] Create a saving account
  - [ ] Update a saving account
  - [ ] Delete a saving account
- [ ] Token
  - [x] Login (get token)
  - [x] Refresh 
- [ ] Transactions
  - [x] Get all transactions
  - [ ] Create a transaction
  - [x] Update transaction
  - [x] Delete a transaction
- [ ] Users
  - [ ] Get user info
  - [ ] Register 



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