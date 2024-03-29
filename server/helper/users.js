const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  if(users.find(user => user.username === username)){
    return user;
  }else{
    users.push(user);
  }

  //console.log(users)
  return user;
}

// Get current user
function getCurrentUser(username) {
  return users.find(user => user.username === username);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};