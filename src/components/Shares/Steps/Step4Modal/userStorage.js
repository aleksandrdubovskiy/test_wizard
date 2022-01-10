export const getUsers = (letters = "") => new Promise((res, rej) => {
    const allUsers = JSON.parse(localStorage.users || '[]');
    const selectedUsers = allUsers.filter(user => `${user.firstName} ${user.lastName}`.indexOf(letters) !== -1);
    setTimeout(() => res(selectedUsers), 1000);

});
export const saveUser = (user) => new Promise(async (res, rej) => {
    const users = await getUsers();
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
    setTimeout(res, 1000);
});
export const duplicateUser = (formValue) => new Promise(async function (res, rej) {
    const data = await getUsers();
    const result = {
        firstName: data.some(eachUser => `${formValue.firstName}${formValue.lastName}` === `${eachUser.firstName}${eachUser.lastName}`),
        lastName: data.some(eachUser => `${formValue.firstName}${formValue.lastName}` === `${eachUser.firstName}${eachUser.lastName}`),
        phone: data.some(eachUser => formValue.phone === eachUser.phone),
        email: data.some(eachUser => formValue.email === eachUser.email)
    }
    setTimeout(() => res(Object.keys(result).filter(item => result[item])), 1000);
})