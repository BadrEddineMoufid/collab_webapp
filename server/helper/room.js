const rooms = [];

/**
 * adds file to room if exists else create new room 
 * @param {roomName} roomName the name of the room
 * @param {fileName} fileName the name of the file uploaded 
 * @returns  object room
 */
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
/**
 * 
 * @param {roomName } roomName name of the room
 * @returns returns room object with all files 
 */
function getRoomFiles(roomName){
    console.dir("rooms " + rooms)
    return rooms.find(room => room.roomName === roomName)
}

/**
 * 
 * @param {roomName } roomName name of the room
 * @param {fileName } fileName  name of the file to add to room
 * @returns the entire room object 
 */

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