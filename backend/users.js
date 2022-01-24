const users = [];

const addUser = ({id, name, room}) => {
    //change name/room of user to lowercase and no space
    name.trim().toLowerCase();
    room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return {error: 'Username Already Exists'};
    }

    const user = {id, name, room};
    users.push(user);
    return user;
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};