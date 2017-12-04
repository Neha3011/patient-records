##Pharmeasy
This is a very basic demo app, to imitate an online medicine purchase system.
There can be 3 types of users:
1) Patient: 
Patient can perform following actions:
    a. can add prescriptions. Currently he can add only one prescription with maximum of 3 medicines in it.
    b. can view prescriptions
    c. can allow pharmacist or doctor to have access to the prescription

2) Doctor:
Doctor can perform following actions:
    a. can see the list of prescriptions but not the content of the prescription unless patient allows access to it
    b. can view prescriptions when given access

3) Pharmacist:
Pharmacist can perform following actions:
    a. can see the list of prescriptions but not the content of the prescription unless patient allows access to it
    b. can view prescriptions when given access

### Follow steps to run the project

```sh
1) git clone https://github.com/Neha3011/patient-records.git
2) npm install
3) npm start (to develop locally)
```

### To run the unit test with coverage, execute the following commands

```sh
1) npm run test
2) npm run coverage
```

### To run the linter (airbnb), execute the following command

```sh
1) npm run lint
```

### steps to deploy on github pages

```sh
1) git checkout master
2) git up
3) rm -rf dist
4) npm run build:prod
5) git subtree push --prefix dist origin gh-pages
```

####TODO
1) Add validations to the prescription input form
2) Allow patient to add multiple prescriptions