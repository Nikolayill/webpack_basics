import createMenu from './menu';

(async () => {
    console.log("Fetching all users");
    let userList = [];
    try {
        let users = await fetch("/api/users").then(resp => resp.json());
        userList = users.map(u => u.name);
    } catch (e) {
        console.error(e);
    }
    console.log("Creating menu...");
    let menu = createMenu(userList, 'users-list');
    document.body.appendChild(menu);
})();