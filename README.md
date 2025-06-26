# `noted`
![image](https://github.com/user-attachments/assets/b09b71de-593e-43bd-ba47-63e027d4349e)
![image](https://github.com/user-attachments/assets/de65ffac-3e5e-477d-9c40-d46bd7dfb23e)
![image](https://github.com/user-attachments/assets/8d78809c-ce71-4904-a491-baa126e9014d)
![image](https://github.com/user-attachments/assets/6ddc7141-ab2f-4525-8920-ded2b12ca832)


### Noted! is a note-taking website built to work on the Internet Computer, with a React/Tailwind CSS frontend and a Motoko backend.

## Features:
- The ability to add, delete, edit, and pin notes.
- Several themes to choose from.
- Wide screen support.
- A dynamic layout that changes depending on whether there are notes or not.


## Running the project locally

If you want to test Noted! locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, Noted! will be available at `http://localhost:4943?canisterId={asset_canister_id}`.
