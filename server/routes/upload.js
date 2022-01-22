const router = require('express').Router();
const path = require('path')
const multer = require('multer')
const {addRoom, getRoomFiles} = require('../helper/room')


//multer stuff
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
			cb(null, 'upload');
	},
	filename: function (req, file, cb) {
			cb(null , file.originalname);
	}
});
  
const upload = multer({storage:storage})


router.post('/upload', upload.single('file'), (req, res )=>{
	//console.dir(req.file)
	//console.log(req.body.room)

	
	const room = addRoom(req.body.room, req.file.filename)

	res.json(room)
})

router.get('/roomFiles', (req, res)=>{
	//console.log(req.query.roomname);
	
	const roomFiles = getRoomFiles(req.query.roomname)
	if(!roomFiles){
		res.json({error:"room has no files yet"})
	}else{
		res.json(roomFiles)

	}
})
  
router.get('/upload/:file', (req, res)=>{
	res.download(path.join(path.dirname(require.main.filename), `upload/${req.params.file}`), err =>{
		if(err){
			console.log(err)
			res.status(500).json({error:'server error'})
		}
	})
})
  







module.exports = router;