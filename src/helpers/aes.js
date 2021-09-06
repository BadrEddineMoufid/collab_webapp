import aes256 from 'aes256';

let key = process.env.REACT_APP_AES_KEY


export const encrypt = (text) =>{
	let encrypted = aes256.encrypt(key, text)
	
	return encrypted;
}



export const decrypt = (text) =>{
	let decrypted = aes256.decrypt(key, text)
	
	return decrypted;
}




