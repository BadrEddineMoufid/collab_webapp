const rooms = [];

function addRoom(roomName, fileName){
    const room = {roomName: roomName, files: [fileName]};
    const duplicateRoom = rooms.find(room => room.roomName === roomName)
    if(duplicateRoom){
        const roomIndx = rooms.findIndex(room => room.roomName === roomName)
        duplicateRoom.files.push(fileName)
        rooms.splice(roomIndx, 1, duplicateRoom)

        console.log(rooms)
        return duplicateRoom
    }else{
        rooms.push(room)
    }
    
    console.dir(rooms)

    return room;

}

function getRoomFiles(roomName){

    return rooms.find(room => room.roomName === roomName)
}

function addFileToRoom(roomName, fileName){
    const foundRoom = rooms.find(room => room.roomName === roomName)
    if(foundRoom){
        const roomIndx = rooms.findIndex(room => room.roomName === roomName)
        foundRoom.files.push(fileName)
        rooms.splice(roomIndx, 1, foundRoom)
    }
    
    
    console.log("found room ",foundRoom)
    console.dir(rooms)


    return foundRoom
}

module.exports = {addRoom, addFileToRoom, getRoomFiles}