import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Peer from "simple-peer"
import Video from './Video'

export default function VideoChatBox({roomName}) {

	const [peers, setPeers] = useState([]);
	const userVideo = useRef()
	const socketRef = useRef()
	const peersRef = useRef([])
	const myStream = useRef()

	useEffect(() => {
		socketRef.current = io(`${process.env.REACT_APP_SOCKET_BASE_URL}`)


		navigator.mediaDevices.getUserMedia({video: {height: 300, width: 350}, audio: true}).then(stream => {
			userVideo.current.srcObject = stream
			myStream.current = stream
			socketRef.current.emit('join VidConf', roomName)
			
			socketRef.current.on("all users", users => {
				const peers = [];

				console.log(users);

				users.forEach(userID => {
						const peer = createPeer(userID, socketRef.current.id, stream);
						peersRef.current.push({
								peerID: userID,
								peer,
						})
						peers.push(peer);
				})
				setPeers(peers);
			})

			socketRef.current.on("user joined", payload => {
					const peer = addPeer(payload.signal, payload.callerID, stream);
					peersRef.current.push({
							peerID: payload.callerID,
							peer,
					})

					setPeers(users => [...users, peer]);
			});

			socketRef.current.on("receiving returned signal", payload => {
					const item = peersRef.current.find(p => p.peerID === payload.id);
					item.peer.signal(payload.signal);
			});

		})

		return ()=>{
			socketRef.current.close()
			myStream.current.getTracks().forEach(function(track) {
        if (track.readyState === 'live') {
            track.stop();
        }
    	});
		}
		
	}, [])

	
	function createPeer(userToSignal, callerID, stream) {
		const peer = new Peer({
				initiator: true,
				trickle: false,
				stream,
		});

		peer.on("signal", signal => {
				socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
		})

		return peer;
	}

	function addPeer(incomingSignal, callerID, stream) {
			const peer = new Peer({
					initiator: false,
					trickle: false,
					stream,
			})

			peer.on("signal", signal => {
					socketRef.current.emit("returning signal", { signal, callerID })
			})

			peer.signal(incomingSignal);

			return peer;
	}

	return (
		<div  className='grid grid-cols-2 gap-6 p-10'>
			<video ref={userVideo} muted autoPlay playsInline > </video>
			{peers.map((peer, index) => {
				return (
						<Video key={index} peer={peer} />
				);
			})
			}
		</div>
	)
}
