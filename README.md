# `noted`
![image](https://github.com/user-attachments/assets/b09b71de-593e-43bd-ba47-63e027d4349e)
![image](https://github.com/user-attachments/assets/de65ffac-3e5e-477d-9c40-d46bd7dfb23e)
![image](https://github.com/user-attachments/assets/8d78809c-ce71-4904-a491-baa126e9014d)
![image](https://github.com/user-attachments/assets/6ddc7141-ab2f-4525-8920-ded2b12ca832)


## Noted! is a note-taking website built to work on the Internet Computer, with a React/Tailwind CSS frontend and a Motoko backend.

### Features:

- The ability to add, delete, edit, and pin notes.
- Several themes to choose from.
- Wide screen support.
- A dynamic layout that changes depending on whether there are notes or not.

### Challenges and Solutions:

#### 1. ICP Incompatibility with WSL
- **Issue**: The latest ICP DFX version was incompatible with Windows Subsystem for Linux (WSL), causing deployment failures.
- **Solution**: Downgraded to DFX v0.26.1, a stable version compatible with WSL, enabling seamless canister deployment (`dfx deploy`).

#### 2. Learning Motoko
- **Issue**: Limited prior experience with Motoko, the programming language for ICP.
- **Solution**: Leveraged the *Motoko Book* for core concepts and London App Brewery’s Motoko YouTube course for practical examples, sufficient for implementing backend logic (e.g., note CRUD operations).

#### 3. Replacing SASS with Tailwind CSS
- **Issue**: Initial use of SASS was cumbersome for rapid styling in a React frontend.
- **Solution**:
  - Uninstalled SASS (`npm uninstall sass`) and removed `index.scss`.
  - Created `index.css` and updated imports in `App.jsx`.
  - Installed Tailwind CSS (`npm install -D tailwindcss`), initialized with `npx tailwindcss init`.
  - Added Tailwind directives to `index.css` (`@tailwind base; @tailwind components; @tailwind utilities;`).
  - Applied Tailwind classes for responsive, theme-based styling (e.g., `rounded-xl`).

#### 4. Handling Long Notes
- **Issue**: Long note content caused UI clutter in the notes list.
- **Solution**: Implemented a truncation function (`truncateContent`) and used it to display only the first 80 characters of a note’s content, appending ellipses (`...`). Full content is accessible by clicking a note to open an edit modal.

### Running the project locally

If you want to test Noted! locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, Noted! will be available at `http://localhost:4943?canisterId={asset_canister_id}`.