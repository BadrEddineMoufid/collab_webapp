import React from 'react'
import Card from '../components/Card'

export default function home() {
    return (
        
        <div className="p-12">
          <div className="grid grid-cols-3 gap-6">
            <Card title="Create Rooms " content="Create Rooms with your team and collaborate on project that matters to you" />
            <Card title="Chat with your Team" content="Chat with your team members and get things done faster and easier " />
            <Card title="test title 3" content="test content 3" />
          </div>
        </div>
      
    
    )
}
