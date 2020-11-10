# TODO

## Backend server

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

## Frontend

### Auth

- On every request:
  - [x] Pass the bearer token
  - [x] Handle the error correctly
    - If the error message mentions that the access token is expired --> get new access token using the refresh token!

### Api Interaction

- [x] Accounts
  - [x] Get all accounts
  - [x] Create a new account
  - [x] Update an account
  - [x] Delete an account
- [x] Budgets
  - [x] Get all budgets
  - [x] Create a budget
  - [x] Update a budget
  - [x] Delet a budget
- [x] Groupings
  - [x] Categories'
    - [x] Get all categories
    - [ ] Create a category
    - [x] Update a category
    - [x] Delete a category
  - [x] Tags
    - [x] Get all tags
    - [x] Create a tag
    - [x] Update a tag
    - [x] Delete a tag
- [x] Savings
  - [x] Get all saving accounts
  - [x] Create a saving account
  - [x] Update a saving account
  - [x] Delete a saving account
- [x] Token
  - [x] Login (get token)
  - [x] Refresh
- [x] Transactions
  - [x] Get all transactions
  - [x] Create a transaction
  - [x] Update transaction
  - [x] Delete a transaction
- [ ] Users
  - [ ] Register

### Refactoring

- [ ] Commonly used (input) elements
  - [ ] Modals
    - [x] Create unified input component
      - Combination of b-input & b-field
        - This allows to standardize the label, tooltip position etc
    - [ ] Tag input
    - [ ] Type input (radio buttons)
    - [ ] Account Input (select)
    - [ ] Category input (select)
    - [ ] Date input

## General things to think about :)

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
